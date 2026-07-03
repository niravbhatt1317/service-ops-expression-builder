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
    // Date  (fully authored: friendly title, returns, when-to-use, inputs, examples-with-results, related)
    { key: 'now', group: 'Date', icon: 'ƒ',
      title: 'Current date & time',
      returns: 'Date',
      desc: 'Gives you today’s date and time, right now.',
      whenToUse: 'Use it to stamp when something happens, or to compare against another date — like how long ago a ticket was created.',
      signature: 'now()', params: [], inputs: [],
      examples: ['now()', 'formatDate(now())', 'now() - CreatedTime'],
      examplesRich: [
        { expr: 'now()', note: 'the current date & time' },
        { expr: 'formatDate(now())', note: 'today as readable text, e.g. "2026-07-03"' },
        { expr: 'now() - CreatedTime', note: 'how long since it was created' },
      ],
      related: ['addDays', 'daysBetween', 'formatDate'] },

    { key: 'addDays', group: 'Date', icon: 'ƒ',
      title: 'Add days to a date',
      returns: 'Date',
      desc: 'Shifts a date forward or backward by a number of days.',
      whenToUse: 'Use it to work out due dates, reminders, or deadlines from a starting date.',
      signature: 'addDays(date, n)', params: ['date', 'n'],
      inputs: [
        { name: 'date', desc: 'the starting date' },
        { name: 'n', desc: 'how many days to add (use a negative number to go back in time)' },
      ],
      examples: ['addDays(now(), 7)', 'addDays(CreatedTime, 30)', 'addDays(now(), -1)'],
      examplesRich: [
        { expr: 'addDays(now(), 7)', note: 'one week from today' },
        { expr: 'addDays(CreatedTime, 30)', note: '30 days after it was created' },
        { expr: 'addDays(now(), -1)', note: 'yesterday' },
      ],
      related: ['now', 'daysBetween', 'formatDate'] },

    { key: 'daysBetween', group: 'Date', icon: 'ƒ',
      title: 'Days between two dates',
      returns: 'Number',
      desc: 'Counts the whole days from one date to another.',
      whenToUse: 'Use it to measure age or duration — like how many days a ticket has been open.',
      signature: 'daysBetween(a, b)', params: ['a', 'b'],
      inputs: [
        { name: 'a', desc: 'the earlier date' },
        { name: 'b', desc: 'the later date' },
      ],
      examples: ['daysBetween(CreatedTime, now())', 'daysBetween(now(), addDays(now(), 30))'],
      examplesRich: [
        { expr: 'daysBetween(CreatedTime, now())', note: 'how many days old it is' },
        { expr: 'daysBetween(now(), addDays(now(), 30))', note: '30' },
      ],
      related: ['now', 'addDays', 'formatDate'] },

    { key: 'formatDate', group: 'Date', icon: 'ƒ',
      title: 'Format a date as text',
      returns: 'Text',
      desc: 'Turns a date into readable text you can show or combine with other words.',
      whenToUse: 'Use it when you want to display a date, or join it into a sentence with concat.',
      signature: 'formatDate(date)', params: ['date'],
      inputs: [ { name: 'date', desc: 'the date to format' } ],
      examples: ['formatDate(now())', 'formatDate(CreatedTime)', 'formatDate(addDays(now(), 7))'],
      examplesRich: [
        { expr: 'formatDate(now())', note: 'today as text, e.g. "2026-07-03"' },
        { expr: 'formatDate(CreatedTime)', note: 'the creation date as text' },
        { expr: 'formatDate(addDays(now(), 7))', note: 'next week as text' },
      ],
      related: ['now', 'addDays', 'daysBetween'] },

    // String
    { key: 'length', group: 'String', icon: 'ƒ',
      title: 'Count characters',
      returns: 'Number',
      desc: 'Counts how many characters are in a piece of text.',
      whenToUse: 'Use it to check length — like flagging names that are empty or too long.',
      signature: 'length(text)', params: ['text'],
      inputs: [ { name: 'text', desc: 'the text to measure' } ],
      examples: ['length(Name)', 'length(Name) > 0', 'length(Status)'],
      examplesRich: [
        { expr: 'length(Name)', note: 'how many characters the name has' },
        { expr: 'length(Name) > 0', note: 'true if the name isn’t empty' },
        { expr: 'length(Status)', note: 'length of the status text' },
      ],
      related: ['contains', 'slice', 'concat'] },

    { key: 'concat', group: 'String', icon: 'ƒ',
      title: 'Join text together',
      returns: 'Text',
      desc: 'Sticks several values together into one piece of text.',
      whenToUse: 'Use it to build a label or sentence out of several fields.',
      signature: 'concat(a, b, …)', params: ['a', 'b'],
      inputs: [
        { name: 'a', desc: 'the first value' },
        { name: 'b, …', desc: 'more values to add on the end (text or numbers)' },
      ],
      examples: ['concat(Name, " — ", Status)', 'concat("Hello, ", Name)', 'concat(upper(Name), " (", Status, ")")'],
      examplesRich: [
        { expr: 'concat(Name, " — ", Status)', note: 'e.g. "Untitled — In progress"' },
        { expr: 'concat("Hello, ", Name)', note: 'a greeting with the name' },
        { expr: 'concat(upper(Name), " (", Status, ")")', note: 'name in caps with status in brackets' },
      ],
      related: ['upper', 'lower', 'length'] },

    { key: 'upper', group: 'String', icon: 'ƒ',
      title: 'Make text UPPERCASE',
      returns: 'Text',
      desc: 'Turns all the letters in text into capitals.',
      whenToUse: 'Use it to standardise text for display or comparison.',
      signature: 'upper(text)', params: ['text'],
      inputs: [ { name: 'text', desc: 'the text to capitalise' } ],
      examples: ['upper(Name)', 'upper(Status)', 'concat(upper(Name), "!")'],
      examplesRich: [
        { expr: 'upper(Name)', note: 'the name in ALL CAPS' },
        { expr: 'upper(Status)', note: 'the status in ALL CAPS' },
        { expr: 'concat(upper(Name), "!")', note: 'name in caps with an exclamation' },
      ],
      related: ['lower', 'concat', 'contains'] },

    { key: 'lower', group: 'String', icon: 'ƒ',
      title: 'Make text lowercase',
      returns: 'Text',
      desc: 'Turns all the letters in text into small letters.',
      whenToUse: 'Use it to compare text without worrying about capitalisation.',
      signature: 'lower(text)', params: ['text'],
      inputs: [ { name: 'text', desc: 'the text to lower-case' } ],
      examples: ['lower(Name)', 'contains(lower(Name), "draft")'],
      examplesRich: [
        { expr: 'lower(Name)', note: 'the name in lowercase' },
        { expr: 'contains(lower(Name), "draft")', note: 'true if it mentions “draft”, any case' },
      ],
      related: ['upper', 'contains', 'concat'] },

    { key: 'contains', group: 'String', icon: 'ƒ',
      title: 'Check if text contains something',
      returns: 'true/false',
      desc: 'Checks whether one piece of text appears inside another.',
      whenToUse: 'Use it to filter or flag items whose text includes a word — like anything marked “draft”.',
      signature: 'contains(haystack, needle)', params: ['haystack', 'needle'],
      inputs: [
        { name: 'haystack', desc: 'the text to search in' },
        { name: 'needle', desc: 'the word or phrase to look for' },
      ],
      examples: ['contains(Name, "test")', 'contains(lower(Name), "draft")', 'contains(Status, "progress")'],
      examplesRich: [
        { expr: 'contains(Name, "test")', note: 'true if the name includes “test”' },
        { expr: 'contains(lower(Name), "draft")', note: 'true if it mentions “draft”, any case' },
        { expr: 'contains(Status, "progress")', note: 'true while it’s in progress' },
      ],
      related: ['lower', 'length', 'slice'] },

    { key: 'slice', group: 'String', icon: 'ƒ',
      title: 'Take part of text',
      returns: 'Text',
      desc: 'Pulls out a section of text between two positions.',
      whenToUse: 'Use it to shorten text or grab a prefix — like the first few letters.',
      signature: 'slice(text, start, end)', params: ['text', 'start', 'end'],
      inputs: [
        { name: 'text', desc: 'the text to cut from' },
        { name: 'start', desc: 'position to start at (0 is the first character)' },
        { name: 'end', desc: 'position to stop before' },
      ],
      examples: ['slice(Name, 0, 3)', 'slice(Name, 0, 10)', 'slice(Status, 0, 1)'],
      examplesRich: [
        { expr: 'slice(Name, 0, 3)', note: 'the first 3 characters of the name' },
        { expr: 'slice(Name, 0, 10)', note: 'the first 10 characters' },
        { expr: 'slice(Status, 0, 1)', note: 'just the first letter of the status' },
      ],
      related: ['length', 'contains', 'concat'] },

    // Math
    { key: 'round', group: 'Math', icon: 'ƒ',
      title: 'Round to a whole number',
      returns: 'Number',
      desc: 'Rounds a number to the nearest whole number.',
      whenToUse: 'Use it to tidy up a calculated score or average for display.',
      signature: 'round(n)', params: ['n'],
      inputs: [ { name: 'n', desc: 'the number to round' } ],
      examples: ['round(Reach * Impact / Effort)', 'round(3.7)', 'round(Reach / 2)'],
      examplesRich: [
        { expr: 'round(Reach * Impact / Effort)', note: 'a tidy whole-number score' },
        { expr: 'round(3.7)', note: '4' },
        { expr: 'round(Reach / 2)', note: 'half the reach, rounded' },
      ],
      related: ['abs', 'min', 'max'] },

    { key: 'abs', group: 'Math', icon: 'ƒ',
      title: 'Ignore the minus sign',
      returns: 'Number',
      desc: 'Gives the size of a number, dropping any minus sign.',
      whenToUse: 'Use it to measure a gap or difference regardless of direction.',
      signature: 'abs(n)', params: ['n'],
      inputs: [ { name: 'n', desc: 'the number' } ],
      examples: ['abs(Reach - Effort)', 'abs(-5)', 'abs(Impact - Confidence)'],
      examplesRich: [
        { expr: 'abs(Reach - Effort)', note: 'how far apart reach and effort are' },
        { expr: 'abs(-5)', note: '5' },
        { expr: 'abs(Impact - Confidence)', note: 'the gap between impact and confidence' },
      ],
      related: ['round', 'min', 'max'] },

    { key: 'min', group: 'Math', icon: 'ƒ',
      title: 'Pick the smallest',
      returns: 'Number',
      desc: 'Returns the smallest of the numbers you give it.',
      whenToUse: 'Use it to cap a value or find the lowest of several.',
      signature: 'min(a, b, …)', params: ['a', 'b'],
      inputs: [
        { name: 'a', desc: 'the first number' },
        { name: 'b, …', desc: 'more numbers to compare' },
      ],
      examples: ['min(Reach, Impact)', 'min(Reach, Impact, Confidence)', 'min(0, Effort)'],
      examplesRich: [
        { expr: 'min(Reach, Impact)', note: 'the smaller of reach and impact' },
        { expr: 'min(Reach, Impact, Confidence)', note: 'the smallest of the three' },
        { expr: 'min(10, Effort)', note: 'effort, capped at 10' },
      ],
      related: ['max', 'round', 'abs'] },

    { key: 'max', group: 'Math', icon: 'ƒ',
      title: 'Pick the largest',
      returns: 'Number',
      desc: 'Returns the largest of the numbers you give it.',
      whenToUse: 'Use it to set a floor or find the highest of several.',
      signature: 'max(a, b, …)', params: ['a', 'b'],
      inputs: [
        { name: 'a', desc: 'the first number' },
        { name: 'b, …', desc: 'more numbers to compare' },
      ],
      examples: ['max(Reach, Impact)', 'max(Reach, 1)', 'max(Reach, Impact, Confidence)'],
      examplesRich: [
        { expr: 'max(Reach, Impact)', note: 'the bigger of reach and impact' },
        { expr: 'max(Reach, 1)', note: 'reach, but never below 1' },
        { expr: 'max(Reach, Impact, Confidence)', note: 'the largest of the three' },
      ],
      related: ['min', 'round', 'abs'] },

    { key: 'pow', group: 'Math', icon: 'ƒ',
      title: 'Raise to a power',
      returns: 'Number',
      desc: 'Multiplies a number by itself a given number of times.',
      whenToUse: 'Use it for squares, cubes, or growth-style calculations.',
      signature: 'pow(base, exp)', params: ['base', 'exp'],
      inputs: [
        { name: 'base', desc: 'the number to raise' },
        { name: 'exp', desc: 'the power to raise it to (2 = squared)' },
      ],
      examples: ['pow(Reach, 2)', 'pow(2, Effort)', 'pow(Confidence, 0.5)'],
      examplesRich: [
        { expr: 'pow(Reach, 2)', note: 'reach squared' },
        { expr: 'pow(2, Effort)', note: '2 to the power of effort' },
        { expr: 'pow(Confidence, 0.5)', note: 'the square root of confidence' },
      ],
      related: ['sqrt', 'round', 'abs'] },

    { key: 'sqrt', group: 'Math', icon: 'ƒ',
      title: 'Square root',
      returns: 'Number',
      desc: 'Finds the number that, multiplied by itself, gives your number.',
      whenToUse: 'Use it in scoring formulas that need to soften large values.',
      signature: 'sqrt(n)', params: ['n'],
      inputs: [ { name: 'n', desc: 'the number (must be 0 or more)' } ],
      examples: ['sqrt(Reach)', 'sqrt(Reach * Impact)', 'sqrt(pow(Reach, 2) + pow(Impact, 2))'],
      examplesRich: [
        { expr: 'sqrt(Reach)', note: 'the square root of reach' },
        { expr: 'sqrt(Reach * Impact)', note: 'square root of reach × impact' },
        { expr: 'sqrt(pow(Reach, 2) + pow(Impact, 2))', note: 'the diagonal distance' },
      ],
      related: ['pow', 'round', 'abs'] },

    // Logic
    { key: 'if', group: 'Logic', icon: 'ƒ',
      title: 'Choose based on a condition',
      returns: 'Any',
      desc: 'Checks a condition and returns one value if it’s true, another if it’s false.',
      whenToUse: 'Use it to show different results depending on the data — like a status label or a safe fallback.',
      signature: 'if(condition, a, b)', params: ['condition', 'a', 'b'],
      inputs: [
        { name: 'condition', desc: 'a true/false test' },
        { name: 'a', desc: 'the result when the test is true' },
        { name: 'b', desc: 'the result when the test is false' },
      ],
      examples: ['if(Status == "Done", "✓", "…")', 'if(Reach > Impact, "high reach", "high impact")', 'if(Effort == 0, 0, Reach / Effort)'],
      examplesRich: [
        { expr: 'if(Status == "Done", "✓", "…")', note: 'a tick when done, dots otherwise' },
        { expr: 'if(Reach > Impact, "high reach", "high impact")', note: 'labels whichever is higher' },
        { expr: 'if(Effort == 0, 0, Reach / Effort)', note: 'avoids dividing by zero' },
      ],
      related: ['contains'] },
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

