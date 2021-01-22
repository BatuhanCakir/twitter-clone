import styled from "styled-components";

const Wrapper = styled.div`
  overflow-y: scroll;
  width : 100%;
  height : 100vh;
  &::-webkit-scrollbar {
  display: none;
}

-ms-overflow-style: none; 
  scrollbar-width: none; 

`

export default Wrapper;