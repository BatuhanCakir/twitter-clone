import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { UserContext } from '../../Context/UserContext';


const TweetButton = styled.button`
  
  background-color: #50b7f5 !important;
  border: none !important;
  color: white !important;
  font-weight: 900 !important;
  
  border-radius: 25px !important;
  width: 100%; 

  height: 53px !important;
  @media (max-width: 500px) {
     width: 20%;
    border-radius: 50%; !important;
  }
`
const LoginLogout = (user, setUser, history) => {
  console.log(user);
  
  if (user) {
    setUser(null)
    return history.push("/")
    
  } else {
     return history.push("/Login")
  }
}
const LoginLogoutButton = () => {
 
  const history = useHistory();
  const {user,setUser} = useContext(UserContext);
  const [buttonState, setButtonState] = useState<boolean>(false);
  useEffect(() => {
    console.log(user);
    
    if (user) {
      setButtonState(true);
    } else {
      setButtonState(false);
    }
    
  }, [user]);

  if (buttonState) return <TweetButton onClick={() => LoginLogout(user, setUser, history)}>Logout </TweetButton>
  return <TweetButton onClick={() => LoginLogout(user, setUser, history)}>Login </TweetButton>

  
}
  
export default LoginLogoutButton;
