import React, {lazy} from 'react';
import LoginPage from './Books/Accounts/LoginPage/LoginPage';
import RegisterPage from './Books/Accounts/RegisterPage/RegisterPage';
import ResetPage from './Books/Accounts/ResetPage/ResetPage';
import PasswordReset from './Books/Accounts/ResetPage/PasswordReset';
import Dashboard from './Books/Dashboard/Dashboard';
import FileNotFound from './Books/Error/404';

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
    route: '*',
    component: Dashboard,
    exact: true,
    routes: [
        {
          path: '/',
          exact: true,
          component: lazy(() => import('./Books/Dashboard/Home/Home'))
        },
        {
          path: '/books/dashboard',
          exact: true,
          component: lazy(() => import('./Books/Dashboard/Home/Home'))
        },
        {
          path: '/books/accounts',
          exact: true,
          component: lazy(() => import('./Books/Dashboard/BankAccounts/BankAccount'))
        },
        {
          path: '/books/profile',
          exact: true,
          component: lazy(()=> import('./Books/Dashboard/Profile/Profile'))
        },
        {
          exact: true,
          component: () => <FileNotFound />
        }
    ]
  },
];

export default routes;