import styled from 'styled-components';
import LoginForm from './LogingComponents/LoginForm'
//@ts-ignore
const Login: React.FC = () => {

  const LoginF = styled(LoginForm)`
      justify-content : center;
      align-items: center;
      overflow: hidden;
      background-color: #F5F8FA;
  `
  
  return (
    <LoginF  />
    
  )
}
export default Login;
