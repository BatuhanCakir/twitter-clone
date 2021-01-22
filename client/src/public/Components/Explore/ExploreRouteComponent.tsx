import  {  useEffect } from "react";
import { useLocation } from "react-router-dom";
const ExploreRouteComponent = ({setVisibility}) => {
  let location = useLocation()
  const {pathname } = location
  const path: string = pathname.substr(1, pathname.length).toLowerCase()
  
  useEffect(() => {
  
    if (path === "login" || path === "register" ) {
      setVisibility("none");
    }
    else {
       setVisibility('')
    }
      
      
    
   
 
  }, [path, setVisibility]);
  
  return null
}

export default ExploreRouteComponent