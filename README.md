# GSynergy Data Viewer TypeScript React Challenge
This project is a Progressive Web App (PWA) built using React, TypeScript, Redux, and AG-Grid. The app provides functionality for manipulating and analyzing data, including adding dimension members, entering measure data, performing calculations, applying conditional formatting, and visualizing data in charts (upcoming feature). The project includes features like sorting, filtering, authentication, and data import/export.

## Prerequisites
Make sure you have the following installed on your system:
- Node.js (v16 or later)
- npm or yarn
  
## Installation & Running the Project
Clone the repository:
```
git clone https://github.com/NiteshAssigment/GS301202_Nitesh_Bisht.git
```
Install dependencies:
```
npm install
```
Start the development server:
```
npm run start
```
Running Tests:
```
npm test
```
## Features Implemented Well
### 1.Efficient State Management with Redux
     -Implemented a structured Redux store for better scalability.
     -Used Redux Toolkit to manage global state efficiently.

### 2.AG-Grid Integration for Data Management
     -Implemented dynamic column rendering and sorting.
     -Applied conditional formatting to highlight key data insights.

### 3.TypeScript
     -Used strict TypeScript types to ensure maintainability.
     -But uses any in some cases.

### 4.Firebase Integration 
    -Successfully implemented Firebase 
    -Sign up and Login functionality.
    -Google sign in.

## What I Would Improve with 4 More Hours

### 1.Performance Optimizations
     -Implement Backend with Express Js and MySQL database.
     -Implement backend caching and pagination.

### 2.Cover Optional functionlity
     -Like The Chart page functionality
     -Provide the capability to import the given sample data to
     -prepopulate the application screens.


# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

