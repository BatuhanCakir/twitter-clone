import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { trackPromise } from 'react-promise-tracker';
import styled from 'styled-components';
import { UserContext } from '../../Context/UserContext';
import { StyledAvatar } from '../Avatar'
import ExploreProfileButton from '../Explore/ExploreButton';
import {useHistory} from 'react-router-dom'

const Wrapper = styled.div`
  flex:0.22;
  display:flex;
  flex-direction:row;
  padding: 5px ;
  border-bottom:1px solid black;
`

const UserWrapper = styled.div`
flex:0.5;
display:flex;
width:100%;
flex:direction:column;
align-items:center;
`
const FollowWrapper = styled.div`
flex:0.5;
width:100%;
display:flex;
flex-direction: row;
justify-content: flex-end;
align-items:center;
`
const StyledName = styled.p`
&:hover{
  cursor:pointer;
}
padding-left:20px;
`





export const FollowCard = ({username}) => {
  const [isFollowed, setFollowedStatus] = useState<boolean>(false);
  const history = useHistory();
  const { user } = useContext(UserContext);
  
   useEffect(() => {
    //@ts-ignore
    async function getFollower() {
      const followed = await trackPromise(axios.post('/api/user/getFollower', {
        username: username,
      }))

      
    
      if (user) {
        followed['data'].map((followed) => {

          if (followed.followerId === user.id) {
            return setFollowedStatus(true);
          }
          return null;
        })

      }

    }
    getFollower()
    

   }, [username,user]);
  return (
    <Wrapper>
      <UserWrapper>
        <StyledAvatar  onClick={()=> history.push(`/${username}`)} style={{ padding: "2px"  }} />
        <StyledName onClick={()=> history.push(`/${username}`)} > {username}</StyledName>
      </UserWrapper>
      <FollowWrapper>
        <ExploreProfileButton  isFollowed={isFollowed} setFollowedStatus={setFollowedStatus} username={username}/>
      </FollowWrapper>
      
    </Wrapper>

  )
  
}