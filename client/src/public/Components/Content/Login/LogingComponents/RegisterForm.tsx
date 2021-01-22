import React from 'react';
import { Formik } from 'formik';
import axios from 'axios';
import LoginRegisterButton from './LoginRegisterButton';
import FormInput from './FormInput';
import { LinkTag } from './LinkTag'
import { useHistory } from 'react-router-dom';
import { LoginBox } from './LoginBox'
import PromiseToast  from '../../../Toast/PromiseToast';
const Basic = () => {
   let history = useHistory();
  return (
    <div >
      
      <Formik
        initialValues={{ email: '', password: '' ,firstname:'',lastname:'',age:'',username:''}}
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
          const registerPost = axios.post('/api/auth/register', {
          
            email: values.email,
            password: values.password,
            firstName: values.firstname,
            lastName: values.lastname,
            age: values.age,
            username:values.username
           
          }).then(() => {
            history.push('/home');
           });

          PromiseToast(registerPost, "Created New Account")
        
          setSubmitting(false);

        }}
      >
        {({ isSubmitting }) => (
          <LoginBox  >
            <h1>Register</h1>
            <FormInput description={"Firstname"} type={"textarea"} component={"div"} value={"firstname"} />
            <FormInput description={"Lastname"} type={"textarea"} component={"div"} value={"lastname"} />
            <FormInput description={"Age"} type={"textarea"} component={"div"} value={"age"} />
            <FormInput description={"Email"} type={"email"} component={"div"} value={"email"} />
            <FormInput description={"Password"} type={"password"} component={"div"} value={"password"} />
             <FormInput description={"Username"} type={"textarea"} component={"div"} value={"username"} />
            <LoginRegisterButton type="submit" disabled={isSubmitting}>
              Register
           </LoginRegisterButton>
            <LinkTag to="/login" >
              Already have an Account?
            </LinkTag>
          </LoginBox>
        )}
      </Formik>
    </div>
  );
};
 
 export default Basic;