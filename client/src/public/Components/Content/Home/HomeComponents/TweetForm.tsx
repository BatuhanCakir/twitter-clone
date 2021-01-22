import { Formik, Form, Field} from 'formik';

import styled from 'styled-components';
import axios from 'axios';
import PromiseToast from '../../../Toast/PromiseToast';
import { useContext } from 'react';
import { UserContext } from '../../../../Context/UserContext';
import { StyledAvatar } from '../../../Avatar';
import {useHistory} from 'react-router-dom'

const StyledForm = styled(Form)`
  display:flex
 

`
const TweetButton = styled.button`

background-color: #50b7f5 !important;
  border: none !important;
  color: white !important;
  font-weight: 900 !important;
  text-transform: inherit !important;
  border-radius: 30px !important;
  width: 80px;
  height: 40px !important;
  margin-top: 20px !important;
  margin-left: auto !important;
`

const ButtonDiv = styled.div`
display:flex;
flex-direction: column-reverse;
`
const TweetField = styled(Field)`
padding-left: 10px;
font-size:20px;
flex:1;
border:none;
 &:focus{
    outline: none;
  }
`

const TweetForm = (props) => {

  
  const { user } = useContext(UserContext);
  const initialV = { content: '' }
  let history = useHistory()
  
  return(
  
    <div style={{ padding: "10px" }}>
      <Formik
        initialValues= {initialV}
        validate={(values) => {
          const errors = {} as any;
          if (!values.content) {
            errors.content ="Required"
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting, resetForm}) => {
          console.log('sdasd');
          
          console.log(user);
          
          if (user) {
            const tweetPost = axios.post('/api/tweet/post', {
            id : user.id,
              content: values.content,
            username:user.userName,
          
           
            })
            const Tweet = {
              content: values.content,
              username: user.userName,
              
            }
            console.log(tweetPost);
            

            resetForm( )
            setSubmitting(false);
            
            PromiseToast(tweetPost, "Tweeted")
            
          }
          
        }}
      >
        {({ isSubmitting }) => (
          <>
            <StyledForm>
              <StyledAvatar onClick={() => history.push(`/${user.userName}`)}  />
              <TweetField type="content" name="content" placeholder="Whats happening" />
            <ButtonDiv>
              <TweetButton type="submit" disabled={isSubmitting}>
                Tweet
            </TweetButton>
            </ButtonDiv>
           
            </StyledForm>
            
          </>
        )}
      </Formik>
    </div>
  )
};



 
 export default TweetForm;