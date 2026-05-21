# Handoff — 2026-05-21 09:53 IST

## Context from CLAUDE.md to read first
- **Files** — quick map of which HTML file corresponds to which version (v1–v5) and how the shared `script.js` / `style.css` are wired up. Read this to orient yourself before touching anything.
- **Core concepts** — the token/slot model, the reference picker (and *why* it lives outside `.popover` in the DOM), and how live evaluation is gated by element presence. This is the mental model needed to make changes in `script.js`.
- **Layout gotchas encountered while building this** — five non-obvious CSS/JS traps we hit and how each was fixed. Skip at your peril; most of these will bite again if you touch the same areas.

## What we worked on this session
Built an Expression Builder demo (Notion-formula style) from scratch as a plain HTML/CSS/JS project, then iterated on five UX variants (v1–v5) to explore different build/test interaction patterns. Most recent focus: tightening v3 (live preview strip), v4 (3-column with collapsible test panel), and v5 (draggable bottom test strip).

## Completed
- Initial scaffold with formula chip bar, list/detail builder, reference picker popover.
- **v1**: Builder / Test tab toggle in popover header.
- **v2**: Test button in header that swaps to test view; Close button replaces it.
- **v3**: Always-on live preview strip at popover bottom. "Add data" toggle expands inline ref editor with a Run button.
- **v4**: 3-column layout (list | detail | test panel) with wider popover and a collapsible test panel with rotated "TEST" label when collapsed. Test panel scrolls internally for many refs.
- **v5**: 2-row layout (list+detail on top, test strip on bottom). Test strip is **drag-resizable** (no bounds — can fully hide builder area). Collapse chevron at top-center stays at consistent position.
- Version switcher pill (top-right of every page).
- Reference picker (hierarchical tree from `refTree`, global search across all leaves, drill-in navigation).
- Function token model with **editable arg slots** (empty / static / ref). Click empty slot → picker opens. Type → picker closes, value becomes static. Backspace to empty → picker reopens.
- Examples in detail pane parsed into real fn tokens with pre-filled static slots.
- Live evaluation wired in v3/v4/v5 (recomputes on every token or ref change).
- Many bug fixes — see CLAUDE.md "Layout gotchas" section.

## In progress
Nothing specifically mid-flight. The last few edits were small v3 tweaks:
- `v3.html`: removed the `→` arrow, restructured `.live-refs` to put a Run button in its header.
- `style.css`: added `.live-preview #result-output…` overrides to beat the global `#result-output.is-placeholder` ID-specificity rule (was bleeding the dashed box into v3).
- `script.js`: button label changed from "Sample data ▾" to "Add data ▾".
- Popover height reverted from 70vh back to 60vh on the user's request.

## Next steps
1. The user may continue iterating on individual versions. They've shown a lot of UX taste, so expect targeted polish requests per version.
2. **Wire up real reference data.** `refTree` and `refValueMap` in `script.js` currently use sample person/company/score data (Ada Lovelace, London, etc.). The user mentioned this is intended for observability tooling — swap to their real schema when they're ready.
3. **Save button.** Currently `console.log` + `alert`. Wire to a backend whenever they decide on persistence.
4. **Possible refactor:** the version-detection-by-DOM (checking for `#test-btn`, `#live-preview`, `.test-panel`, `.test-strip`) works but isn't elegant. If the version count grows, consider a `data-version` attribute on `<body>` and a small dispatcher.
5. The user *might* want to pick a winning version and consolidate. They've been comparing — at some point they may say "ship v3" or "go with v5".

## Decisions made
- **Plain HTML/CSS/JS, no build step, no frameworks.** User explicitly preferred a "simple project" over the original React scaffold offer.
- **Single shared `script.js` and `style.css` across all five HTML pages.** Each HTML file defines version-specific DOM; JS detects what's present and only wires that up. Trade-off: simple for now; could fragment if versions diverge further.
- **Reference picker lives outside `.popover` in the DOM.** Forced by `.popover`'s `transform: translateX(-50%)` creating a new containing block for `position: fixed` descendants.
- **Slot input model**: empty/static slots render as inline `<input>` elements; ref slots render as chips. Typing in the slot input directly drives the static value; the picker only handles reference selection. This was a deliberate UX decision after user feedback.
- **v5's drag handle uses a CSS custom property** (`--test-strip-height`) set via JS during drag, with `grid-template-rows: minmax(0, 1fr) var(--test-strip-height)`. Cleaner than manipulating `grid-template-rows` directly each frame.
- **Examples insert as fn tokens, not raw strings.** A small parser splits the example's arguments respecting nested parens/strings, then builds slots so the example is fully editable after insertion.

## Gotchas & notes
- The five gotchas in CLAUDE.md's "Layout gotchas" section are the most important — re-read them if you're touching CSS layout or any code that re-renders on click.
- **CLAUDE.md is canonical.** The token/slot model and evaluator structure are documented there; the handoff just points at it.
- Some of the version-specific CSS uses three-class selectors (e.g. `.pop-body.view-builder.builder-with-test`) to outweigh `.pop-body.view-builder { grid-template-columns: 240px 1fr }` defined later in the file. If you add a new layout variant, do the same — *not* `!important`.
- **No emojis in code** unless the user asks. They didn't here, so SVGs were used for icons (Docs link, Test play arrow, Close ×).
- The popover starts visible on page load. Click-outside closes it, and the "Edit formula" button on the host page reopens it. This is true on all five versions.
- The user types very informally and frequently has typos ("ref" without "erence", "thr", etc.). Read intent over literal wording.
