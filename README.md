# Rūbinė – clothing rental prototype

Frontend prototype of a clothing rental website, built with React, Vite and React Router.
There is no backend yet: the clothes are stored in `src/data/products.js` and the cart lives in memory
(it resets when the page reloads).

## Pages

| Route | Page |
| --- | --- |
| `/` | Home page |
| `/drabuziai` | Catalog with search, filters and sorting |
| `/drabuziai/:id` | Product page (choose size and rental period, add to cart) |
| `/krepselis` | Cart and order summary |
| `/kaip-tai-veikia` | How renting works, FAQ |

## Running the project

You need [Node.js](https://nodejs.org/) version 18 or newer.

```bash
npm install     # install dependencies (first time, or after package.json changes)
npm run dev     # start the dev server, then open http://localhost:5173
```

`npm run build` creates a production version in the `dist` folder.

## Project structure

```
src/
  main.jsx                 app entry point
  App.jsx                  routes (which URL shows which page)
  config.js                brand name
  index.css                all styles and colors (design tokens at the top)
  data/products.js         clothing data, categories, sizes, rental prices
  context/CartContext.jsx  cart state shared across pages
  components/              reusable parts: Layout (header/footer), ProductCard, Garment
  pages/                   one file per page
```

Common changes:

- **Add a clothing item:** add an object to the `products` list in `src/data/products.js`.
- **Change the brand name:** edit `src/config.js` (and the `<title>` in `index.html`).
- **Change colors or fonts:** edit the variables at the top of `src/index.css`.
- **Add a page:** create a file in `src/pages/`, add a `<Route>` in `src/App.jsx`, and a link in `src/components/Layout.jsx`.

## Working together with Git

Basic workflow for each change:

```bash
git pull                             # get the latest version
git checkout -b feature/short-name   # create your own branch
# ... make changes ...
git add .
git commit -m "Describe what you changed"
git push -u origin feature/short-name
```

Then open a **Pull Request** on GitHub, let your teammate review it, and merge it into `main`.
Avoid committing directly to `main`, so you don't overwrite each other's work.
