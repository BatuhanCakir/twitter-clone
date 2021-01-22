import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { trackPromise } from "react-promise-tracker";
import styled from "styled-components";
import { UserContext } from "../../Context/UserContext";
import {FollowCard} from '../Cards/FollowCard'
const ExploreDiv = styled.div`
flex : 0.3;
display : flex;
flex-direction : column;
justify-content : space-around;
align-content ; space-around;
align-items : center;
witdh:100%;

  @media (max-width: 1205px) {
    flex:0.1;
    display:none;
   
    
  }
  @media (max-width: 500px) {
    flex:0;
    display:none;
    
  }

`

const ExploreWrapper = styled.div`
width:60%;
height : 40%;
display:flex;
flex-direction: column;
background-color:#E1E8ED;
border-radius : 10px;
margin-bottom:200px;
margin-right:100px;
`
const HeaderWrapper = styled.div`
padding-top: 10px;
padding-left: 10px;
  flex: 0.12;
  border-bottom : 1px solid black;
`

const ExploreContent = ({ showSidebar }) => {
  const [randomUser, setRandomUser] = useState < []> ([]);
  const {user} = useContext(UserContext);
  useEffect(() => {
    if (user) {
    //@ts-ignore
    async function getPosts() {
      
        const tweets = await trackPromise(axios.post('/api/user/getNotFollowedUser', {
          id: user.id,
        }))

        // @ts-ignore
        setRandomUser(tweets['data']);
      
        
      }
      getPosts()
    } else {
      //@ts-ignore
        async function getPosts() {
      
        const tweets = await trackPromise(axios.post('/api/user/getNotFollowedUser', {
          id: 0,
        }))

        // @ts-ignore
        setRandomUser(tweets['data']);
      
        
      }
      getPosts()



    }

  }, [user]);
  
    
    return (

   
        <ExploreDiv style={{ display: showSidebar }}>
        
          <ExploreWrapper>
            <HeaderWrapper>
              <p style={{margin:0, fontWeight:700}}>Who to Follow</p>
          </HeaderWrapper>
          {randomUser.map((user, key) => {
            //@ts-ignore
            return <FollowCard key={key } username={user.userName}/>
            
          })}
          
            
            
          </ExploreWrapper>
        
        </ExploreDiv>
    
  )
}

export default  ExploreContent;