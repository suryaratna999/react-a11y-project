// Simple string calculator.
// Rules: empty => 0, commas/newlines separate numbers, supports custom delimiters,
// negatives throw, numbers > 1000 are ignored.

function escapeForRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function add(input: string): number {
  if (!input) return 0;

  let text = input;
  let delims = [',', '\n'];

  if (text.startsWith('//')) {
    const nl = text.indexOf('\n');
    const spec = text.slice(2, nl);

    if (spec.startsWith('[') && spec.endsWith(']')) {
      // parse //[d1][d2]... style
      const re = /\[([^\]]+)\]/g;
      const found: string[] = [];
      let m: RegExpExecArray | null = null;
      while ((m = re.exec(spec)) !== null) found.push(m[1]);
      if (found.length) delims = found;
    } else {
      delims = [spec];
    }

    text = text.slice(nl + 1);
  }

  const splitter = new RegExp(delims.map(escapeForRegex).join('|'), 'g');
  const tokens = text.split(splitter).filter(Boolean);
  const nums = tokens.map((t) => Number(t));

  const negatives = nums.filter((n) => n < 0);
  if (negatives.length) throw new Error('Negatives not allowed: ' + negatives.join(','));

  return nums.filter((n) => !Number.isNaN(n) && n <= 1000).reduce((a, b) => a + b, 0);
}

export default add;
