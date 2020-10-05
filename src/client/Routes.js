import HomePage from './pages/HomePage';
import Contact from './pages/Contact';
import NotFoundPage from './pages/NotFoundPage';
import AboutUs from './pages/aboutUs';
import App from './App';
import React from 'react';

export default [
  {
    ...App,
    routes: [
      {
        component: HomePage,
        path: '/',
        exact: true
      },
      {
        path: '/about',
        component: AboutUs,
        exact: true
      },
      {
        path: '/notice',
        component: HomePage,
        exact: true
      },
      {
        path: '/contact',
        component: Contact,
        exact: true
      }
    ]
  }
];
