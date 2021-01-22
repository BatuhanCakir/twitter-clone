
import styled from 'styled-components';

import TweetForm from './TweetForm'

const TweetDiv = styled.div`
  border-bottom: 8px solid #D6D9D8;
  padding-bottom: 10px;
  padding-right: 10px;
`


const tweetBox :React.FC = (props) => {
  return (
    <TweetDiv>
      <TweetForm props={props}/>
        
      
     

    </TweetDiv>
  )
}
export default tweetBox;