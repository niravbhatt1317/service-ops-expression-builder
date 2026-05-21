// ---------- Catalog ----------
const catalog = {
  Properties: [
    { key: 'Reach',       icon: '#',  desc: 'Estimated reach.',  sample: 3,
      examples: ['Reach', 'Reach * Impact'] },
    { key: 'Impact',      icon: '#',  desc: 'Estimated impact.', sample: 2,
      examples: ['Impact', 'Impact >= 2'] },
    { key: 'Confidence',  icon: '#',  desc: 'Confidence level.', sample: 2,
      examples: ['Confidence'] },
    { key: 'Effort',      icon: '#',  desc: 'Estimated effort.', sample: 2,
      examples: ['Effort', 'Reach * Impact * Confidence / Effort'] },
    { key: 'Status',      icon: '◌',  desc: 'Status property.',  sample: 'In progress',
      examples: ['Status', 'Status == "Done"'] },
    { key: 'Name',        icon: 'Aa', desc: 'Name property.',    sample: 'Untitled',
      examples: ['Name', 'length(Name)'] },
    { key: 'CreatedTime', icon: '◷',  desc: 'Created time (ms).', sample: Date.now(),
      examples: ['CreatedTime', 'daysBetween(CreatedTime, now())'] },
  ],

  Functions: [
    // Date
    { key: 'now',         group: 'Date',   icon: 'ƒ', desc: 'Current timestamp in ms.',
      signature: 'now()', params: [],
      examples: ['now()', 'formatDate(now())', 'now() - CreatedTime'] },
    { key: 'addDays',     group: 'Date',   icon: 'ƒ', desc: 'Add days to a timestamp (ms).',
      signature: 'addDays(date, n)', params: ['date', 'n'],
      examples: ['addDays(now(), 7)', 'addDays(CreatedTime, 30)', 'addDays(now(), -1)'] },
    { key: 'daysBetween', group: 'Date',   icon: 'ƒ', desc: 'Whole days between two timestamps.',
      signature: 'daysBetween(a, b)', params: ['a', 'b'],
      examples: ['daysBetween(CreatedTime, now())', 'daysBetween(now(), addDays(now(), 30))'] },
    { key: 'formatDate',  group: 'Date',   icon: 'ƒ', desc: 'Format a timestamp as ISO string.',
      signature: 'formatDate(date)', params: ['date'],
      examples: ['formatDate(now())', 'formatDate(CreatedTime)', 'formatDate(addDays(now(), 7))'] },

    // String
    { key: 'length',   group: 'String', icon: 'ƒ', desc: 'Length of a string.',
      signature: 'length(text)', params: ['text'],
      examples: ['length(Name)', 'length(Name) > 0', 'length(Status)'] },
    { key: 'concat',   group: 'String', icon: 'ƒ', desc: 'Concatenate values into one string.',
      signature: 'concat(a, b, …)', params: ['a', 'b'],
      examples: ['concat(Name, " — ", Status)', 'concat("Hello, ", Name)', 'concat(upper(Name), " (", Status, ")")'] },
    { key: 'upper',    group: 'String', icon: 'ƒ', desc: 'Uppercase a string.',
      signature: 'upper(text)', params: ['text'],
      examples: ['upper(Name)', 'upper(Status)', 'concat(upper(Name), "!")'] },
    { key: 'lower',    group: 'String', icon: 'ƒ', desc: 'Lowercase a string.',
      signature: 'lower(text)', params: ['text'],
      examples: ['lower(Name)', 'contains(lower(Name), "draft")'] },
    { key: 'contains', group: 'String', icon: 'ƒ', desc: 'Check if a string contains a substring.',
      signature: 'contains(haystack, needle)', params: ['haystack', 'needle'],
      examples: ['contains(Name, "test")', 'contains(lower(Name), "draft")', 'contains(Status, "progress")'] },
    { key: 'slice',    group: 'String', icon: 'ƒ', desc: 'Substring from start to end.',
      signature: 'slice(text, start, end)', params: ['text', 'start', 'end'],
      examples: ['slice(Name, 0, 3)', 'slice(Name, 0, 10)', 'slice(Status, 0, 1)'] },

    // Math
    { key: 'round', group: 'Math', icon: 'ƒ', desc: 'Round to nearest integer.',
      signature: 'round(n)', params: ['n'],
      examples: ['round(Reach * Impact / Effort)', 'round(3.7)', 'round(Reach / 2)'] },
    { key: 'abs',   group: 'Math', icon: 'ƒ', desc: 'Absolute value.',
      signature: 'abs(n)', params: ['n'],
      examples: ['abs(Reach - Effort)', 'abs(-5)', 'abs(Impact - Confidence)'] },
    { key: 'min',   group: 'Math', icon: 'ƒ', desc: 'Smallest of the values.',
      signature: 'min(a, b, …)', params: ['a', 'b'],
      examples: ['min(Reach, Impact)', 'min(Reach, Impact, Confidence)', 'min(0, Effort)'] },
    { key: 'max',   group: 'Math', icon: 'ƒ', desc: 'Largest of the values.',
      signature: 'max(a, b, …)', params: ['a', 'b'],
      examples: ['max(Reach, Impact)', 'max(Reach, 1)', 'max(Reach, Impact, Confidence)'] },
    { key: 'pow',   group: 'Math', icon: 'ƒ', desc: 'Base raised to exponent.',
      signature: 'pow(base, exp)', params: ['base', 'exp'],
      examples: ['pow(Reach, 2)', 'pow(2, Effort)', 'pow(Confidence, 0.5)'] },
    { key: 'sqrt',  group: 'Math', icon: 'ƒ', desc: 'Square root.',
      signature: 'sqrt(n)', params: ['n'],
      examples: ['sqrt(Reach)', 'sqrt(Reach * Impact)', 'sqrt(pow(Reach, 2) + pow(Impact, 2))'] },

    // Logic
    { key: 'if', group: 'Logic', icon: 'ƒ', desc: 'Returns first value if condition is true, else second.',
      signature: 'if(condition, a, b)', params: ['condition', 'a', 'b'],
      examples: ['if(Status == "Done", "✓", "…")', 'if(Reach > Impact, "high reach", "high impact")', 'if(Effort == 0, 0, Reach / Effort)'] },
  ],

  Operators: [
    // Comparison
    { key: '==', icon: '⊕', group: 'Comparison', desc: 'Equality comparison.',
      examples: ['Status == "Done"', 'Reach == Impact', 'Name == "Untitled"'] },
    { key: '!=', icon: '⊕', group: 'Comparison', desc: 'Inequality comparison.',
      examples: ['Status != "Done"', 'Name != ""', 'Reach != Effort'] },
    { key: '>',  icon: '⊕', group: 'Comparison', desc: 'Greater than.',
      examples: ['Reach > Impact', 'Effort > 2', 'length(Name) > 0'] },
    { key: '<',  icon: '⊕', group: 'Comparison', desc: 'Less than.',
      examples: ['Reach < 5', 'Effort < Impact', 'Confidence < 3'] },
    { key: '>=', icon: '⊕', group: 'Comparison', desc: 'Greater than or equal.',
      examples: ['Reach >= 3', 'length(Name) >= 1', 'Impact >= Confidence'] },
    { key: '<=', icon: '⊕', group: 'Comparison', desc: 'Less than or equal.',
      examples: ['Effort <= 2', 'Confidence <= 3'] },

    // Arithmetic
    { key: '+', icon: '⊕', group: 'Arithmetic', desc: 'Addition.',
      examples: ['Reach + Impact', 'Confidence + 1', 'Reach + Impact + Confidence'] },
    { key: '-', icon: '⊕', group: 'Arithmetic', desc: 'Subtraction.',
      examples: ['Reach - Effort', 'now() - CreatedTime', '10 - Effort'] },
    { key: '*', icon: '⊕', group: 'Arithmetic', desc: 'Multiplication.',
      examples: ['Reach * Impact', '2 * Confidence', 'Effort * 0.5'] },
    { key: '/', icon: '⊕', group: 'Arithmetic', desc: 'Division.',
      examples: ['Reach / Effort', 'Impact / 2', '(Reach * Impact) / Effort'] },
    { key: '%', icon: '⊕', group: 'Arithmetic', desc: 'Modulo (remainder).',
      examples: ['Reach % 2', 'Effort % 3'] },

    // Logical
    { key: '&&', icon: '⊕', group: 'Logical', desc: 'Logical AND.',
      examples: ['Reach > 2 && Effort < 3', 'Status == "Done" && Confidence > 1', 'length(Name) > 0 && Reach > 0'] },
    { key: '||', icon: '⊕', group: 'Logical', desc: 'Logical OR.',
      examples: ['Status == "Done" || Status == "In progress"', 'Reach > 5 || Impact > 5'] },
    { key: '!',  icon: '⊕', group: 'Logical', desc: 'Logical NOT.',
      examples: ['!(Status == "Done")', '!contains(Name, "draft")'] },

    // Grouping
    { key: '(', icon: '⊕', group: 'Grouping', desc: 'Open parenthesis.',
      examples: ['(Reach + Impact) * Confidence', 'round((Reach + Impact) / 2)'] },
    { key: ')', icon: '⊕', group: 'Grouping', desc: 'Close parenthesis.',
      examples: ['(Reach + Impact) * Confidence', 'if((Reach > Impact), "R", "I")'] },
    { key: ',', icon: '⊕', group: 'Grouping', desc: 'Argument separator.',
      examples: ['concat(Name, ", ", Status)', 'min(Reach, Impact, Confidence)'] },
  ],
};

