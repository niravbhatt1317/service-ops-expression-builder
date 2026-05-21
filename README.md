# Expression Builder

A Notion-formula-style expression builder demo. Plain HTML / CSS / JavaScript — no build step, no frameworks.

## Run locally

```bash
python3 -m http.server 8765
```

Then visit <http://localhost:8765/>. (Or just double-click `index.html` to open in the browser directly.)

## Versions

Five UX variants live side-by-side, sharing `script.js` and `style.css`. Use the top-right pill on any page to switch between them.

- **v1** (`index.html`) — inline `#` button next to each argument slot opens the reference picker.
- **v2** (`v2.html`) — floating `# Add reference` toolbar appears above the focused slot.
- **v3** (`v3.html`) — always-on live preview strip at the bottom with inline ref editor.
- **v4** (`v4.html`) — 3-column layout with a collapsible test panel.
- **v5** (`v5.html`) — 2-row layout with a drag-resizable test strip.

## v1 / v2 slot interactions

Click into any function's argument slot, then:

- **Type** for a static value.
- **Press `#`** to open the reference picker at the slot.
- **Click the `#` button** (v1: inline; v2: in the floating toolbar) to open the picker.
- **Click a function in the left list** to nest it inside the focused slot.

## Files

- `index.html`, `v2.html` … `v5.html` — version-specific page shells.
- `script.js` — all builder logic (catalog, tokens, slots, picker, evaluator).
- `style.css` — all shared styles.
- `CLAUDE.md`, `HANDOFF.md` — internal notes / session handoff context.
