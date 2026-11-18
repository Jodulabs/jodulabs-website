# Home survey (jodu.io/survey)

A standalone page, built apart from the company site by `vite.survey.config.ts`
so a slow phone downloads only the survey. Answers go to `POST /api/survey` on
api.jodu.io (`VITE_API_URL` overrides it locally).

- **Add a language:** drop `locales/<code>.json` here (`<code>` is 2–3
  lowercase letters, e.g. `ta.json`) and redeploy. Its `"language"` value is
  the name on the language button; any key it leaves out falls back to English.
- **Questions:** `questions.json` must stay byte-identical to
  `services/backend/modules/survey/questions.json` in kalakar, which validates
  every submission against it. IDs freeze once the link is shared.
- **Local run:** `pnpm dev:survey`, then open `/survey.html?lang=kn&src=test`.