// ---------- Reference tree (sample data; swap to real schema later) ----------
const refTree = [
  { name: 'Person', icon: '◌', children: [
    { name: 'First name', id: 'person.first_name' },
    { name: 'Last name',  id: 'person.last_name' },
    { name: 'Full name',  id: 'person.full_name' },
    { name: 'Email addresses', icon: '@', children: [
      { name: 'Work email',     id: 'person.work_email' },
      { name: 'Personal email', id: 'person.personal_email' },
    ]},
    { name: 'Description', id: 'person.description' },
    { name: 'Job title',   id: 'person.job_title' },
    { name: 'Phone numbers', icon: '☎', children: [
      { name: 'Work phone',     id: 'person.work_phone' },
      { name: 'Personal phone', id: 'person.personal_phone' },
    ]},
    { name: 'Primary location', icon: '◉', children: [
      { name: 'City',    icon: '◉', id: 'person.location.city' },
      { name: 'State',   icon: '◉', id: 'person.location.state' },
      { name: 'Country', icon: '◉', id: 'person.location.country' },
    ]},
  ]},
  { name: 'Company', icon: '◈', children: [
    { name: 'Name',     id: 'company.name' },
    { name: 'Domain',   id: 'company.domain' },
    { name: 'Industry', id: 'company.industry' },
    { name: 'Size',     id: 'company.size' },
  ]},
  { name: 'Score', icon: '#', children: [
    { name: 'Reach',      id: 'score.reach' },
    { name: 'Impact',     id: 'score.impact' },
    { name: 'Confidence', id: 'score.confidence' },
    { name: 'Effort',     id: 'score.effort' },
  ]},
];