// Undo / redo history (v8). Each entry is a JSON snapshot of `tokens`.
let history = [];
let histIdx = -1;
let suppressHistory = false;

// Picker state
let pickerSlot = null;   // { path: [tokIdx, slotIdx, ...] }
let pickerPath = [];     // navigation into the ref tree
let pickerQuery = '';
let pickerMode = 'slot'; // 'slot' fills a function argument; 'append' adds a top-level ref token

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
           (it.title || '').toLowerCase().includes(q) ||
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
        const primary = item.title || item.key;
        const codeTag = item.title ? `<span class="li-code">${escapeHTML(item.key)}</span>` : '';
        row.innerHTML = `<span class="icon">${item.icon || ''}</span>` +
          `<span class="li-label"><span class="li-name">${escapeHTML(primary)}</span>${codeTag}</span>`;
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
  const isLearn = document.body.dataset.version === 'v7';
  // "Rich" cards carry the layman-friendly fields (title / whenToUse / etc.).
  const rich = !!(item.title || item.whenToUse);

  const exRows = (rich && item.examplesRich)
    ? item.examplesRich.map(ex => `
        <div class="example rich">
          <div class="ex-main">
            <code class="ex-src">${escapeHTML(ex.expr)}</code>
            <div class="ex-actions">
              ${isLearn ? `<button class="try-btn" data-ex="${escapeAttr(ex.expr)}">Try ▸</button>` : ''}
              <button class="insert-btn" data-ex="${escapeAttr(ex.expr)}">Insert</button>
            </div>
          </div>
          <div class="ex-note">→ ${escapeHTML(ex.note)}</div>
          <span class="ex-result" hidden></span>
        </div>`).join('')
    : (item.examples || []).map(ex =>
        `<div class="example"><span class="ex-src">${escapeHTML(ex)}</span>` +
          (isLearn ? `<button class="try-btn" data-ex="${escapeAttr(ex)}">Try ▸</button>` : '') +
          `<button class="insert-btn" data-ex="${escapeAttr(ex)}">Insert</button>` +
          `<span class="ex-result" hidden></span></div>`
      ).join('');

  if (rich) {
    const inputsHTML = (item.inputs && item.inputs.length)
      ? `<ul class="input-list">${item.inputs.map(p =>
          `<li><code>${escapeHTML(p.name)}</code> — ${escapeHTML(p.desc)}</li>`).join('')}</ul>`
      : `<p class="detail-muted">No inputs — just insert it.</p>`;
    const relatedHTML = (item.related && item.related.length)
      ? `<div class="detail-related"><span class="dr-label">See also</span>${item.related.map(k =>
          `<button class="related-link" data-group="Functions" data-key="${escapeAttr(k)}">${escapeHTML(funcTitle(k))}</button>`).join('')}</div>`
      : '';
    pane.innerHTML = `
      <div class="detail-header">
        <h2 class="detail-title">
          <span class="dt-friendly">${escapeHTML(item.title || item.key)}</span>
          <code class="dt-code">${escapeHTML(item.signature || item.key)}</code>
        </h2>
        <div class="detail-header-right">
          ${item.returns ? `<span class="returns-chip">Returns <b>${escapeHTML(item.returns)}</b></span>` : ''}
          <button class="primary-btn small" id="insert-action">Insert</button>
        </div>
      </div>
      ${item.group ? `<span class="detail-cat">${escapeHTML(item.group)}</span>` : ''}
      <p class="desc lead">${escapeHTML(item.desc || '')}</p>
      ${item.whenToUse ? `<div class="detail-block"><div class="detail-block-label">When to use</div><p class="detail-block-text">${escapeHTML(item.whenToUse)}</p></div>` : ''}
      <div class="detail-block"><div class="detail-block-label">Inputs</div>${inputsHTML}</div>
      <div class="detail-block"><div class="detail-block-label">Examples</div>${exRows}</div>
      ${relatedHTML}
    `;
  } else {
    pane.innerHTML = `
      <div class="detail-header">
        <h2><span class="icon">${item.icon || ''}</span>${escapeHTML(item.key)}</h2>
        <button class="primary-btn small" id="insert-action">Insert</button>
      </div>
      <p class="desc">${item.desc || ''}</p>
      ${item.signature ? `<div class="signature">${escapeHTML(item.signature)}</div>` : ''}
      ${exRows ? `<div class="examples-label">Examples</div>${exRows}` : ''}
    `;
  }

  document.getElementById('insert-action').addEventListener('click', () => insertFromCatalog(group, item));
  pane.querySelectorAll('.example .insert-btn').forEach(b => {
    b.addEventListener('click', () => insertRaw(b.dataset.ex));
  });
  // v7: run the example against current sample data, right in the card.
  pane.querySelectorAll('.example .try-btn').forEach(b => {
    b.addEventListener('click', (e) => {
      e.stopPropagation();
      const box = b.closest('.example').querySelector('.ex-result');
      const r = evalExampleSource(b.dataset.ex);
      box.hidden = false;
      if (r.ok) {
        box.className = 'ex-result';
        box.textContent = `▸ ${formatResult(r.value)}  ·  ${resultTypeLabel(r.value)}`;
      } else {
        box.className = 'ex-result error';
        box.textContent = `▸ ${r.error}`;
      }
    });
  });
  // "See also" links jump to the related function's card.
  pane.querySelectorAll('.related-link').forEach(b => {
    b.addEventListener('click', (e) => {
      e.stopPropagation();
      selectItem(b.dataset.group, b.dataset.key);
    });
  });
}

