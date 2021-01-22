
import { NavLink } from "react-router-dom";
import styled from 'styled-components';
const activeClassName = "selected";


interface Props {
  dest : string;
  input : string;
  logo?: React.ReactNode;
  hideOnMobile?: string
}


  

const StyledValue = styled.span`

margin:auto;
@media (max-width: 1281px) {
    display:none;
    
  }
`
const StyledIcon = styled.span`
@media (max-width: 500px) {
    
    justify-content : space-around;
  }
`

const StyledSpan = styled.span`
@media (max-width: 1281px) {
    
   display:none
  }
`


const NavLinkField: React.FC<Props> = ({ dest, input, logo, hideOnMobile = "" }: Props) => {
 const StyledLink = styled(NavLink).attrs({
  activeClassName
})`
display : flex;
flex-direction : row;
padding: 7px 15px;
margin: 20px 0;

&:hover  {
    background-color: #add8e6;
    border-radius :25px;
    
  }
  
  @media (max-width: 500px) {
    margin:  0;
    flex-wrap: wrap-reverse;
   display: ${hideOnMobile}
  }


  &.${activeClassName} {
    color: #008AD8;
  }

`;
  return (
  


      <StyledLink to={"/" + dest} activeClassName={activeClassName}  style={{ textDecoration: 'none' }}>
        <><StyledIcon>
          {logo}
      </StyledIcon>
        
        <StyledSpan>&nbsp;&nbsp;</StyledSpan>
          <StyledValue>
             {input}
          </StyledValue>
         
        </>
        
      </StyledLink>
    
   
  )
};
export default NavLinkField;