// Sample values for evaluation. Replace with real data wiring in production.
const refValueMap = {
  'person.first_name':       'Ada',
  'person.last_name':        'Lovelace',
  'person.full_name':        'Ada Lovelace',
  'person.work_email':       'ada@example.com',
  'person.personal_email':   'ada@home.com',
  'person.description':      'Mathematician',
  'person.job_title':        'Engineer',
  'person.work_phone':       '+1-555-0100',
  'person.personal_phone':   '+1-555-0200',
  'person.location.city':    'London',
  'person.location.state':   'England',
  'person.location.country': 'UK',
  'company.name':            'Analytical Engines Ltd',
  'company.domain':          'engines.example.com',
  'company.industry':        'Computing',
  'company.size':            50,
  'score.reach':             3,
  'score.impact':            2,
  'score.confidence':        2,
  'score.effort':            2,
};

function flattenLeaves(tree, pathSoFar = []) {
  const leaves = [];
  for (const node of tree) {
    const currentPath = [...pathSoFar, node.name];
    if (node.children && node.children.length) {
      leaves.push(...flattenLeaves(node.children, currentPath));
    } else {
      leaves.push({ ...node, path: currentPath });
    }
  }
  return leaves;
}
const allLeaves = flattenLeaves(refTree);

// ---------- State ----------
let tokens = [];
let refValues = Object.fromEntries(catalog.Properties.map(p => [p.key, p.sample]));
let currentView = 'builder';
let currentTab = 'All';
let searchQuery = '';

// Picker state
let pickerSlot = null;   // { path: [tokIdx, slotIdx, ...] }
let pickerPath = [];     // navigation into the ref tree
let pickerQuery = '';

// Track which slot input is currently focused, so the inline / floating
// ref button and left-list-into-slot insertion know their target.
let focusedSlot = null;  // { path, inp }
const isV1 = () => document.body.dataset.version === 'v1';
const isV2 = () => document.body.dataset.version === 'v2';
// Versions that use the new manual-ref flow: no auto-picker on focus,
// '#' shortcut, and left-list functions nest into the focused slot.
const usesManualRef = () => isV1() || isV2();

// Slot addressing: a path is [topLevelTokenIdx, slotIdx, slotIdx, ...].
// Length >= 2 addresses a slot; the last index is into its parent's `args`.
function getSlotAtPath(path) {
  let node = tokens[path[0]];
  for (let i = 1; i < path.length; i++) node = node.args[path[i]];
  return node;
}
function setSlotAtPath(path, newSlot) {
  let parent = tokens[path[0]];
  for (let i = 1; i < path.length - 1; i++) parent = parent.args[path[i]];
  parent.args[path[path.length - 1]] = newSlot;
}
function parentFnOfSlot(path) {
  let node = tokens[path[0]];
  for (let i = 1; i < path.length - 1; i++) node = node.args[path[i]];
  return node;
}
function paramNameForSlot(path) {
  const parent = parentFnOfSlot(path);
  const def = catalog.Functions.find(f => f.key === parent.name);
  const slotIdx = path[path.length - 1];
  return (def && def.params && def.params[slotIdx]) || 'arg';
}

// ---------- Render: list pane ----------
function renderList() {
  const body = document.getElementById('list-body');
  body.innerHTML = '';

  const q = searchQuery.trim().toLowerCase();
  const matches = (it) => {
    if (!q) return true;
    return it.key.toLowerCase().includes(q) ||
           (it.desc || '').toLowerCase().includes(q) ||
           (it.group || '').toLowerCase().includes(q);
  };

  const categories = q
    ? ['Functions', 'Operators']
    : currentTab === 'All'
      ? ['Functions', 'Operators']
      : [currentTab];

  const showCategoryHeading = categories.length > 1;
  let any = false;

  for (const cat of categories) {
    const items = catalog[cat] || [];
    const groups = new Map();
    for (const item of items) {
      if (!matches(item)) continue;
      const g = item.group || '';
      if (!groups.has(g)) groups.set(g, []);
      groups.get(g).push(item);
    }
    if (groups.size === 0) continue;
    any = true;

    if (showCategoryHeading) {
      const ch = document.createElement('div');
      ch.className = 'list-category-title';
      ch.textContent = cat;
      body.appendChild(ch);
    }

    for (const [groupName, list] of groups) {
      if (groupName) {
        const title = document.createElement('div');
        title.className = 'list-group-title';
        title.textContent = groupName;
        body.appendChild(title);
      }
      for (const item of list) {
        const row = document.createElement('div');
        row.className = 'list-item';
        row.dataset.group = cat;
        row.dataset.key = item.key;
        row.innerHTML = `<span class="icon">${item.icon || ''}</span><span>${item.key}</span>`;
        row.addEventListener('mouseenter', () => selectItem(cat, item.key));
        row.addEventListener('focus', () => selectItem(cat, item.key));
        row.addEventListener('click', () => insertFromCatalog(cat, item));
        body.appendChild(row);
      }
    }
  }

  if (!any) {
    const empty = document.createElement('div');
    empty.className = 'list-empty';
    empty.textContent = 'No matches';
    body.appendChild(empty);
    document.getElementById('detail-pane').innerHTML =
      '<div class="detail-empty">No item selected.</div>';
    return;
  }

  const firstItem = body.querySelector('.list-item');
  if (firstItem) selectItem(firstItem.dataset.group, firstItem.dataset.key);
}

