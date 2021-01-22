import BioWrapper from './BioWrapper';
import {Avatar} from '@material-ui/core'
import styled from "styled-components";
import { useParams } from 'react-router-dom';
import BannerDiv from './BannerDiv';
import BioDiv from './BioDiv'


const BioTemp = styled.div`
display:flex;
flex:0.5;
padding:5px 5px;
flex-direction:column;
`



export const BioCompOwnProfile = ({follower,followed}) => {
  //@ts-ignore
  const { username }  = useParams();

  

 return(
  
      
    
       <BioWrapper>
     <BannerDiv>
       <div style={{flex:"0.5"}}>
         <Avatar style={{ padding: "20px", flex: "0.5"}} />
       </div>
       <div style={{flex:"0.5", display: "flex",flexDirection:"row-reverse"}}>

       </div>
      
       
      </BannerDiv>
     <BioDiv>
       <BioTemp>
         <div>
           <div> </div>
            <div style={{padding:' 5px  '}}>{username}</div>
           <div style={{padding:'5px '}}> {`${follower} follower ${followed} followed` }</div>
         </div>
  
       </BioTemp>
       <BioTemp style={{justifyContent:"flex-end"}}>
       
       </BioTemp>
        </BioDiv>
          </BioWrapper>
    
      
    
    
    
    
    
 )
}