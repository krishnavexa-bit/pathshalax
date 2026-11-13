<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## Project rules

- The PADHMATE study app lives in `src/padhmate/` as one client-only React app loaded by `src/routes/index.tsx` behind `ClientOnly`; it keeps its own page state (no extra routes) because it relies on browser-only APIs (session, localStorage, cursor effects).
- Files in `src/padhmate/` ported from the original JavaScript keep `// @ts-nocheck`; new code there (e.g. `cloud.ts`) is typed. All backend access goes through `src/padhmate/cloud.ts`.
- `src/styles.css` imports Tailwind without preflight so the original PADHMATE CSS (`padhmate.css`, `survey/survey.css`) renders unchanged.
- Imported accounts from the previous app live in server-only `legacy_accounts` and are linked only by `claim_legacy_account()` (verified email, exactly one unclaimed match); never expose that table to clients.
