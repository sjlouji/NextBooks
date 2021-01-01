import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import store from './Store/configureStore';

const PrivateRoute = ({component: Component, ...rest}) => {
    if(!store.getState().auth.isAuthenticated){
        return <Redirect to="/auth/login" />
    }else{
        return <Route {...rest} render={props =><Component {...props}/>}/>
    }
};

export default PrivateRoute;