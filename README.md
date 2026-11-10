# 📰 bettercallmilan.github.io

Welcome to my personal website, [bettercallmilan.github.io](https://bettercallmilan.github.io). The site is built as a standalone Angular application and contains my portfolio, blog, and project notes.

## Table of Contents
- [About](#about)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Usage](#usage)
- [License](#license)

## About
This website serves as my personal blog where I publish articles about various topics including my projects, thoughts, and experiences. It is a platform for me to share my journey and connect with others.

## Features
- A single page built from Angular standalone components
- One-screen card board on desktop that stacks on tablet and phone
- The 3D-printer note opens as a side sheet and keeps its own URL (`/3d-printer`)
- Self-hosted variable fonts (Fraunces, Instrument Sans, JetBrains Mono)
- Clean URLs with a `404.html` fallback for GitHub Pages

## Technologies Used
- **Angular**: Application structure and routing
- **TypeScript**: Components and browser interactions
- **CSS**: Styling and responsive layout

## Usage
Install dependencies and start the local development server:

```bash
npm install
npm start
```

Create a production build with `npm run build`. The generated static files are written to `dist/bettercallmilan/`.

### Deploying to GitHub Pages

The repository includes a GitHub Actions workflow in `.github/workflows/deploy-pages.yml`.

1. Push the repository to GitHub.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Push to `main`, or run the workflow manually from the **Actions** tab.

The site will be available at [bettercallmilan.github.io](https://bettercallmilan.github.io).

The note uses the clean URL `/3d-printer`. A generated `404.html` fallback keeps those routes working when GitHub Pages serves a direct request.

## License
This project is open-source and available under the [MIT License](LICENSE).
