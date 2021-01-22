import { useContext } from 'react';
import Modal from 'react-modal';
import { ModalContext } from '../../../Context/ModalContext';
import LoginForm from './LogingComponents/LoginForm' 
const customStyles = {
  content : {
    top                   : '45%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight: '-50%',
    height: '60%',
    transform: 'translate(-50%, -50%)',
    border  : 'thin solid  #D6D9D8'
    
  }
};


export const LoginModal = () => {
  const { modalState, setModalState } = useContext(ModalContext);
  
  function closeModal() {
    setModalState(false);
  }
  return (
     <Modal
      isOpen={modalState}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
    >
      <div style={{marginTop:`${80}px`}}>
        <LoginForm/>
      </div>
      
        </Modal>
  )
}