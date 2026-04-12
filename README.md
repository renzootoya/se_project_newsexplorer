# NewsExplorer

NewsExplorer is a full-stack web application that allows users to search for news articles on any topic, read them, and save their favorites to a personal account.

## Live Demo

[https://renzootoya.github.io/se_project_newsexplorer](https://renzootoya.github.io/se_project_newsexplorer)

## Project Pitch Video

Check out [this video](https://www.loom.com/share/e8b42b1a03444e1c9fb9f12807115fdf), where I describe my project and some challenges I faced while building it.

---

## Features

- **News Search** — Search for articles by keyword using the NewsAPI (last 7 days, up to 100 results)
- **Paginated Results** — Displays 3 articles at a time with a "Show more" button
- **User Authentication** — Sign up and sign in with modal forms (stub auth via localStorage for Stage 1)
- **Save Articles** — Logged-in users can bookmark articles to their personal account
- **Saved Articles Page** — View and manage all saved articles at `/saved-news`
- **Protected Route** — The saved news page is only accessible to logged-in users
- **Responsive Design** — Works on desktop, tablet, and mobile

---

## Technologies

- **React 18** with functional components and hooks
- **Vite** as the build tool
- **React Router v7** for client-side routing (HashRouter for GitHub Pages)
- **Context API** (`CurrentUserContext`) for global authentication state
- **NewsAPI.org** for fetching live news articles
- **BEM** CSS methodology for naming conventions
- **Google Fonts** — Roboto and Roboto Slab
- **GitHub Pages** for deployment

---

## Project Structure

```
src/
├── components/
│   ├── App/
│   ├── Header/
│   ├── Navigation/
│   ├── SearchForm/
│   ├── Main/
│   ├── NewsCard/
│   ├── NewsCardList/
│   ├── Preloader/
│   ├── About/
│   ├── Footer/
│   ├── ModalWithForm/
│   ├── LoginModal/
│   ├── RegisterModal/
│   ├── SavedNews/
│   ├── SavedNewsHeader/
│   └── ProtectedRoute/
├── contexts/
│   └── CurrentUserContext.js
├── utils/
│   ├── newsApi.js
│   ├── auth.js
│   └── savedArticles.js
└── vendor/
    └── fonts.css
```

---

## Running Locally

1. Clone the repository:
```bash
git clone https://github.com/renzootoya/se_project_newsexplorer.git
cd se_project_newsexplorer
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```
VITE_NEWS_API_KEY=your_newsapi_key_here
```

4. Start the development server:
```bash
npm run dev
```

---

## Deployment

This project is deployed to GitHub Pages using the `gh-pages` package.

```bash
npm run deploy
```

---

## Roadmap

- **Stage 2** — Build a backend with Node.js, Express, and MongoDB
- **Stage 3** — Connect the frontend to the real backend with JWT authorization
