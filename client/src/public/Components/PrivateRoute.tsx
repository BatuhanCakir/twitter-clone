import  { useContext } from 'react';
import {Route,Redirect} from 'react-router-dom'
import { UserContext } from '../Context/UserContext';

export const PrivateRoute = ({ children, ...rest }) => {
  const {user} = useContext(UserContext);
  return (
   <Route {...rest} render={() => {
      return user 
        ? children
        : <Redirect to='/login' />
    }} />
  )
}
