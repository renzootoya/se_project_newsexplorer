# NewsExplorer

A React-based news search application that lets users search for articles using the NewsAPI, save their favorites, and manage saved articles.

## Live Demo

[https://renzootoya.github.io/se_project_newsexplorer](https://renzootoya.github.io/se_project_newsexplorer)

## Project Pitch Video

Check out [this video](ADD_LOOM_LINK_HERE), where I describe my project and some challenges I faced while building it.

## Features

- Search news articles by keyword (last 7 days, up to 100 results)
- Show 3 results at a time with "Show more" button
- Sign up / Sign in with modal forms
- Save articles to your personal account
- View saved articles on a protected `/saved-news` page
- Responsive design (desktop, tablet, mobile)

## Technologies

- React 18 + Vite
- React Router v7
- Context API for global state
- NewsAPI.org
- BEM CSS methodology
- Google Fonts (Roboto, Roboto Slab)
- GitHub Pages deployment

## Running Locally

```bash
npm install
npm run dev
```

Create a `.env` file in the root:

```
VITE_NEWS_API_KEY=your_newsapi_key_here
```

## Deployment

```bash
npm run deploy
```
