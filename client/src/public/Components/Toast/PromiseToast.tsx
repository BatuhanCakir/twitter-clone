import toast from "react-hot-toast"; 
 //@ts-ignore
const PromiseToast = (request: Promise<T>, toastMessage: string) => {
  
  toast.promise(
    request ,{
            loading: 'Loading',
            success: () => `Successfully saved ${toastMessage}`,
            error: (err) => `This just happened: ${err.toString()}`,
          },
            {
          style: {
          minWidth: '250px',
          },
            success: {
          duration: 5000,
            icon: '🔥',
          },
  }
  );
  
}

export default PromiseToast;