// ---------- Render: detail pane ----------
function selectItem(group, key) {
  document.querySelectorAll('.list-item').forEach(el => el.classList.toggle(
    'active', el.dataset.group === group && el.dataset.key === key
  ));
  const item = catalog[group].find(i => i.key === key);
  if (!item) return;
  const pane = document.getElementById('detail-pane');
  const examples = (item.examples || []).map(ex =>
    `<div class="example"><span>${escapeHTML(ex)}</span><button class="insert-btn" data-ex="${escapeAttr(ex)}">Insert</button></div>`
  ).join('');
  pane.innerHTML = `
    <div class="detail-header">
      <h2><span class="icon">${item.icon || ''}</span>${item.key}</h2>
      <button class="primary-btn small" id="insert-action">Insert</button>
    </div>
    <p class="desc">${item.desc || ''}</p>
    ${item.signature ? `<div class="signature">${escapeHTML(item.signature)}</div>` : ''}
    ${examples ? `<div class="examples-label">Examples</div>${examples}` : ''}
  `;
  document.getElementById('insert-action').addEventListener('click', () => insertFromCatalog(group, item));
  pane.querySelectorAll('.example .insert-btn').forEach(b => {
    b.addEventListener('click', () => insertRaw(b.dataset.ex));
  });
}

// ---------- Insertion ----------
function insertFromCatalog(group, item) {
  // v1/v2: if a slot is focused and we're inserting a function, nest it
  // inside the focused slot rather than pushing at the top level.
  if (usesManualRef() && group === 'Functions' && focusedSlot) {
    const slots = (item.params || []).map(name => ({ kind: 'empty', name }));
    const targetPath = focusedSlot.path;
    setSlotAtPath(targetPath, { kind: 'fn', name: item.key, args: slots });
    focusedSlot = null;
    hideSlotToolbar();
    renderFormula();
    // Focus the first empty slot of the newly-inserted nested fn for fast follow-up edits.
    requestAnimationFrame(() => {
      const firstSlotPath = [...targetPath, 0].join('.');
      const next = document.querySelector(`input.arg-slot[data-path="${firstSlotPath}"]`);
      if (next) next.focus();
    });
    return;
  }
  if (group === 'Properties') {
    pushToken({ type: 'prop', value: item.key });
  } else if (group === 'Functions') {
    const slots = (item.params || []).map(name => ({ kind: 'empty', name }));
    pushToken({ type: 'fn', name: item.key, args: slots });
  } else if (group === 'Operators') {
    const parenLike = item.key === '(' || item.key === ')' || item.key === ',';
    pushToken({ type: parenLike ? 'paren' : 'op', value: item.key });
  }
}

function insertRaw(text) {
  const parsed = parseExampleAsFn(text);
  if (parsed) pushToken(parsed);
  else pushToken({ type: 'raw', value: text });
}

// Try to interpret an example string as a single known-function call.
// Returns a fn token with each argument as a static slot (or empty slot for blanks),
// or null if the example isn't a simple function call we can match.
function parseExampleAsFn(text) {
  const trimmed = text.trim();
  // Match: name(  ... )   where the parens balance to the end.
  const m = trimmed.match(/^([a-zA-Z_$][\w$]*)\((.*)\)$/);
  if (!m) return null;
  const fnName = m[1];
  const inner = m[2];
  const def = catalog.Functions.find(f => f.key === fnName);
  if (!def) return null;
  // Make sure parens actually balance to the end (not e.g. `f(a) + g(b)`).
  if (!parensBalanceToEnd(trimmed, fnName.length)) return null;

  const args = splitTopLevelArgs(inner);
  const params = def.params || [];
  const slotCount = Math.max(args.length, params.length);
  const slots = [];
  for (let i = 0; i < slotCount; i++) {
    const t = (args[i] || '').trim();
    const name = params[i] || 'arg';
    slots.push(t === '' ? { kind: 'empty', name } : { kind: 'static', text: t });
  }
  return { type: 'fn', name: fnName, args: slots };
}

function parensBalanceToEnd(s, startAfter) {
  let depth = 0, inStr = false, q = '';
  for (let i = startAfter; i < s.length; i++) {
    const c = s[i];
    if (inStr) {
      if (c === '\\') { i++; continue; }
      if (c === q) inStr = false;
    } else if (c === '"' || c === "'") {
      inStr = true; q = c;
    } else if (c === '(') depth++;
    else if (c === ')') {
      depth--;
      if (depth === 0) return i === s.length - 1;
    }
  }
  return false;
}

function splitTopLevelArgs(s) {
  const args = [];
  let depth = 0, inStr = false, q = '', cur = '';
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inStr) {
      cur += c;
      if (c === '\\' && i + 1 < s.length) { cur += s[++i]; continue; }
      if (c === q) { inStr = false; q = ''; }
    } else if (c === '"' || c === "'") {
      inStr = true; q = c; cur += c;
    } else if (c === '(' || c === '[' || c === '{') { depth++; cur += c; }
    else if (c === ')' || c === ']' || c === '}') { depth--; cur += c; }
    else if (c === ',' && depth === 0) { args.push(cur); cur = ''; }
    else cur += c;
  }
  args.push(cur);
  return args;
}
function pushToken(tok) { tokens.push(tok); renderFormula(); }
function removeTokenAt(i) { tokens.splice(i, 1); renderFormula(); }

