# Cloud Computing Learning Path

An interactive React presentation covering the full path: cloud fundamentals →
career entry → GCP/AWS/Docker → AI (AWS AIF-C01) → Terraform → Kubernetes.

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Deploy to GitHub Pages

This repo already includes a GitHub Actions workflow
(`.github/workflows/deploy.yml`) that builds the app and publishes it to
GitHub Pages automatically on every push to `main`. Steps:

1. **Create a new GitHub repo** (e.g. `cloud-learning-path`) and push this
   project to it:

   ```bash
   git init
   git add .
   git commit -m "Initial commit: Cloud Computing Learning Path"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```

2. **Enable Pages for Actions deployments**, one-time setup in the repo:
   - Go to the repo on GitHub → **Settings** → **Pages**.
   - Under "Build and deployment", set **Source** to **GitHub Actions**.

3. **That's it.** The push in step 1 already triggered the workflow. Check
   the **Actions** tab — once the `Deploy to GitHub Pages` run finishes, your
   site is live at:

   ```
   https://<your-username>.github.io/<your-repo>/
   ```

4. Any future `git push` to `main` re-builds and re-deploys automatically.
   To deploy manually without pushing, use the **Run workflow** button on the
   workflow's Actions page (enabled via `workflow_dispatch`).

### Notes

- `vite.config.js` uses `base: "./"` (relative paths), so the build works
  correctly whether it's served from a project page
  (`username.github.io/repo/`) or a custom domain — no need to hardcode the
  repo name.
- If you'd rather deploy without Actions, you can build locally and push the
  `dist/` folder to a `gh-pages` branch using the `gh-pages` npm package:
  ```bash
  npm install --save-dev gh-pages
  npm run build
  npx gh-pages -d dist
  ```
  then set the Pages source to the `gh-pages` branch instead of Actions.

## Editing content

All slide content lives in `src/CloudComputingLearningPath.jsx` in the
`SLIDES` array near the top of the file — each entry is one slide with a
`type` (`title`, `objectives`, `links`, `courses`, or `closing`) and its data.
