import NavLinkField from './public/Components/Sidebar/NavLinkField'
import { HomeCircle } from '@styled-icons/boxicons-regular'
import { Hashtag } from '@styled-icons/fa-solid/Hashtag'
import {Envelope} from '@styled-icons/boxicons-regular'
import { Notifications as NotIcon } from '@styled-icons/ionicons-outline'
import {Bookmark} from '@styled-icons/boxicons-regular/Bookmark'
import { User } from '@styled-icons/boxicons-regular'
import {BrowserRouter as Router} from "react-router-dom";
import { Wrapper } from './public/Components/Sidebar/Wrapper';
import {SidebarContainer,Sidebar} from './public/Components/Sidebar/Sidebar'
import React, {  useEffect, useMemo, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import TweetButton from './public/Components/Sidebar/TweetButton';

import { UserContext } from './public/Context/UserContext';
import { ModalContext } from './public/Context/ModalContext'
import ContentDiv from './public/Components/Content/ContentDiv';
import ExploreContent from './public/Components/Explore/ExploreContent'
import axios from 'axios'
import { LoginModal } from './public/Components/Content/Login/LoginModal'


function App() {
  const [showSidebar, setShowSidebar] = useState<string>('');
  const [user, setUser] = useState(null);
  const [modalState, setModalState] = useState<boolean>(false);
  const ProviderModal = useMemo(() => ({modalState,setModalState}), [modalState,setModalState]);
  const ProviderValue = useMemo(() => ({ user, setUser }), [user, setUser]);
 
  useEffect(() => {
    //@ts-ignore
    async function getUser() {
      const user = await axios.get(
      "/api/User",
      );
      //@ts-ignore
      setUser(user['data']);
       
    }
    getUser()
    

  },[]);
  return (
 
      <UserContext.Provider value={ProviderValue}>
    <Router>
     
      <Toaster />
      <Wrapper>
        <SidebarContainer style={{display:showSidebar}} >
          <Sidebar>
            {user ? (
              <>
          <NavLinkField dest="home" input="Home" logo={<HomeCircle size= "28" />} />
          <NavLinkField dest="explore" input="Explore" logo={<Hashtag size="28" />} />
          <NavLinkField dest="notifications" input="Notifications" logo={<NotIcon size="28" />} />
          <NavLinkField dest="bookmark" input="Bookmark" logo={<Bookmark size="28" />} />
          <NavLinkField dest="messages" input="Messages" logo={<Envelope size= "28" />}/>
          <NavLinkField dest={`profile/${user.userName}`} input="Profile" logo={<User size="28" />} hideOnMobile="none" />
            <TweetButton/>
              </>
            ) : (
                <>
               <NavLinkField dest="home" input="Home" logo={<HomeCircle size= "28" />} />
                <NavLinkField dest="explore" input="Explore" logo={<Hashtag size="28" />} />
                <TweetButton/>
                </>
            )
           }
          </Sidebar>
        </SidebarContainer>
            
        <ModalContext.Provider
          //@ts-ignore
          value={ProviderModal}>
           <LoginModal/>
      
          <ContentDiv
            //@ts-ignore
            setShowSidebar={setShowSidebar} showSidebar={ showSidebar}/>
           
           <ExploreContent showSidebar={ showSidebar}/>
            
      
        
       

    </ModalContext.Provider>
        
     </Wrapper> 
    </Router> 
    </UserContext.Provider > 
  
  );
};

export default App;
