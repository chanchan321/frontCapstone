import { Navigate, Outlet } from "react-router-dom";
import useStore from '../Store/store';

const RequireAuthOnline = ({ allowed }) => {
    
    const cUser = useStore(state => state.cUser)

    const status= cUser.type ? 'loggedIN' : 'none'


    return (
        status?.includes(allowed)
            ?  
                <Outlet />
                : 
                <Navigate to="/"  />
                    
    );
}

export default RequireAuthOnline;

