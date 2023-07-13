import { Navigate, Outlet } from "react-router-dom";
import useStore from '../Store/store';

const RequireAuth = ({allowedRoles}) => {

    const cUser = useStore(state => state.cUser)
    const status= cUser.type

   
   
    return (
        status?.includes(allowedRoles)
            ?  
                <Outlet />
                : 
                <Navigate to="/" />
                
    );
}

export default RequireAuth;