import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background: white;
    font-family: Open-Sans, Helvetica, Sans-Serif;
    height : 100vh;
    
  }
  a{
    font-size : 20px;
    
    color :  #373433;
    font-weight: 900;
  }
`;
 
export default GlobalStyle;