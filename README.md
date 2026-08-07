# Cloud Computing Learning Path

An interactive React presentation covering the full path: cloud fundamentals →
career entry → GCP/AWS/Docker → AI (AWS AIF-C01) → Terraform → Kubernetes.

## Run it locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

## Run it in Docker

A multi-stage `Dockerfile` is included: it builds the app with Node, then
serves the static output with nginx (small final image, no Node runtime
needed at runtime).

**Build and run directly:**
```bash
docker build -t cloud-learning-path .
docker run -p 8080:80 cloud-learning-path
```
Open http://localhost:8080

**Or with docker-compose (one command):**
```bash
docker compose up --build
```
Open http://localhost:8080

To stop it: `docker compose down` (or Ctrl+C, then `docker rm` the container
if you used `docker run`).

**Pushing the image somewhere (e.g. Docker Hub, GHCR):**
```bash
docker build -t <your-username>/cloud-learning-path:latest .
docker push <your-username>/cloud-learning-path:latest
```
Then anyone can run it with:
```bash
docker run -p 8080:80 <your-username>/cloud-learning-path:latest
```

## Deploy to GitHub Pages

This repo includes a GitHub Actions workflow
(`.github/workflows/deploy.yml`) that builds the app **using the Dockerfile's
build stage** — the same container-based build as running it locally — then
extracts the resulting static files and publishes them to GitHub Pages.

> **Important:** GitHub Pages only serves static files; it cannot run a live
> Docker container. So the container isn't "hosted" on Pages — Docker is
> just how the site gets *built* in CI. The nginx serving stage in the
> `Dockerfile` is only used when you run the container yourself (locally or
> on your own server) — see "Run it in Docker" above.

Steps:

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
