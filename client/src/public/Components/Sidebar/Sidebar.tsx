import styled from "styled-components";

export const SidebarContainer =  styled.div`
    flex: 0.3;

      border-right : thin solid #D6D9D8;
      display : flex;
      justify-content: flex-start;



        height : 100vh;
      
      flex-direction: row-reverse;
      align-items : flex-start;
        @media (max-width: 500px) {
          width: 100%;
          flex-direction: row;
          position:fixed;
          bottom:0;
          height : 53px;
          padding : 0px 25px;
          justify-content : space-evenly;
          align-items:center;
          background-color:  #D6D9D8;
          z-index:1;
        }
        
        @media (max-width: 1281px) {
          justify-content: center;
          
        }
        @media (max-width: 1205px) {
    flex : 0.35;
  
  }

      `


export const Sidebar = styled.nav`
padding-right: 50px;
display : flex;
flex-direction : column;
justify-content : space-around;

align-items : flex-start;
height :  fit-content;

@media (max-width: 500px) {
    width: 100%;
    flex-direction: row;
    position:fixed;
    bottom:0;
    height : 53px;
    justify-content : space-around;
    
  }

 



`
