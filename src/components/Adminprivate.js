import { useState} from "react";
import { useAuth } from "../contextapi/Authcontext";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";

const Adminprivate = () => {
    const host = "http://localhost:5000";

    const [ok, setOk] = useState(false);
    const [auth] = useAuth();

        const authCheck = async () => {
            const res = await axios.get(`${host}/api/v1/auth/admin-auth`,{
                headers:{
                    'Authorization':auth?.token,
                }
            });
            if (res.data.ok) {
                setOk(true);
            } else {
                setOk(false);
            }
        };
        if (auth?.token) authCheck();

    return ok ? <Outlet/> : <Spinner path=" " />;
}

export default Adminprivate;