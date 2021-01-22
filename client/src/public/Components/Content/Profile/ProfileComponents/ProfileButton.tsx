import axios from 'axios';
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ModalContext } from '../../../../Context/ModalContext';
import { UserContext } from '../../../../Context/UserContext';


const ButtonNotFollowed = styled.button`
  
  flex:0.5;
  
  border: none !important;
  color:#50b7f5  !important;
  font-weight: 700 !important;

  border-radius: 25px !important;
  width: 45%; 

  outline:none;
  height: 53px !important;
  @media (max-width: 500px) {
     width: 20%;
    border-radius: 50%; !important;
  }
`

const ButtonFollowed = styled.button`
  
  flex:0.5;
  
  border: none !important;
  color:white  !important;
  background-color: #50b7f5  !important;
  font-weight: 700 !important;

  border-radius: 25px !important;
  width: 45%; 

  outline:none;
  height: 53px !important;
  @media (max-width: 500px) {
     width: 20%;
    border-radius: 50%; !important;
  }
`

const followUser = (username:string,user,setFollowedStatus) => {
  
    axios.post('/api/user/follow', {
      //@ts-ignore
       username:  username,
      followerId : user.id
    })
      .then(() => {

         setFollowedStatus(true);
      
      })
  
}

const unfollowUser = (username:string,user,setFollowedStatus) => {
   
    axios.post('/api/user/unfollow', {
      //@ts-ignore
       username:  username,
      followerId : user.id
    })
      .then(() => {

         setFollowedStatus(false); 
      
      })
  
}


const ProfilButton = ({ isFollowed,setFollowedStatus }) => {
  const username = useParams()
  const { user } = useContext(UserContext);
  const {setModalState} = useContext(ModalContext);

  if (!isFollowed) {
      return (
        <ButtonNotFollowed onClick={() => {
          if (user) return followUser(username['username'], user, setFollowedStatus)
          
          setModalState(true);
        }} >
          Follow
        </ButtonNotFollowed >
    )
  } else {
    return (
      <ButtonFollowed onClick={() => {
        if(user) unfollowUser(username['username'],user, setFollowedStatus)
        setModalState(true)
      }}>
        Followed
      </ButtonFollowed>
    )}
  
  

}
  
  
  
  
export default ProfilButton;