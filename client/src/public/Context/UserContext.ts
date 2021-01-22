import { createContext } from 'react';
interface User {
 
 

  id: number,
  firstName: string,
  lastName: string,
  userName: string,
  email: string,
  age: number,
  created_at:string,
  
  
}
 
interface UserC{
  user: User | null,
  setUser ?: React.Dispatch<React.SetStateAction<any>>
}


export const UserContext = createContext<UserC>({
  user: null,
});