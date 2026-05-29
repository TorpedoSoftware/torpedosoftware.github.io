// Tiny safe arithmetic evaluator for numeric inputs.
// Accepts: digits, decimals, + - * /, parentheses, leading unary +/-.
// Strips whitespace, commas, $, and %. Returns null for empty or invalid input.
// Avoids `eval`/`Function` so unexpected characters can't smuggle in code.

type Token =
  | { type: "num"; value: number }
  | { type: "op"; value: "+" | "-" | "*" | "/" }
  | { type: "lparen" }
  | { type: "rparen" };

function tokenize(input: string): Token[] | null {
  const tokens: Token[] = [];
  let i = 0;
  while (i < input.length) {
    const ch = input[i];
    if (ch === "+" || ch === "-" || ch === "*" || ch === "/") {
      tokens.push({ type: "op", value: ch });
      i++;
    } else if (ch === "(") {
      tokens.push({ type: "lparen" });
      i++;
    } else if (ch === ")") {
      tokens.push({ type: "rparen" });
      i++;
    } else if ((ch >= "0" && ch <= "9") || ch === ".") {
      let j = i;
      let dot = false;
      while (j < input.length) {
        const c = input[j];
        if (c >= "0" && c <= "9") {
          j++;
        } else if (c === "." && !dot) {
          dot = true;
          j++;
        } else {
          break;
        }
      }
      const slice = input.slice(i, j);
      const num = parseFloat(slice);
      if (!isFinite(num)) return null;
      tokens.push({ type: "num", value: num });
      i = j;
    } else {
      return null;
    }
  }
  return tokens;
}

class Parser {
  private pos = 0;
  constructor(private tokens: Token[]) {}

  parse(): number | null {
    const value = this.parseExpression();
    if (value === null || this.pos !== this.tokens.length) return null;
    return value;
  }

  private peek(): Token | undefined {
    return this.tokens[this.pos];
  }

  private parseExpression(): number | null {
    let left = this.parseTerm();
    if (left === null) return null;
    while (true) {
      const t = this.peek();
      if (t?.type === "op" && (t.value === "+" || t.value === "-")) {
        this.pos++;
        const right = this.parseTerm();
        if (right === null) return null;
        left = t.value === "+" ? left + right : left - right;
      } else {
        return left;
      }
    }
  }

  private parseTerm(): number | null {
    let left = this.parseFactor();
    if (left === null) return null;
    while (true) {
      const t = this.peek();
      if (t?.type === "op" && (t.value === "*" || t.value === "/")) {
        this.pos++;
        const right = this.parseFactor();
        if (right === null) return null;
        if (t.value === "/" && right === 0) return null;
        left = t.value === "*" ? left * right : left / right;
      } else {
        return left;
      }
    }
  }

  private parseFactor(): number | null {
    const t = this.peek();
    if (t?.type === "op" && (t.value === "+" || t.value === "-")) {
      this.pos++;
      const inner = this.parseFactor();
      if (inner === null) return null;
      return t.value === "-" ? -inner : inner;
    }
    return this.parsePrimary();
  }

  private parsePrimary(): number | null {
    const t = this.peek();
    if (!t) return null;
    if (t.type === "num") {
      this.pos++;
      return t.value;
    }
    if (t.type === "lparen") {
      this.pos++;
      const value = this.parseExpression();
      if (value === null) return null;
      const next = this.peek();
      if (next?.type !== "rparen") return null;
      this.pos++;
      return value;
    }
    return null;
  }
}

export function evalNumericExpression(input: string): number | null {
  const cleaned = input.replace(/[\s,$%]/g, "");
  if (cleaned === "") return null;
  const tokens = tokenize(cleaned);
  if (tokens === null || tokens.length === 0) return null;
  const value = new Parser(tokens).parse();
  if (value === null || !isFinite(value)) return null;
  return value;
}
