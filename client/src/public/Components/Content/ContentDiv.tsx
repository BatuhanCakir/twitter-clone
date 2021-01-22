import styled from "styled-components";
import Login from './Login/Login';
import Notifications from './Notifications/Notifications';
import Explore from './Explore/Explore';
import Messages from './Messages/Messages';
import Profile from './Profile/Profile'
import Bookmark from './Bookmark/Bookmark'
import OtherProfile from './Profile/OtherProfile'

import Register from './Register/Register';
import RouteComponent from '../RouteComponent';
import Home from './Home/Home';
import { Switch, Route } from "react-router-dom";
import {PrivateRoute} from '../PrivateRoute'


const Content= styled.div`

display : flex;
border-right : thin solid #D6D9D8;
flex-direction : column;
justify-content : space-around;
align-content ; space-around;
align-items : center;


@media (max-width: 500px) {
    flex:1;
    width: 100%;
    border :none
    
  }
  @media (max-width: 1281px) {
   width: 92%;
    flex :0.38;
  }
  
`
//@ts-ignore
const ContentDiv: React.FC = ({ showSidebar, setShowSidebar }) => {

  const flexValue = showSidebar === "none" ? 1 : 0.38;
  return (
    <Content style={{ flex: flexValue }}>

      <RouteComponent setShowSidebar={setShowSidebar}/>
      <Switch>
          <PrivateRoute path="/notifications">
              <Notifications/>
           </PrivateRoute>
           <Route path="/explore">
              <Explore/>
        </Route>
        <PrivateRoute path="/bookmark">
          <Bookmark/>
          </PrivateRoute>
          <PrivateRoute exact path="/profile/:username">
              <Profile/>
           </PrivateRoute>
        
          <PrivateRoute path="/messages">
              <Messages/>
           </PrivateRoute>
           <Route path="/home">
              <Home/>
            </Route>
            <Route path="/login" >
              <Login />
            </Route>
             <Route path="/register">
              <Register/>
        </Route>
         
      
        
          <Route path="/:username">
              <OtherProfile/>
          </Route>
   
          </Switch>
          
          
      </Content>)
}  

export default  ContentDiv;