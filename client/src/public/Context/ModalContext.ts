import { createContext } from 'react';
interface ModalS {
  modalState: boolean,
}
 
interface ModalState{
  modalState: ModalS ,
  setModalState ?: React.Dispatch<React.SetStateAction<any>>
}


export const ModalContext = createContext<ModalState>({
  modalState: null,
  
});