// Friendly display name for a function key (falls back to the key).
function funcTitle(k) {
  const f = catalog.Functions.find(x => x.key === k);
  return f ? (f.title || f.key) : k;
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
  if (document.getElementById('live-console')) { refreshConsole(); return; }   // v6
  if (document.getElementById('scenario-panel')) { refreshScenarios(); return; } // v7
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
      } else if (tok.type === 'ref') {
        const chip = document.createElement('span');
        chip.className = 'token ref-token';
        chip.textContent = tok.label;
        chip.title = `Reference: ${(tok.path || []).join(' › ')}\nClick to remove`;
        chip.addEventListener('click', (e) => {
          e.stopPropagation();
          removeTokenAt(i);
        });
        el.appendChild(chip);
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
  snapshotHistory();
  updateHostField();
  liveEvaluate();
}

// ---------- Undo / redo (v8) ----------
function snapshotHistory() {
  if (suppressHistory) return;
  const s = JSON.stringify(tokens);
  if (histIdx >= 0 && history[histIdx] === s) return;
  history = history.slice(0, histIdx + 1);
  history.push(s);
  histIdx = history.length - 1;
  updateHistoryButtons();
}
function updateHistoryButtons() {
  const u = document.getElementById('undo-btn');
  const r = document.getElementById('redo-btn');
  if (u) u.disabled = histIdx <= 0;
  if (r) r.disabled = histIdx >= history.length - 1;
}
function applyHistory() {
  suppressHistory = true;
  tokens = JSON.parse(history[histIdx]);
  renderFormula();
  suppressHistory = false;
  updateHistoryButtons();
}
function undo() { if (histIdx > 0) { histIdx--; applyHistory(); } }
function redo() { if (histIdx < history.length - 1) { histIdx++; applyHistory(); } }

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
    updateParamHint(path); // v6: contextual "what is this argument" hint
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
  pickerMode = 'slot';
  pickerSlot = { path };
  pickerPath = [];
  pickerQuery = '';
  hideSlotToolbar();

  const picker = document.getElementById('ref-picker');
  picker.hidden = false;
  positionPicker(picker, anchorEl);

  document.getElementById('rp-search').value = '';
  pickerQuery = '';
  renderPicker();
  // Do NOT auto-focus picker's search — the slot input is already focused
  // and the user is meant to type there for static values.
}