// Trigger live evaluation when the page has a live-preview strip (v3),
// a side test panel (v4), or a bottom test strip (v5). Manual Run still works.
function liveEvaluate() {
  if (document.getElementById('live-preview') ||
      document.querySelector('.test-panel') ||
      document.querySelector('.test-strip')) {
    evaluate();
  }
}

// ---------- Render: formula ----------
function renderFormula() {
  const el = document.getElementById('formula');
  el.innerHTML = '';
  if (tokens.length === 0) {
    const p = document.createElement('span');
    p.className = 'placeholder';
    p.textContent = 'Hover an item on the left to preview · click to add it here';
    el.appendChild(p);
  } else {
    tokens.forEach((tok, i) => {
      if (tok.type === 'fn') {
        el.appendChild(renderFnChip(tok, [i]));
      } else {
        const chip = document.createElement('span');
        chip.className = `token ${tok.type}`;
        chip.textContent = tok.value;
        chip.title = 'Click to remove';
        chip.addEventListener('click', (e) => {
          e.stopPropagation();
          removeTokenAt(i);
        });
        el.appendChild(chip);
      }
    });
  }
  document.getElementById('clear-btn').hidden = tokens.length === 0;
  liveEvaluate();
}

function renderFnChip(tok, basePath) {
  // basePath addresses this fn: [tokIdx] for top-level, [tokIdx, slotIdx, ...] when nested in a slot.
  const chip = document.createElement('span');
  chip.className = 'token fn-call';
  if (basePath.length > 1) chip.classList.add('nested');

  const name = document.createElement('span');
  name.className = 'fn-name';
  name.textContent = tok.name;
  chip.appendChild(name);

  const op = document.createElement('span');
  op.className = 'fn-paren';
  op.textContent = '(';
  chip.appendChild(op);

  tok.args.forEach((slot, slotIdx) => {
    if (slotIdx > 0) {
      const c = document.createElement('span');
      c.className = 'fn-comma';
      c.textContent = ',';
      chip.appendChild(c);
    }
    chip.appendChild(renderSlot(slot, [...basePath, slotIdx]));
  });

  const cp = document.createElement('span');
  cp.className = 'fn-paren';
  cp.textContent = ')';
  chip.appendChild(cp);

  const rm = document.createElement('span');
  rm.className = 'fn-remove';
  rm.textContent = '×';
  rm.title = 'Remove function';
  rm.addEventListener('click', (e) => {
    e.stopPropagation();
    if (basePath.length === 1) {
      removeTokenAt(basePath[0]);
    } else {
      setSlotAtPath(basePath, { kind: 'empty', name: paramNameForSlot(basePath) });
      renderFormula();
    }
  });
  chip.appendChild(rm);

  return chip;
}

function renderSlot(slot, path) {
  // Nested fn slot: render the function chip recursively, addressed at `path`.
  if (slot.kind === 'fn') {
    return renderFnChip(slot, path);
  }

  const pathKey = path.join('.');

  // Ref-filled: render as a chip; clicking clears it back to an empty input.
  if (slot.kind === 'ref') {
    const chip = document.createElement('span');
    chip.className = 'arg-slot ref';
    chip.dataset.path = pathKey;
    chip.textContent = slot.label;
    chip.title = `Reference: ${slot.path.join(' › ')}\nClick to change`;
    chip.addEventListener('click', (e) => {
      e.stopPropagation();
      setSlotAtPath(path, { kind: 'empty', name: paramNameForSlot(path) });
      renderFormula();
      // Focus the freshly-rendered empty input. In non-v2 versions, the
      // focus handler will reopen the picker. In v2, focus just sets the
      // active slot and shows the toolbar.
      requestAnimationFrame(() => {
        const newInp = document.querySelector(`input.arg-slot[data-path="${pathKey}"]`);
        if (newInp) newInp.focus();
      });
    });
    return chip;
  }

  // Empty or static: render as an inline text input.
  const inp = document.createElement('input');
  inp.type = 'text';
  inp.className = 'arg-slot';
  inp.dataset.path = pathKey;
  inp.placeholder = slot.name || 'arg';
  if (slot.kind === 'static') {
    inp.value = slot.text;
    inp.classList.add('filled');
  }
  autosizeInput(inp);

  inp.addEventListener('click', (e) => e.stopPropagation());
  inp.addEventListener('focus', () => {
    if (usesManualRef()) {
      focusedSlot = { path, inp };
      if (isV2()) showSlotToolbar(inp);
    } else if (inp.value === '') {
      openPicker(path, inp);
    }
  });
  inp.addEventListener('blur', () => {
    if (usesManualRef()) {
      // Delay so a mousedown on the inline button / toolbar / picker still runs.
      setTimeout(() => {
        if (focusedSlot && focusedSlot.inp === inp) {
          focusedSlot = null;
          hideSlotToolbar();
        }
      }, 150);
    }
  });
  inp.addEventListener('input', () => {
    autosizeInput(inp);
    const text = inp.value;
    if (text === '') {
      setSlotAtPath(path, { kind: 'empty', name: paramNameForSlot(path) });
      inp.classList.remove('filled');
      if (!usesManualRef()) openPicker(path, inp);
    } else {
      setSlotAtPath(path, { kind: 'static', text });
      inp.classList.add('filled');
      closePicker();
    }
    liveEvaluate();
  });
  inp.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      e.preventDefault();
      inp.blur();
      closePicker();
    } else if (usesManualRef() && e.key === '#') {
      e.preventDefault();
      openPicker(path, inp);
    }
  });

  // v1: inline '#' button next to the input opens the ref picker.
  if (isV1()) {
    const wrap = document.createElement('span');
    wrap.className = 'arg-slot-wrap';
    wrap.appendChild(inp);
    const refBtn = document.createElement('button');
    refBtn.type = 'button';
    refBtn.className = 'slot-ref-btn';
    refBtn.textContent = '#';
    refBtn.title = 'Insert reference (shortcut: #)';
    refBtn.addEventListener('mousedown', (e) => e.preventDefault());
    refBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openPicker(path, inp);
    });
    wrap.appendChild(refBtn);
    return wrap;
  }

  return inp;
}

