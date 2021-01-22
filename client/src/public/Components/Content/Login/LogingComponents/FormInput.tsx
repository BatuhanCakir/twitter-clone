import { Field, ErrorMessage } from 'formik';
 import styled from 'styled-components'; 
export interface Props {
  type: string,
  value:string,
  description: string,
  component :string
}

const Input = styled.div`
    
    
     border : 1px solid #D6D9D8;
     padding-bottom :3px;
     display:flex;
     flex-direction: column;
     justify-content:flex-start;
     align-items :flex-start;
      border-radius: 5px !important;
    
       
    }
     
  
  
  ` 
const InputValue = styled.p`
padding-left: 7px;
     margin :5px;;
     font-size :13px;
     
  
  ` 

const FieldInput = styled(Field)`
     padding-left: 7px;
    border: none;
    outline :none;
    padding-top : 1px;
    font-size :25px;
    
  
  ` 
const TextInput: React.FC<Props> = ({ description,value,type,component }: Props) => {
   <ErrorMessage name={value} component={component} />
   
  return (
    <Input>
      <InputValue>{ description}</InputValue>
    <FieldInput type={type} name={value} />
    
      
    </Input>
    
  );
}
export default TextInput
