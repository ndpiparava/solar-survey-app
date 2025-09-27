# Solar Panel Survey App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).  
The app uses **Atomic Design** for component structure, **Emotion** for styling and theming, and supports **localization** with `react-intl`.

---

![Demo video](./src/app/assets/solar.gif 'demo')

## Project Structure

- **app/** – Next.js App Router pages and layouts.
- **components/** – Organized using Atomic Design:
  - **atoms/** – Basic UI elements like `Button`, `TextInput`, `InputLabel`.
  - **molecules/** – Composed components like `SelectField`, `CheckboxGroup`.
  - **organisms/** – Larger sections like `SurveyForm`, `ContactForm`.
- **theme/** – Theme definitions and `ThemeProviderWrapper`.
- **shared/** – Application shared constants, types, validation and option data.
- **translations/** – Localization files for different languages.
- **hooks/** – Custom React hooks.
- **stores/** – Local stores (eg. useLocaleStore).
- **types/** – TypeScript type definitions.

---

## Getting Started

### Install dependencies

```bash
npm install
```

### Check lints and prettier

```bash
npm lint:fix
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

---

## Features

### Atomic Design

- **Atoms:** Reusable basic components (buttons, inputs, labels).
- **Molecules:** Composed components using atoms (select fields, checkbox groups).
- **Organisms:** Full sections using molecules and atoms (forms, survey sections).

### Emotion Theming

- Centralized theme object in `theme/theme.ts` with colors, spacing, font sizes, and radii.
- All components use theme values to ensure consistent styling.

**Example usage in styled components:**

```ts
const StyledInput = styled.input`
padding: \${({ theme }) => theme.spacing(2)};
border-radius: \${({ theme }) => theme.radii.md};
border: 1px solid \${({ theme }) => theme.colors.border};
font-size: \${({ theme }) => theme.fontSizes.base};
width: 100%;
`;
```

### Localization

- Uses [`react-intl`](https://formatjs.io/docs/react-intl) for translations.
- Translation messages are stored in `translations/`.

**Example usage in components:**

```ts
const intl = useIntl();
<label>{intl.formatMessage({ id: 'form.propertyType.label' })}</label>
```

### Theme Provider Wrapper

- `AppWrapper` in `theme/ThemeProviderWrapper.tsx` wraps the entire app.
- Provides theme and locale context to all components.
- Handles font setup using `next/font`.

### Fonts

- Uses fonts:
  - `"The Sans Plain"` for body.
  - `"The Sans Plain Mono"` for monospace elements.
- Fonts loaded via `next/font` for optimal performance.

### Custom Hooks

- `useSurveyForm` – Handles form state and submission.
- `useSurveyFormValidation` - Handles form validations
- `useLocaleStore` – Simple locale store (using Zustand) for language switching.

---

## Running the Project

1. Clone the repository.
2. Install dependencies.
3. Run the development server.
4. Open your browser at [http://localhost:3000](http://localhost:3000).
5. Start editing pages in `app/` and components in `components/`.

---

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) – learn about Next.js features and API.
- [React Intl Documentation](https://formatjs.io/docs/react-intl/) – learn about localization and formatting.
- [Emotion Documentation](https://emotion.sh/docs/introduction) – styling with Emotion.

---