// Open the picker to append a reference as a new top-level token (Add reference).
function openRefAppend(anchorEl) {
  pickerMode = 'append';
  pickerSlot = null;
  pickerPath = [];
  pickerQuery = '';
  hideSlotToolbar();
  const picker = document.getElementById('ref-picker');
  picker.hidden = false;
  positionPicker(picker, anchorEl);
  document.getElementById('rp-search').value = '';
  renderPicker();
}

// Place the floating picker near an anchor while staying inside the viewport.
function positionPicker(picker, anchorEl) {
  const rect = anchorEl.getBoundingClientRect();
  const pw = 280, ph = 360;
  let left = rect.left;
  let top  = rect.bottom + 6;
  if (left + pw > window.innerWidth - 8) left = window.innerWidth - pw - 8;
  if (top  + ph > window.innerHeight - 8) top  = rect.top - ph - 6;
  picker.style.left = `${Math.max(8, left)}px`;
  picker.style.top  = `${Math.max(8, top)}px`;
}

function closePicker() {
  pickerSlot = null;
  pickerMode = 'slot';
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
  if (pickerMode === 'append') {
    closePicker();
    pushToken({ type: 'ref', label: leaf.name, path: leaf.path, id: leaf.id });
    return;
  }
  if (!pickerSlot) return;
  setSlotAtPath(pickerSlot.path, { kind: 'ref', label: leaf.name, path: leaf.path, id: leaf.id });
  renderFormula();
  closePicker();
}

// ---------- Test view ----------
function renderRefs() {
  const wrap = document.getElementById('refs-list');
  if (!wrap) return; // v6/v7 derive their test inputs from the formula instead
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
    // Namespace helper calls as _F.<name>() so reserved words like `if` are legal.
    return `_F.${tok.name}(${args})`;
  }
  // Raw tokens can hold whole expressions (e.g. "now() - CreatedTime") — wrap their calls too.
  if (tok.type === 'raw') return wrapHelperCalls(tok.value);
  if (tok.type === 'ref') return `_ref(${JSON.stringify(tok.id || (tok.path || []).join('.'))})`;
  return tok.value;
}