function autosizeInput(inp) {
  const v = inp.value || inp.placeholder || '';
  const ch = Math.max(v.length, 4);
  inp.style.width = `${ch * 7 + 14}px`;
}

// ---------- Reference picker ----------
function openPicker(path, anchorEl) {
  pickerSlot = { path };
  pickerPath = [];
  pickerQuery = '';
  hideSlotToolbar();

  const picker = document.getElementById('ref-picker');
  picker.hidden = false;

  // Position the picker near the slot, but stay inside the viewport.
  const rect = anchorEl.getBoundingClientRect();
  const pw = 280, ph = 360;
  let left = rect.left;
  let top  = rect.bottom + 6;
  if (left + pw > window.innerWidth - 8) left = window.innerWidth - pw - 8;
  if (top  + ph > window.innerHeight - 8) top  = rect.top - ph - 6;
  picker.style.left = `${Math.max(8, left)}px`;
  picker.style.top  = `${Math.max(8, top)}px`;

  document.getElementById('rp-search').value = '';
  pickerQuery = '';
  renderPicker();
  // Do NOT auto-focus picker's search — the slot input is already focused
  // and the user is meant to type there for static values.
}

function closePicker() {
  pickerSlot = null;
  document.getElementById('ref-picker').hidden = true;
}

// ---------- Floating slot toolbar (v2) ----------
// Lives outside .popover for the same reason as the ref picker:
// .popover uses transform, which would break position:fixed children.
let slotToolbarEl = null;
function ensureSlotToolbar() {
  if (slotToolbarEl) return slotToolbarEl;
  slotToolbarEl = document.createElement('div');
  slotToolbarEl.className = 'slot-toolbar';
  slotToolbarEl.hidden = true;
  const refBtn = document.createElement('button');
  refBtn.type = 'button';
  refBtn.className = 'slot-toolbar-btn';
  refBtn.title = 'Insert reference (shortcut: #)';
  refBtn.innerHTML = '<span class="slot-toolbar-icon">#</span><span>Add reference</span>';
  // mousedown-preventDefault keeps the slot input from blurring before click fires.
  refBtn.addEventListener('mousedown', (e) => e.preventDefault());
  refBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!focusedSlot) return;
    openPicker(focusedSlot.path, focusedSlot.inp);
  });
  slotToolbarEl.appendChild(refBtn);
  document.body.appendChild(slotToolbarEl);
  return slotToolbarEl;
}
function showSlotToolbar(anchor) {
  const tb = ensureSlotToolbar();
  tb.hidden = false;
  // Measure after making visible so offsetHeight/Width are accurate.
  const rect = anchor.getBoundingClientRect();
  const tbW = tb.offsetWidth;
  const tbH = tb.offsetHeight;
  let top = rect.top - tbH - 6;
  if (top < 8) top = rect.bottom + 6; // flip below if no room above
  let left = rect.left;
  if (left + tbW > window.innerWidth - 8) left = window.innerWidth - tbW - 8;
  if (left < 8) left = 8;
  tb.style.top = `${top}px`;
  tb.style.left = `${left}px`;
}
function hideSlotToolbar() {
  if (slotToolbarEl) slotToolbarEl.hidden = true;
}

function renderPicker() {
  const list = document.getElementById('rp-list');
  const breadcrumb = document.getElementById('rp-breadcrumb');
  const backBtn = document.getElementById('rp-back');
  list.innerHTML = '';

  if (pickerPath.length === 0) {
    breadcrumb.textContent = 'References';
    backBtn.hidden = true;
  } else {
    breadcrumb.textContent = pickerPath.join(' › ');
    backBtn.hidden = false;
  }

  const q = pickerQuery.trim();
  const ql = q.toLowerCase();

  if (q) {
    // Global search across all leaves
    const matches = allLeaves.filter(leaf =>
      leaf.name.toLowerCase().includes(ql) ||
      leaf.path.join(' ').toLowerCase().includes(ql)
    );
    if (matches.length > 0) {
      const sep = document.createElement('div');
      sep.className = 'rp-group-title';
      sep.textContent = 'References';
      list.appendChild(sep);
    }
    matches.forEach(leaf => {
      const row = document.createElement('div');
      row.className = 'rp-item';
      const parentPath = leaf.path.slice(0, -1).join(' › ');
      row.innerHTML = `
        <span class="rp-name">${escapeHTML(leaf.name)}${parentPath ? `<div class="rp-path">${escapeHTML(parentPath)}</div>` : ''}</span>
      `;
      row.addEventListener('click', (e) => {
        e.stopPropagation();
        applyRef(leaf);
      });
      list.appendChild(row);
    });
    if (matches.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'rp-empty';
      empty.textContent = 'No matching references';
      list.appendChild(empty);
    }
  } else {
    const level = getLevelAt(pickerPath);
    level.forEach(node => {
      const row = document.createElement('div');
      row.className = 'rp-item';
      const hasChildren = !!(node.children && node.children.length);
      const count = hasChildren ? node.children.length : '';
      row.innerHTML = `
        <span class="rp-name">${escapeHTML(node.name)}</span>
        ${count ? `<span class="rp-count">${count}</span>` : ''}
        ${hasChildren ? '<span class="rp-chev">›</span>' : ''}
      `;
      row.addEventListener('click', (e) => {
        e.stopPropagation();
        if (hasChildren) {
          pickerPath.push(node.name);
          renderPicker();
        } else {
          const path = [...pickerPath, node.name];
          applyRef({ ...node, path });
        }
      });
      list.appendChild(row);
    });
    if (level.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'rp-empty';
      empty.textContent = 'No references';
      list.appendChild(empty);
    }
  }
}

