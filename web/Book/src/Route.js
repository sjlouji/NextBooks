import React, {lazy} from 'react';
import { Redirect } from "react-router-dom";
import LoginPage from './Books/Accounts/LoginPage/LoginPage';
import RegisterPage from './Books/Accounts/RegisterPage/RegisterPage';
import ResetPage from './Books/Accounts/ResetPage/ResetPage';
import PasswordReset from './Books/Accounts/ResetPage/PasswordReset';
import Dashboard from './Books/Dashboard/Dashboard';
import Profile from './Books/Dashboard/Profile/Profile';
import NoAccess from './Books/Error/401';
import Home from './Books/Dashboard/Home/Home'

const routes = [
  {
    path: '/auth/login',
    exact: true,
    component: () => <LoginPage />
  },
  {
    path: '/auth/signup',
    exact: true,
    component: () => <RegisterPage />
  },
  {
    path: '/auth/reset',
    exact: true,
    component: () => <ResetPage />
  },
  {
    path: '/auth/password/reset/:token',
    exact: true,
    component: () => <PasswordReset />
  },
  {
    path: '/401',
    exact: true,
    component: () => <NoAccess />
  },
  {
    route: '*',
    component: Dashboard,
    exact: true,
    routes: [
        {
          path: '/books/dashboard',
          exact: true,
          component: lazy(() => import('./Books/Dashboard/Home/Home'))
        },
        {
            route: '*',
            component: Profile,
            routes: [
                {
                  path: '/books/profile',
                  exact: true,
                  component: lazy(() => import('./Books/Dashboard/Profile/Information/Information')),
                },
                {
                  path: '/books/profile/logs',
                  exact: true,
                  component: lazy(() => import('./Books/Dashboard/Profile/Logs/Logs'))
                },
                {
                  path: '/books/profile/security',
                  exact: true,
                  component: lazy(() => import('./Books/Dashboard/Profile/Security/Security'))
                },
                {
                  exact: true,
                  component: lazy(() => import('./Books/Error/404'))
                },
            ]  
        },
    ]
  },
];

export default routes;