function slotToSource(slot) {
  if (slot.kind === 'fn') {
    const args = slot.args.map(slotToSource).join(', ');
    return `_F.${slot.name}(${args})`;
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

// Human-readable one-line rendering of the formula for the host field (not JS source).
function slotToDisplay(slot) {
  if (!slot) return '';
  if (slot.kind === 'fn') return fnToDisplay(slot);
  if (slot.kind === 'ref') return slot.label;
  if (slot.kind === 'static') return slot.text;
  return slot.name || 'arg';
}
function fnToDisplay(tok) {
  return `${tok.name}(${tok.args.map(slotToDisplay).join(', ')})`;
}
function formulaToDisplay() {
  return tokens.map(tok => {
    if (tok.type === 'fn') return fnToDisplay(tok);
    if (tok.type === 'ref') return tok.label;
    return tok.value;
  }).join(' ');
}
// v8 host field: show the built expression, or the placeholder when empty.
function updateHostField() {
  const el = document.getElementById('ef-value');
  if (!el) return;
  const txt = formulaToDisplay().trim();
  if (txt) { el.textContent = txt; el.classList.remove('is-empty'); }
  else { el.textContent = 'Open the expression builder'; el.classList.add('is-empty'); }
}

// Helper functions available inside every evaluated expression.
const EVAL_FNS = {
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

// Rewrite bare helper calls (`if(`, `now(`, …) into `_F.if(` so reserved
// words are legal. Only used on trusted sources (built source / catalog examples).
const HELPER_CALL_RE = new RegExp('\\b(' + Object.keys(EVAL_FNS).join('|') + ')\\s*\\(', 'g');
function wrapHelperCalls(src) {
  return src.replace(HELPER_CALL_RE, '_F.$1(');
}

// Pure evaluator: compile the current tokens and run them against the given
// property values, with an optional per-reference override map. Returns
// { empty:true } | { ok:true, value } | { ok:false, error }.
function computeResult(propVals, refOverride) {
  if (tokens.length === 0) return { empty: true };
  const src = buildSource();
  const _ref = (id) =>
    (refOverride && Object.prototype.hasOwnProperty.call(refOverride, id))
      ? refOverride[id]
      : refValueMap[id];
  const propKeys = Object.keys(propVals);
  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function(...propKeys, '_F', '_ref', `"use strict"; return (${src});`);
    const value = fn(...propKeys.map(k => propVals[k]), EVAL_FNS, _ref);
    return { ok: true, value };
  } catch (e) {
    return { ok: false, error: e.message };
  }
}

// v8: mark the shown result as out-of-date after a test-value edit,
// prompting the user to press "Run test".
function markResultStale() {
  const out = document.getElementById('result-output');
  if (!out || tokens.length === 0) return;
  out.classList.add('stale');
  const rt = document.getElementById('run-test');
  if (rt) rt.classList.add('attention');
  const box = document.getElementById('result-check');
  if (box) box.hidden = true; // re-validate on next run
}

// v8: short description of the selected Output Type, shown under the dropdown.
const OUTPUT_TYPE_HINTS = {
  any:     'Any type — the result is accepted as-is, no validation.',
  string:  'The result should be <b>text</b> (a string).',
  number:  'The result should be a <b>number</b>.',
  boolean: 'The result should be <b>true</b> or <b>false</b>.',
  date:    'The result should be a <b>date</b> or timestamp.',
};
function updateOutputTypeHint() {
  const sel = document.getElementById('output-type');
  const box = document.getElementById('output-type-hint');
  if (!sel || !box) return;
  box.innerHTML = OUTPUT_TYPE_HINTS[sel.value] || '';
}

// v8: compare the actual result type against the chosen Output Type.
function validateOutputType(value, hasValue) {
  const sel = document.getElementById('output-type');
  const box = document.getElementById('result-check');
  if (!box) return;
  if (!sel || sel.value === 'any' || !hasValue) { box.hidden = true; return; }
  const opt = sel.options ? sel.options[sel.selectedIndex] : null;
  const label = opt ? opt.text : sel.value;
  const t = typeof value;
  let matches;
  switch (sel.value) {
    case 'string':  matches = t === 'string'; break;
    case 'number':  matches = t === 'number' && Number.isFinite(value); break;
    case 'boolean': matches = t === 'boolean'; break;
    case 'date':    matches = (t === 'number' && Number.isFinite(value)) ||
                              (t === 'string' && !Number.isNaN(Date.parse(value))); break;
    default:        matches = true;
  }
  box.hidden = false;
  box.className = 'result-check ' + (matches ? 'ok' : 'bad');
  box.textContent = matches
    ? `✓ Output is a valid ${label}`
    : `⚠ Expected ${label}, but got ${resultTypeLabel(value)}`;
}

function evaluate() {
  const out = document.getElementById('result-output');
  if (!out) return; // v7 shows results in its scenario table instead
  out.classList.remove('error', 'stale');
  const rt = document.getElementById('run-test');
  if (rt) rt.classList.remove('attention');
  if (tokens.length === 0) {
    out.classList.add('is-placeholder');
    out.textContent = 'Your expression is empty — add some tokens in the Builder first.';
    updateResultType(null);
    validateOutputType(null, false);
    return;
  }
  out.classList.remove('is-placeholder');
  const r = computeResult(refValues, null);
  if (r.ok) {
    out.textContent = formatResult(r.value);
    updateResultType(r.value);
    validateOutputType(r.value, true);
  } else {
    out.classList.add('error');
    out.textContent = `Error: ${r.error}`;
    updateResultType(null);
    validateOutputType(null, false);
  }
}
function formatResult(v) {
  if (typeof v === 'string') return JSON.stringify(v);
  if (typeof v === 'object') return JSON.stringify(v, null, 2);
  return String(v);
}

// ==========================================================================
//  Shared backbone for the newer versions (v6 Live Console, v7 Scenarios)
// ==========================================================================

// Which properties and references does the current formula actually use?
// Derived from the built source so it also catches raw-token expressions.
// Returns an ordered, de-duplicated list of { kind, key|id, label, sample }.
function collectUsedInputs() {
  const src = buildSource();
  // Blank out string literals so a typed word like "Reach" isn't mistaken for the property.
  const noStrings = src.replace(/"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'/g, '""');
  const used = [];
  const seen = new Set();
  for (const p of catalog.Properties) {
    const re = new RegExp('\\b' + p.key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b');
    if (re.test(noStrings) && !seen.has('prop:' + p.key)) {
      seen.add('prop:' + p.key);
      used.push({ kind: 'prop', key: p.key, label: p.key, sample: p.sample });
    }
  }
  const refRe = /_ref\(\s*(?:"([^"]*)"|'([^']*)')\s*\)/g;
  let m;
  while ((m = refRe.exec(src))) {
    const id = m[1] != null ? m[1] : m[2];
    if (seen.has('ref:' + id)) continue;
    seen.add('ref:' + id);
    const leaf = allLeaves.find(l => l.id === id);
    used.push({
      kind: 'ref', id,
      label: leaf ? leaf.name : id,
      path: leaf ? leaf.path : [id],
      sample: id in refValueMap ? refValueMap[id] : '',
    });
  }
  return used;
}

// Coerce a raw string test value into a number/boolean when it looks like one.
function coerceValue(raw) {
  if (typeof raw !== 'string') return raw;
  if (raw !== '' && /^-?\d+(\.\d+)?$/.test(raw)) return Number(raw);
  if (raw === 'true') return true;
  if (raw === 'false') return false;
  return raw;
}

function resultTypeLabel(v) {
  if (v === null || v === undefined) return 'empty';
  if (typeof v === 'number') return 'number';
  if (typeof v === 'boolean') return 'boolean';
  if (typeof v === 'string') return 'text';
  return typeof v;
}

// ---------- Plain-English translation (v6) ----------
const OP_WORDS = {
  '==': 'is equal to', '!=': 'is not equal to', '>': 'is greater than',
  '<': 'is less than', '>=': 'is at least', '<=': 'is at most',
  '+': 'plus', '-': 'minus', '*': 'times', '/': 'divided by', '%': 'modulo',
  '&&': 'and', '||': 'or', '!': 'not',
};
function slotToEnglish(slot) {
  if (!slot) return 'something';
  if (slot.kind === 'fn') return fnToEnglish(slot);
  if (slot.kind === 'ref') return slot.label;
  if (slot.kind === 'static') {
    const t = slot.text.trim();
    if (t === '') return 'something';
    if (/^-?\d+(\.\d+)?$/.test(t) || t === 'true' || t === 'false') return t;
    return `“${slot.text}”`;
  }
  return 'something';
}
function fnToEnglish(tok) {
  const a = tok.args.map(slotToEnglish);
  const g = (i) => a[i] || 'something';
  switch (tok.name) {
    case 'if':          return `if ${g(0)}, then ${g(1)}, otherwise ${g(2)}`;
    case 'concat':      return a.join(' followed by ');
    case 'length':      return `the length of ${g(0)}`;
    case 'upper':       return `${g(0)} in UPPERCASE`;
    case 'lower':       return `${g(0)} in lowercase`;
    case 'contains':    return `whether ${g(0)} contains ${g(1)}`;
    case 'slice':       return `characters ${g(1)}–${g(2)} of ${g(0)}`;
    case 'round':       return `${g(0)}, rounded`;
    case 'abs':         return `the absolute value of ${g(0)}`;
    case 'min':         return `the smallest of ${a.join(', ')}`;
    case 'max':         return `the largest of ${a.join(', ')}`;
    case 'pow':         return `${g(0)} to the power of ${g(1)}`;
    case 'sqrt':        return `the square root of ${g(0)}`;
    case 'now':         return 'the current time';
    case 'addDays':     return `${g(0)} plus ${g(1)} days`;
    case 'daysBetween': return `the number of days between ${g(0)} and ${g(1)}`;
    case 'formatDate':  return `${g(0)} formatted as a date`;
    default:            return `${tok.name} of (${a.join(', ')})`;
  }
}
function expressionToEnglish() {
  const parts = tokens.map(tok => {
    if (tok.type === 'fn') return fnToEnglish(tok);
    if (tok.type === 'op') return OP_WORDS[tok.value] || tok.value;
    return tok.value;
  });
  const s = parts.join(' ').replace(/\s+([,)])/g, '$1').replace(/\(\s+/g, '(').trim();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// ---------- v6: Live Console panels ----------
function renderReadsAs() {
  const el = document.getElementById('reads-as');
  if (!el) return;
  if (tokens.length === 0) {
    el.innerHTML = '<span class="ra-empty">Your formula will be described here in plain English as you build it.</span>';
    return;
  }
  el.textContent = expressionToEnglish();
}

let lastInputsSig = '';
function renderUsedInputs() {
  const host = document.getElementById('sample-values');
  if (!host) return;
  const used = collectUsedInputs();
  // Re-render only when the SET of used inputs changes — never mid-typing,
  // so editing a value doesn't steal focus from its own field.
  const sig = used.map(u => u.kind + ':' + (u.key || u.id)).join('|');
  if (sig === lastInputsSig && host.dataset.rendered) return;
  lastInputsSig = sig;
  host.dataset.rendered = '1';
  host.innerHTML = '';
  if (used.length === 0) {
    host.innerHTML = '<div class="sv-empty">This formula uses no properties or references yet, so its result is constant.</div>';
    return;
  }
  for (const u of used) {
    const key = u.key || u.id;
    const cur = u.kind === 'prop'
      ? refValues[key]
      : (u.id in refValueMap ? refValueMap[u.id] : u.sample);
    const row = document.createElement('div');
    row.className = 'sv-row';
    row.innerHTML = `
      <span class="sv-badge ${u.kind}">${u.kind === 'ref' ? '@' : '#'}</span>
      <label class="sv-label" title="${escapeAttr(u.path ? u.path.join(' › ') : key)}">${escapeHTML(u.label)}</label>
      <input class="sv-input" value="${escapeAttr(String(cur == null ? '' : cur))}" />
    `;
    const inp = row.querySelector('input');
    inp.addEventListener('input', () => {
      const val = coerceValue(inp.value);
      if (u.kind === 'prop') refValues[key] = val;
      else refValueMap[u.id] = val;
      // If a manual "Run test" button exists (v8), wait for it; otherwise
      // (v6) re-run live. Either way, never re-render this panel mid-typing.
      if (document.getElementById('run-test')) markResultStale();
      else evaluate();
    });
    host.appendChild(row);
  }
}
function updateResultType(v) {
  const el = document.getElementById('result-type');
  if (!el) return;
  if (tokens.length === 0) { el.hidden = true; return; }
  el.textContent = resultTypeLabel(v);
  el.hidden = false;
}
function refreshConsole() {
  renderReadsAs();
  renderUsedInputs();
  evaluate();
}

// ---------- v6: contextual parameter-hint bar ----------
function updateParamHint(path) {
  const bar = document.getElementById('param-hint');
  if (!bar) return;
  if (!path || path.length < 2) {
    bar.className = 'param-hint idle';
    bar.innerHTML = '<span class="ph-idle">Click a function’s argument slot to see what it expects.</span>';
    return;
  }
  const parent = parentFnOfSlot(path);
  const def = catalog.Functions.find(f => f.key === parent.name);
  if (!def) { bar.className = 'param-hint idle'; bar.innerHTML = '<span class="ph-idle">—</span>'; return; }
  const activeIdx = path[path.length - 1];
  const params = def.params || [];
  const sig = params.map((p, i) =>
    `<span class="ph-arg${i === activeIdx ? ' active' : ''}">${escapeHTML(p)}</span>`
  ).join('<span class="ph-comma">, </span>');
  const activeName = params[activeIdx] || 'arg';
  bar.className = 'param-hint';
  bar.innerHTML =
    `<span class="ph-sig"><span class="ph-fn">${escapeHTML(def.key)}</span>(${sig})</span>` +
    `<span class="ph-desc">${escapeHTML(def.desc || '')}</span>` +
    `<span class="ph-active">filling <b>${escapeHTML(activeName)}</b></span>`;
}

// ---------- v7: Scenario table ----------
let scenarios = [];
let scenarioSeq = 0;
let lastScenarioSig = '';
function makeScenario(used) {
  const vals = {};
  for (const u of used) vals[u.key || u.id] = u.sample;
  return { id: ++scenarioSeq, vals };
}
function ensureScenarios(used) {
  if (scenarios.length === 0) {
    scenarios.push(makeScenario(used));
    scenarios.push(makeScenario(used));
  }
  for (const s of scenarios) {
    for (const u of used) {
      const k = u.key || u.id;
      if (!(k in s.vals)) s.vals[k] = u.sample;
    }
  }
}
function scenarioResult(s, used) {
  const propVals = { ...refValues };
  const refOverride = {};
  for (const u of used) {
    const k = u.key || u.id;
    const v = coerceValue(s.vals[k]);
    if (u.kind === 'prop') propVals[k] = v;
    else refOverride[u.id] = v;
  }
  return computeResult(propVals, refOverride);
}
function recomputeScenario(rowIdx, used) {
  const cell = document.querySelector(`.sc-result[data-row="${rowIdx}"]`);
  if (!cell) return;
  cell.title = '';
  if (tokens.length === 0) { cell.textContent = '—'; cell.className = 'sc-result muted'; cell.dataset.row = rowIdx; return; }
  const r = scenarioResult(scenarios[rowIdx], used);
  if (r.empty) { cell.textContent = '—'; cell.className = 'sc-result muted'; }
  else if (r.ok) { cell.textContent = formatResult(r.value); cell.className = 'sc-result'; }
  else { cell.textContent = 'error'; cell.className = 'sc-result error'; cell.title = r.error; }
  cell.dataset.row = rowIdx;
}
function recomputeAllScenarios(used) {
  scenarios.forEach((_, i) => recomputeScenario(i, used));
}
function renderScenarioTable(used) {
  const wrap = document.getElementById('scenario-table');
  if (!wrap) return;
  const table = document.createElement('table');
  table.className = 'sc-table';
  const thead = document.createElement('thead');
  const hrow = document.createElement('tr');
  hrow.innerHTML = '<th class="sc-caseh">Case</th>' +
    used.map(u => `<th class="sc-colh ${u.kind}"><span class="sc-colbadge">${u.kind === 'ref' ? '@' : '#'}</span>${escapeHTML(u.label)}</th>`).join('') +
    '<th class="sc-resulth">Result</th>';
  thead.appendChild(hrow);
  table.appendChild(thead);
  const tbody = document.createElement('tbody');
  scenarios.forEach((s, r) => {
    const tr = document.createElement('tr');
    const caseCell = document.createElement('td');
    caseCell.className = 'sc-case';
    caseCell.textContent = String.fromCharCode(65 + r);
    tr.appendChild(caseCell);
    for (const u of used) {
      const k = u.key || u.id;
      const td = document.createElement('td');
      td.className = 'sc-cell';
      const inp = document.createElement('input');
      inp.className = 'sc-input';
      inp.value = s.vals[k] == null ? '' : String(s.vals[k]);
      inp.addEventListener('input', () => { s.vals[k] = inp.value; recomputeScenario(r, used); });
      td.appendChild(inp);
      tr.appendChild(td);
    }
    const rc = document.createElement('td');
    rc.className = 'sc-result';
    rc.dataset.row = r;
    tr.appendChild(rc);
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  wrap.innerHTML = '';
  wrap.appendChild(table);
  if (used.length === 0) {
    const note = document.createElement('div');
    note.className = 'sc-note';
    note.textContent = 'Add a property or reference to your formula and it becomes a column here automatically.';
    wrap.appendChild(note);
  }
}
function refreshScenarios() {
  const panel = document.getElementById('scenario-panel');
  if (!panel) return;
  const used = collectUsedInputs();
  ensureScenarios(used);
  const wrap = document.getElementById('scenario-table');
  const sig = used.map(u => u.kind + ':' + (u.key || u.id)).join('|') + '#' + scenarios.length;
  if (sig !== lastScenarioSig || !wrap.dataset.rendered) {
    lastScenarioSig = sig;
    wrap.dataset.rendered = '1';
    renderScenarioTable(used);
  }
  recomputeAllScenarios(used);
}
function addScenario() {
  scenarios.push(makeScenario(collectUsedInputs()));
  lastScenarioSig = '';
  refreshScenarios();
}

// ---------- v7: run a catalog example inline ("Try it") ----------
function evalExampleSource(src) {
  const _ref = (id) => refValueMap[id];
  const propKeys = Object.keys(refValues);
  try {
    // eslint-disable-next-line no-new-func
    const fn = new Function(...propKeys, '_F', '_ref', `"use strict"; return (${wrapHelperCalls(src)});`);
    const value = fn(...propKeys.map(k => refValues[k]), EVAL_FNS, _ref);
    return { ok: true, value };
  } catch (e) { return { ok: false, error: e.message }; }
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
  const vb = document.getElementById('view-builder');
  if (vb) vb.hidden = view !== 'builder';
  const vt = document.getElementById('view-test');
  if (vt) vt.hidden = view !== 'test';
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
const runBtnEl2 = document.getElementById('run-btn');
if (runBtnEl2) runBtnEl2.addEventListener('click', evaluate);
// v7: add another scenario row
const addScenarioBtn = document.getElementById('add-scenario');
if (addScenarioBtn) addScenarioBtn.addEventListener('click', addScenario);

// ---------- v8: header + footer controls ----------
function hidePopover() { document.getElementById('popover').hidden = true; }

const closeBtn = document.getElementById('close-popover');
if (closeBtn) closeBtn.addEventListener('click', hidePopover);
const cancelBtn = document.getElementById('cancel-btn');
if (cancelBtn) cancelBtn.addEventListener('click', hidePopover);

const resetBtn = document.getElementById('reset-btn');
if (resetBtn) resetBtn.addEventListener('click', () => {
  tokens = [];
  refValues = Object.fromEntries(catalog.Properties.map(p => [p.key, p.sample]));
  lastInputsSig = '';
  renderFormula();
});

const saveBtn = document.getElementById('save-btn');
if (saveBtn) saveBtn.addEventListener('click', () => {
  const src = buildSource();
  console.log('[Expression Builder] Save:', src || '(empty)');
  const original = saveBtn.textContent;
  saveBtn.textContent = 'Saved ✓';
  saveBtn.classList.add('is-saved');
  setTimeout(() => { saveBtn.textContent = original; saveBtn.classList.remove('is-saved'); }, 1200);
});

const undoBtn = document.getElementById('undo-btn');
if (undoBtn) undoBtn.addEventListener('click', undo);
const redoBtn = document.getElementById('redo-btn');
if (redoBtn) redoBtn.addEventListener('click', redo);

const runTestBtn = document.getElementById('run-test');
if (runTestBtn) runTestBtn.addEventListener('click', evaluate);

const outputTypeSel = document.getElementById('output-type');
if (outputTypeSel) outputTypeSel.addEventListener('change', () => { updateOutputTypeHint(); evaluate(); });

// Add reference (formula toolbar): open the picker to append a top-level ref token.
const addRefBtn = document.getElementById('add-ref-btn');
if (addRefBtn) {
  addRefBtn.addEventListener('mousedown', (e) => e.preventDefault());
  addRefBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openRefAppend(addRefBtn);
  });
}

// ---------- v8: test mode toggle + adjustable widths ----------
(function setupConsole() {
  const pop = document.getElementById('popover');
  const toggle = document.getElementById('test-mode-toggle');
  const drawerResize = document.getElementById('drawer-resize');
  const colResize = document.getElementById('col-resize');
  const consoleEl = document.querySelector('.console-side');
  const cols = document.querySelector('.drawer-cols');
  if (!pop || (!toggle && !drawerResize && !colResize)) return;

  const DRAWER_MIN = 360;
  const drawerMax = () => window.innerWidth * 0.96;
  const CONSOLE_MIN = 260, CONSOLE_MAX = 640, BUILDER_MIN = 340;
  let consoleW = consoleEl ? (consoleEl.getBoundingClientRect().width || 340) : 340;
  let testOn = true; // the user's intent (independent of width-forced hiding)

  function reflectToggle() {
    if (!toggle) return;
    toggle.classList.toggle('is-off', !testOn);
    const s = toggle.querySelector('.tm-state');
    if (s) s.textContent = testOn ? 'On' : 'Off';
  }
  function showConsole(show) { pop.classList.toggle('test-off', !show); }

  // Manual toggle: flip intent AND shrink/grow the whole drawer by the console width.
  if (toggle) toggle.addEventListener('click', () => {
    const curW = pop.getBoundingClientRect().width;
    if (testOn) {
      if (consoleEl) consoleW = consoleEl.getBoundingClientRect().width || consoleW;
      testOn = false;
      showConsole(false);
      pop.style.width = `${Math.max(DRAWER_MIN, curW - consoleW)}px`;
    } else {
      testOn = true;
      showConsole(true);
      pop.style.width = `${Math.min(drawerMax(), curW + consoleW)}px`;
    }
    reflectToggle();
  });

  // While dragging the drawer narrower, auto-hide the console once both columns
  // can't fit — but only if the user hasn't manually turned test mode off.
  function autoTest(drawerWidth) {
    if (!testOn) return;
    showConsole(drawerWidth >= consoleW + BUILDER_MIN);
  }

  function makeDrag(handle, cursor, begin, move) {
    if (!handle) return;
    let dragging = false, startX = 0, start = null;
    handle.addEventListener('mousedown', (e) => {
      e.preventDefault();
      dragging = true; startX = e.clientX; start = begin();
      handle.classList.add('dragging');
      document.body.style.cursor = cursor;
      document.body.style.userSelect = 'none';
    });
    document.addEventListener('mousemove', (e) => {
      if (dragging) move(startX - e.clientX, start);
    });
    document.addEventListener('mouseup', () => {
      if (!dragging) return;
      dragging = false;
      handle.classList.remove('dragging');
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    });
  }

  // Left edge of the drawer → resize the whole (right-pinned) drawer.
  makeDrag(drawerResize, 'ew-resize',
    () => pop.getBoundingClientRect().width,
    (delta, startW) => {
      const w = Math.max(DRAWER_MIN, Math.min(drawerMax(), startW + delta));
      pop.style.width = `${w}px`;
      autoTest(w);
    });

  // Divider between builder and console → resize the test panel.
  if (consoleEl && cols) {
    makeDrag(colResize, 'col-resize',
      () => consoleEl.getBoundingClientRect().width,
      (delta, startW) => {
        const maxByBuilder = cols.getBoundingClientRect().width - BUILDER_MIN - 8;
        const w = Math.max(CONSOLE_MIN, Math.min(Math.min(CONSOLE_MAX, maxByBuilder), startW + delta));
        consoleEl.style.width = `${w}px`;
        consoleW = w;
      });
  }
})();
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
updateParamHint(null); // v6: show the idle hint on load
updateOutputTypeHint(); // v8: describe the default output type
