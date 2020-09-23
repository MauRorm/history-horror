import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import ArticleListPage from './pages/ArticleListPage';
import App from './App';
import React from 'react';


export default [
  {
    ...App,
    routes: [
      {
        component: HomePage,
        path: '/',
        exact: true,
      },
      {
        path: '/about',
        component: HomePage,
        exact: true,
      },
      {
        path: '/notice',
        component: HomePage,
        exact: true,
      },
      {
        path: '/contact',
        component: HomePage,
        exact: true,
      },
    ]
  }
];
