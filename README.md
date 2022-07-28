# example-typescript-prototype

This is an example application created for the article [Prototyping and data modeling in the browser using TypeScript](https://nicolashery.com/prototyping-with-typescript/).

You can find a deployed demo version here: https://example-typescript-prototype.netlify.app/

## Quick start

Make sure you have [Node.js](https://nodejs.org/) installed (for example using [nvm](https://github.com/nvm-sh/nvm)).

Clone this repository, then install dependencies with:

```
npm install
```

Run the development server with:

```
npm run dev
```

Type-check source files (without building) with:

```
npm run typecheck
```

Format source files using:

```
npm run prettier
```

## Sample data

To generate a random ID to use for new sample data, run:

```
npm run nanoid
```

To regenerate random responses for the sample data, run:

```
npm run generate-responses
```

## Deployment

Build for production using:

```
npm run build
```

Preview the build locally with:

```
npm run preview
```

This repository is automatically deployed to [Netlify](https://www.netlify.com/).
