import HeaderWrapper from './HeaderWrapper';

import ProfileHeader from './ProfileHeader';
import { ArrowBack } from "@styled-icons/boxicons-regular/ArrowBack";
import {BackButton} from "../../../BackButton"
import { useHistory } from 'react-router-dom';
export const ProfileHeaderComp = ({username,length}) => {
  
  let history = useHistory();
 return(
  
      
    <ProfileHeader>
      <BackButton onClick={() => history.push("/home")}> <ArrowBack size="28" /> </BackButton>
        
      <HeaderWrapper>
        <div >
          <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>{username.toUpperCase()}</h2>
        </div>
        <div>
          {`${length} Tweets`}
        </div>
          
        
      </HeaderWrapper>
    </ProfileHeader>
      
    
    
    
    
    
 )
}