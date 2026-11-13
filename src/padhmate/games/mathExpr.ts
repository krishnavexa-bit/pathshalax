// Small, safe expression reader for the graph playground: y = f(x).
// Supports + - * / ^, brackets, implicit multiplication (2x, 3(x+1), 2sin(x)),
// constants pi and e, and sin cos tan sqrt abs log ln exp floor.
export type Expr = (x: number) => number;

type Token = { t: "num"; v: number } | { t: "id"; v: string } | { t: "op"; v: string };

const FUNCS: Record<string, (v: number) => number> = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  sqrt: Math.sqrt,
  abs: Math.abs,
  log: Math.log10,
  ln: Math.log,
  exp: Math.exp,
  floor: Math.floor,
};

function tokenize(src: string): Token[] {
  const out: Token[] = [];
  let i = 0;
  const s = src.replace(/\s+/g, "").replace(/×/g, "*").replace(/÷/g, "/").replace(/π/g, "pi").replace(/²/g, "^2").replace(/³/g, "^3");
  while (i < s.length) {
    const c = s.charAt(i);
    if (/[0-9.]/.test(c)) {
      let j = i;
      while (j < s.length && /[0-9.]/.test(s.charAt(j))) j++;
      const v = Number(s.slice(i, j));
      if (!Number.isFinite(v)) throw new Error("Bad number");
      out.push({ t: "num", v });
      i = j;
    } else if (/[a-z]/i.test(c)) {
      let j = i;
      while (j < s.length && /[a-z]/i.test(s.charAt(j))) j++;
      let word = s.slice(i, j).toLowerCase();
      // Split words like "xsin" or "pix" into known pieces.
      while (word.length) {
        const known = ["sqrt", "floor", "sin", "cos", "tan", "abs", "log", "exp", "ln", "pi", "x", "e"].find((k) => word.startsWith(k));
        if (!known) throw new Error(`Unknown name "${word}"`);
        out.push({ t: "id", v: known });
        word = word.slice(known.length);
      }
      i = j;
    } else if ("+-*/^()".includes(c)) {
      out.push({ t: "op", v: c });
      i++;
    } else {
      throw new Error(`Unexpected "${c}"`);
    }
  }
  return out;
}

export function compile(src: string): Expr {
  const tokens = tokenize(src);
  let pos = 0;
  const peek = () => tokens[pos];
  const isOp = (v: string) => {
    const t = peek();
    return t?.t === "op" && t.v === v;
  };
  const startsFactor = () => {
    const t = peek();
    return t !== undefined && (t.t === "num" || t.t === "id" || (t.t === "op" && t.v === "("));
  };

  function expr(): Expr {
    let left = term();
    while (isOp("+") || isOp("-")) {
      const op = (tokens[pos++] as { v: string }).v;
      const a = left;
      const b = term();
      left = op === "+" ? (x) => a(x) + b(x) : (x) => a(x) - b(x);
    }
    return left;
  }
  function term(): Expr {
    let left = unary();
    for (;;) {
      if (isOp("*") || isOp("/")) {
        const op = (tokens[pos++] as { v: string }).v;
        const a = left;
        const b = unary();
        left = op === "*" ? (x) => a(x) * b(x) : (x) => a(x) / b(x);
      } else if (startsFactor()) {
        const a = left;
        const b = power();
        left = (x) => a(x) * b(x);
      } else break;
    }
    return left;
  }
  function unary(): Expr {
    if (isOp("-")) {
      pos++;
      const a = unary();
      return (x) => -a(x);
    }
    if (isOp("+")) {
      pos++;
      return unary();
    }
    return power();
  }
  function power(): Expr {
    const base = atom();
    if (isOp("^")) {
      pos++;
      const exp = unary();
      return (x) => Math.pow(base(x), exp(x));
    }
    return base;
  }
  function atom(): Expr {
    const t = tokens[pos++];
    if (!t) throw new Error("Formula ends too early");
    if (t.t === "num") {
      const v = t.v;
      return () => v;
    }
    if (t.t === "op" && t.v === "(") {
      const inner = expr();
      if (!isOp(")")) throw new Error("Missing )");
      pos++;
      return inner;
    }
    if (t.t === "id") {
      if (t.v === "x") return (x) => x;
      if (t.v === "pi") return () => Math.PI;
      if (t.v === "e") return () => Math.E;
      const fn = FUNCS[t.v];
      if (fn) {
        const arg = power();
        return (x) => fn(arg(x));
      }
    }
    throw new Error("Could not read the formula");
  }

  const result = expr();
  if (pos < tokens.length) throw new Error("Could not read the end of the formula");
  return result;
}
