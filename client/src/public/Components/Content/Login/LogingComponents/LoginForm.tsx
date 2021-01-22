import React from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import LoginRegisterButton from './LoginRegisterButton';
import FormInput from './FormInput';
import PromiseToast  from '../../../Toast/PromiseToast';
import { LinkTag } from './LinkTag'
import {LoginBox} from './LoginBox'



import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { ModalContext } from '../../../../Context/ModalContext';
//@ts-ignore
const Basic = () => {
  const {setModalState} = useContext(ModalContext);
  let history = useHistory()
   
  return (
    <div >
      
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={(values) => {
          const errors = {} as any;
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          const loginPost =axios.post('/api/auth/login', {
          
            email: values.email,
            password: values.password
           
          }).then(() => {
            setModalState(false);
            history.push("/");
          })
           
          PromiseToast(loginPost, "Logged in")
          
         
          
          setSubmitting(false);

        }}
      >
        {({ isSubmitting }) => (
          <LoginBox>
            
            
            <h1>Login</h1>
            <FormInput description={"Email"} type={"email"} component={"div"} value={"email"} />
            <FormInput description={"Password"} type={"password"} component={"div"} value={"password"} />
            <LoginRegisterButton type="submit" disabled={isSubmitting}>
              Log In
           </LoginRegisterButton>
            <LinkTag to="/register" onClick={()=>setModalState(false)}>Register</LinkTag>
          </LoginBox>
        )}
      </Formik>
    </div>
  );
};
 
 export default Basic;