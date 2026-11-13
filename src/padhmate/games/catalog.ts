export type GameId = "graph" | "scale" | "timeline" | "lens" | "circuit" | "solar";

export const GAMES: { id: GameId; title: string; tag: string; text: string; icon: string; kind: string }[] = [
  { id: "graph", title: "Graph playground", tag: "Maths", text: "Type formulas, drag sliders and match mystery graphs.", icon: "📈", kind: "Graph play" },
  { id: "lens", title: "Lens lab", tag: "Science", text: "Bend light through lenses and predict the image.", icon: "🔍", kind: "Science animation" },
  { id: "circuit", title: "Circuit lab", tag: "Science", text: "Watch charges flow and solve circuits with Ohm's law.", icon: "💡", kind: "Science animation" },
  { id: "solar", title: "Solar system in motion", tag: "Science", text: "Speed up time and race the planets round the Sun.", icon: "🪐", kind: "Science animation" },
  { id: "scale", title: "Scale of everything", tag: "Science · Geography", text: "Zoom from a proton to the edge of the universe.", icon: "🔭", kind: "Explorer" },
  { id: "timeline", title: "Which came first?", tag: "History", text: "Put famous moments in order and build a timeline.", icon: "⏳", kind: "Explorer" },
];

/** Suggests a game that fits a chapter, if one does. */
export function relatedGame(subject: string, chapter: string): GameId | null {
  const t = chapter.toLowerCase();
  if (/light|lens|mirror|optic|reflection|refraction|human eye/.test(t)) return "lens";
  if (/electric|circuit|current/.test(t)) return "circuit";
  if (/earth, moon|beyond earth|skies|solar|gravitation|unique life sustaining/.test(t)) return "solar";
  if (subject === "Mathematics" && /polynomial|quadratic|linear|graph|coordinate|function|trigonometr|straight line|conic|integral|derivative|algebra|expression|unknown|dots/.test(t)) return "graph";
  if (subject === "Physics" && /motion|oscillation|wave/.test(t)) return "graph";
  if (/revolution|nationalism|empire|civilisation|timeline|colonial|history|kingdom|rulers|marathas|gupta|indus|harappan|world war|constitution|freedom|movement|tides|nation building/.test(t)) return "timeline";
  if (/measurement|cell|atom|matter|universe|living world|invisible|oceans|continents|landform|locating places|size|interior of the earth|origin and evolution/.test(t)) return "scale";
  return null;
}