function getLevelAt(path) {
  let level = refTree;
  for (const segment of path) {
    const node = level.find(n => n.name === segment);
    if (!node) return [];
    level = node.children || [];
  }
  return level;
}

function applyStatic(text) {
  if (!pickerSlot) return;
  setSlotAtPath(pickerSlot.path, { kind: 'static', text });
  renderFormula();
  closePicker();
}

function applyRef(leaf) {
  if (!pickerSlot) return;
  setSlotAtPath(pickerSlot.path, { kind: 'ref', label: leaf.name, path: leaf.path, id: leaf.id });
  renderFormula();
  closePicker();
}

// ---------- Test view ----------
function renderRefs() {
  const wrap = document.getElementById('refs-list');
  wrap.innerHTML = '';
  for (const prop of catalog.Properties) {
    const row = document.createElement('div');
    row.className = 'ref-row';
    row.innerHTML = `
      <label>${prop.key}</label>
      <input data-key="${prop.key}" value="${escapeAttr(String(refValues[prop.key]))}" />
    `;
    wrap.appendChild(row);
  }
  wrap.querySelectorAll('input').forEach(inp => {
    inp.addEventListener('input', () => {
      const raw = inp.value;
      const n = Number(raw);
      refValues[inp.dataset.key] = (raw !== '' && !Number.isNaN(n) && /^-?\d+(\.\d+)?$/.test(raw)) ? n : raw;
      liveEvaluate();
    });
  });
}

function tokenToSource(tok) {
  if (tok.type === 'fn') {
    const args = tok.args.map(slotToSource).join(', ');
    return `${tok.name}(${args})`;
  }
  return tok.value;
}

function slotToSource(slot) {
  if (slot.kind === 'fn') {
    const args = slot.args.map(slotToSource).join(', ');
    return `${slot.name}(${args})`;
  }
  if (slot.kind === 'static') {
    const t = slot.text.trim();
    if (t === 'true' || t === 'false' || t === 'null') return t;
    if (t !== '' && !Number.isNaN(Number(t)) && /^-?\d+(\.\d+)?$/.test(t)) return t;
    return JSON.stringify(slot.text);
  }
  if (slot.kind === 'ref') {
    return `_ref(${JSON.stringify(slot.id || slot.path.join('.'))})`;
  }
  return 'undefined';
}

function buildSource() {
  return tokens.map(tokenToSource).join(' ');
}

function evaluate() {
  const out = document.getElementById('result-output');
  const src = buildSource();
  out.classList.remove('error');
  if (tokens.length === 0) {
    out.classList.add('is-placeholder');
    out.textContent = 'Your expression is empty — add some tokens in the Builder first.';
    return;
  }
  out.classList.remove('is-placeholder');

  const fns = {
    if:          (c, a, b) => (c ? a : b),
    length:      (s) => (s == null ? 0 : String(s).length),
    concat:      (...args) => args.map(a => a == null ? '' : String(a)).join(''),
    upper:       (s) => String(s ?? '').toUpperCase(),
    lower:       (s) => String(s ?? '').toLowerCase(),
    contains:    (h, n) => String(h ?? '').includes(String(n ?? '')),
    slice:       (s, a, b) => String(s ?? '').slice(a, b),
    now:         () => Date.now(),
    addDays:     (ms, n) => Number(ms) + Number(n) * 86400000,
    daysBetween: (a, b) => Math.floor((Number(b) - Number(a)) / 86400000),
    formatDate:  (ms) => new Date(Number(ms)).toISOString(),
    round:       Math.round,
    abs:         Math.abs,
    min:         Math.min,
    max:         Math.max,
    pow:         Math.pow,
    sqrt:        Math.sqrt,
  };
  const _ref = (id) => refValueMap[id];

  const propKeys = Object.keys(refValues);
  const fnKeys = Object.keys(fns);
  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function(...propKeys, ...fnKeys, '_ref', `"use strict"; return (${src});`);
    const result = fn(...propKeys.map(k => refValues[k]), ...fnKeys.map(k => fns[k]), _ref);
    out.textContent = formatResult(result);
  } catch (e) {
    out.classList.add('error');
    out.textContent = `Error: ${e.message}`;
  }
}
function formatResult(v) {
  if (typeof v === 'string') return JSON.stringify(v);
  if (typeof v === 'object') return JSON.stringify(v, null, 2);
  return String(v);
}

