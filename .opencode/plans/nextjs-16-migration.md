# Next.js 15 → 16 Migration Plan

## Current → Target Versions
| Package | Current | Target |
|---------|---------|--------|
| `next` | `^15.5.18` | `^16.2.6` |
| `eslint` | `^8.57.1` | `^9.25.1` |
| `eslint-config-next` | `^15.5.18` | `^16.2.6` |
| `eslint-config-prettier` | `9.0.0` | `^10.1.8` |

## Steps (execute in order)

### 1. Update `package.json`
Bump these 4 packages in `dependencies`/`devDependencies`:
- `"next": "^16.2.6"`
- `"eslint": "^9.25.1"`
- `"eslint-config-next": "^16.2.6"`
- `"eslint-config-prettier": "^10.1.8"`

### 2. Replace `.eslintrc.json` with `eslint.config.js`
**Delete** `.eslintrc.json`
**Create** `eslint.config.js`:
```js
const { FlatCompat } = require("@eslint/eslintrc");
const path = require("path");

const compat = new FlatCompat({
  baseDirectory: path.resolve(__dirname),
});

module.exports = [
  ...compat.extends("next/core-web-vitals", "prettier"),
];
```

### 3. Update `.lintstagedrc.js`
Change `next lint --fix --file ...` to `eslint --fix ...`

### 4. Update `next.config.js`
Remove `reactStrictMode: true` line (it's the default in Next.js 16 + React 19)

### 5. Install and rebuild
```bash
rm -rf .next node_modules/.cache
npm install
npm run build
npm run lint
```

## Prerequisites verified
- Node.js v24.14.0 (needs 20.9+) ✓
- React 19.2.6 already installed ✓
- All `params` use `Promise<>` + `await` pattern ✓
- No `middleware.ts` (no rename needed) ✓
- No `cookies()/headers()/draftMode()` calls ✓
- No parallel route slots (no `default.js` needed) ✓
- No `next/legacy/image` or `images.domains` ✓
- `next.config.js` has no webpack plugins (Turbopack compatible) ✓
