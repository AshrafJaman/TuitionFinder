import React, { useContext, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from './Context/Sign_In_Context';
import { ADMIN_MAIL } from '../constants';
export function PrivateRoute({ children, ...rest }) {
  const [user, setUser] = useContext(UserContext);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
export function AdminRoute({ children, ...rest }) {
  const [user, setUser] = useContext(UserContext);
  // 'suhin4000@gmail.com';

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user && user.email === ADMIN_MAIL ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