// ---------- View / tab switching ----------
function setView(view) {
  currentView = view;
  // v1: tab buttons reflect active view
  document.querySelectorAll('.view-toggle .tab').forEach(t => {
    t.classList.toggle('active', t.dataset.view === view);
  });
  // v2: swap Test button ↔ Close button in the popover header
  const testBtn = document.getElementById('test-btn');
  if (testBtn) testBtn.hidden = view === 'test';
  const closeTestBtn = document.getElementById('close-test');
  if (closeTestBtn) closeTestBtn.hidden = view !== 'test';
  document.getElementById('view-builder').hidden = view !== 'builder';
  document.getElementById('view-test').hidden = view !== 'test';
}

function setTab(tab) {
  currentTab = tab;
  document.querySelectorAll('.list-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tab);
  });
  renderList();
}

// ---------- Utils ----------
function escapeHTML(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}
function escapeAttr(s) { return escapeHTML(s); }

// ---------- Wire up ----------
document.getElementById('clear-btn').addEventListener('click', () => { tokens = []; renderFormula(); });
document.getElementById('run-btn').addEventListener('click', evaluate);
// v1: tab buttons toggle the view
document.querySelectorAll('.view-toggle .tab').forEach(t => {
  t.addEventListener('click', () => setView(t.dataset.view));
});
// v2: dedicated Test button + close button
const testBtnEl = document.getElementById('test-btn');
if (testBtnEl) testBtnEl.addEventListener('click', () => setView('test'));
const closeTestEl = document.getElementById('close-test');
if (closeTestEl) closeTestEl.addEventListener('click', () => setView('builder'));

// v3: toggle inline add-data panel
const liveRefsToggle = document.getElementById('live-refs-toggle');
if (liveRefsToggle) {
  liveRefsToggle.addEventListener('click', () => {
    const refs = document.getElementById('live-refs');
    refs.hidden = !refs.hidden;
    liveRefsToggle.textContent = refs.hidden ? 'Add data ▾' : 'Add data ▴';
  });
}

// v4/v5: list-pane / test-panel collapse toggles
const listToggle = document.getElementById('list-pane-toggle');
if (listToggle) {
  listToggle.addEventListener('click', () => {
    const body = document.getElementById('view-builder');
    body.classList.toggle('list-collapsed');
    listToggle.textContent = body.classList.contains('list-collapsed') ? '›' : '‹';
  });
}
const testToggle = document.getElementById('test-panel-toggle');
if (testToggle) {
  testToggle.addEventListener('click', () => {
    const body = document.getElementById('view-builder');
    body.classList.toggle('test-collapsed');
    testToggle.textContent = body.classList.contains('test-collapsed') ? '‹' : '›';
  });
}
// v5: bottom test strip collapse toggle
const bottomTestToggle = document.getElementById('bottom-test-toggle');
if (bottomTestToggle) {
  bottomTestToggle.addEventListener('click', () => {
    const body = document.getElementById('view-builder');
    body.classList.toggle('bottom-test-collapsed');
    bottomTestToggle.textContent = body.classList.contains('bottom-test-collapsed') ? '▴' : '▾';
  });
}

// v5: drag the top edge of the test strip to resize it.
// Larger strip = smaller builder above (and vice versa).
const dragHandle = document.getElementById('bottom-drag-handle');
if (dragHandle) {
  let dragging = false;
  let startY = 0;
  let startHeight = 0;
  let bodyEl = null;

  dragHandle.addEventListener('mousedown', (e) => {
    e.preventDefault();
    bodyEl = document.getElementById('view-builder');
    const strip = document.querySelector('.test-strip');
    startY = e.clientY;
    startHeight = strip.getBoundingClientRect().height;
    dragging = true;
    dragHandle.classList.add('is-dragging');
    document.body.style.cursor = 'ns-resize';
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const deltaY = startY - e.clientY;
    // No bounds — drag freely in either direction. The grid layout +
    // overflow:hidden on pop-body clamp the visible size at the top, and
    // the test strip can shrink all the way down to 0.
    const newH = Math.max(0, startHeight + deltaY);
    bodyEl.style.setProperty('--test-strip-height', `${newH}px`);
  });

  document.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    dragHandle.classList.remove('is-dragging');
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  });
}
document.querySelectorAll('.list-tab').forEach(t => {
  t.addEventListener('click', () => setTab(t.dataset.tab));
});
document.getElementById('search-input').addEventListener('input', (e) => {
  searchQuery = e.target.value;
  renderList();
});
document.getElementById('open-popover').addEventListener('click', () => {
  document.getElementById('popover').hidden = false;
});

// Picker's own search filters references (does not touch the slot value).
document.getElementById('rp-search').addEventListener('input', (e) => {
  pickerQuery = e.target.value;
  renderPicker();
});
document.getElementById('rp-search').addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closePicker();
});
document.getElementById('rp-back').addEventListener('click', (e) => {
  e.stopPropagation();
  pickerPath.pop();
  renderPicker();
});

// Outside-click closes the picker first, then the popover.
document.addEventListener('click', (e) => {
  const popover = document.getElementById('popover');
  const picker  = document.getElementById('ref-picker');
  const openBtn = document.getElementById('open-popover');

  if (!picker.hidden) {
    if (!picker.contains(e.target)) closePicker();
    return;
  }
  if (popover.hidden) return;
  if (popover.contains(e.target) || openBtn.contains(e.target)) return;
  popover.hidden = true;
});

renderList();
renderFormula();
renderRefs();
setView('builder');
