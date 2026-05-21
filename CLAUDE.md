**On session start:** If `HANDOFF.md` exists in this directory, read it before anything else.

# Expression Builder

A Notion-formula-style expression builder built as a plain HTML / CSS / JavaScript demo. Five UX variants live side-by-side in this directory, all sharing `script.js` and `style.css`.

## Files

- `index.html` — **v1**: Builder / Test view-toggle tabs in the popover header.
- `v2.html` — **v2**: Test button in the header that swaps to a test view; Close button takes its place.
- `v3.html` — **v3**: Always-on **live preview strip** at the bottom of the popover. Result evaluates on every change. An "Add data" toggle expands an inline sample-data editor with a Run button.
- `v4.html` — **v4**: 3-column layout (list | detail | test panel). Test panel is collapsible via a left-edge chevron handle. Wider popover (`layout-wide`, max 1080px).
- `v5.html` — **v5**: 2-row layout — list+detail on top, test strip at the bottom. The test strip is **drag-resizable** (a 6px handle on its top edge) and collapsible via a chevron at the top-center.
- `style.css` — all shared styles. Version-specific layouts use compound selectors (e.g. `.pop-body.view-builder.builder-with-test`).
- `script.js` — all shared logic. Version detection is implicit: handlers check for the presence of DOM elements (`#test-btn`, `#live-preview`, `.test-panel`, `.test-strip`, etc.) and wire up only what exists.

Open any HTML file directly in a browser. Top-right pill switches between versions.

## Core concepts

- **Catalog** (`catalog` in `script.js`): Properties, Functions, Operators. Each function has `params: string[]` declaring its arg slots.
- **Tokens** (in `tokens` array): each token is `{ type, value }` for operators/parens/raw, or `{ type: 'fn', name, args: Slot[] }` for function calls.
- **Slot** kinds: `empty` (placeholder), `static` (typed text), `ref` (picked from `refTree`). Slots are rendered as inline `<input>` (for empty/static) or chips (for ref).
- **Reference picker** (`#ref-picker`): floating popover anchored to the clicked slot. Lives outside `.popover` in the DOM because `.popover` has `transform: translateX(-50%)` which makes `position: fixed` resolve against the popover instead of the viewport.
- **Live evaluation** (`liveEvaluate`): called from `renderFormula`, slot input handler, and the Test view's ref-value inputs. Fires only when `#live-preview`, `.test-panel`, or `.test-strip` is present (i.e. v3/v4/v5).
- **Evaluator**: builds JS source from tokens (`buildSource`) and runs it via `new Function(...)` with bindings for properties, helper functions (`if`, `length`, `concat`, `addDays`, …), and a `_ref(id)` lookup against `refValueMap`.

## Layout gotchas encountered while building this

- **Bare `1fr` doesn't shrink to 0.** `1fr` is `minmax(auto, 1fr)`; the `auto` minimum prevents the track from collapsing below its content's min-size. Use `minmax(0, 1fr)` when you need a track to disappear (v5's grid-template-rows).
- **`overflow-y: auto` implicitly clips the X axis.** When the spec says one axis is `visible` and the other isn't, the visible one becomes `auto`. This bit the v4 test-panel chevron — the panel had `overflow-y: auto`, which clipped the handle that stuck out via `left: -11px`. Fix: move scrolling to an inner wrapper (`.test-panel-inner`).
- **`position: fixed` is relative to the nearest transformed ancestor.** Not the viewport. The `.popover` uses `transform: translateX(-50%)` for centering, so any `position: fixed` child resolves against the popover. The ref picker lives outside the popover for this reason.
- **`grid-auto-rows` + `align-content`.** When a grid has more space than content needs, auto rows can stretch (default `align-content: stretch`). Use `grid-auto-rows: min-content` + `align-content: start` to keep rows compact and packed (v5 refs grid).
- **CSS cascade specificity for layout variants.** Several places use compound selectors like `.pop-body.view-builder.builder-with-test` to beat `.pop-body.view-builder` which is defined later in the file with the same single-class specificity.
- **Re-render mid-click closes the parent popup.** `removeTokenAt`, `applyRef`, and picker-drill clicks call `renderFormula` / `renderPicker` which detach the clicked element. The document-level click handler then sees `popover.contains(e.target)` as false (because the target is now detached) and closes the popover. Fix: `e.stopPropagation()` on every token chip, picker row, and back-arrow click.

## Conventions

- No build step. Plain HTML/CSS/JS. Edit and refresh.
- No frameworks. Vanilla DOM APIs only.
- Single-file CSS and JS shared across all five HTML pages.
- Picker, formula, evaluator, catalog — all defined once in `script.js`. Version-specific UI lives in each HTML file.
- The bottom test strip in v5 uses a CSS custom property `--test-strip-height` set inline via JS during drag.
