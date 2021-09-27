import { Route, Redirect, RouteProps } from 'react-router-dom'

import { useAuth } from '../../hooks/useAuth';

type PrivateRouteProps = {
  authenticationPath: string;
} & RouteProps;

// protected route, to not allow user access if it is not authenticated
export function ProtectedRoute({authenticationPath, ...props}: PrivateRouteProps){
  
  const { user } = useAuth()

  if (user) {
    return <Route {...props} />
  } else {
    return <Redirect 
      to={{
        pathname: authenticationPath,
        state: { from: props.location }
      }}
    />
  }
}