// npm install -D -E prettier | eslint-config-prettier | prettier-eslint
export type PrettierConfigType = {
  bracketSameLine?: boolean;
  bracketSpacing?: boolean;
  requirePragma?: boolean;
  semi?: boolean;
  jsxBracketSameLine?: boolean;
  insertPragma?: boolean;
  singleAttributePerLine?: boolean;
  useTabs?: boolean;
  vueIndentScriptAndStyle?: boolean;
  singleQuote?: boolean;
  printWidth?: number;
  rangeEnd?: number;
  rangeStart?: number;
  tabWidth?: number;
  arrowParens?: string;
  embeddedLanguageFormatting?: string;
  endOfLine?: string;
  htmlWhitespaceSensitivity?: string;
  quoteProps?: string;
  trailingComma?: string;
};

const PrettierConfiguration: PrettierConfigType = {
  bracketSameLine: true,
  bracketSpacing: true,
  requirePragma: true,
  semi: true,
  jsxBracketSameLine: true,
  insertPragma: true,
  singleAttributePerLine: true,
  useTabs: true,
  vueIndentScriptAndStyle: true,
  singleQuote: true,

  printWidth: 80,
  rangeEnd: 0,
  rangeStart: 1000,
  tabWidth: 4,

  arrowParens: "",
  embeddedLanguageFormatting: "",
  endOfLine: "",
  htmlWhitespaceSensitivity: "",
  quoteProps: "",
  trailingComma: "",
};

export default PrettierConfiguration;
