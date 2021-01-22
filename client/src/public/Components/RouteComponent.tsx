import  {  useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";


//@ts-ignore
export default function RouteComponent({ setShowSidebar } ) {
  const { pathname }  = useLocation();
  let history = useHistory()
  const path : string = pathname.substr(1,pathname.length).toLowerCase()
  
  
    useEffect(() => {

    if (path === "login" || path === "register" ) {
      return setShowSidebar("none");
      }
      
      if (path.length === 0) {

           history.push("/home");
 
       
    }
    setShowSidebar("")
 
  }, [path,setShowSidebar,history]);

  return null;
}