import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
    const token = useSelector((state) => state.auth.token);
    const obj = jwtDecode(token);
    const { firstName, lastName, phon, email, userName, roles } = obj;

    return { firstName, lastName, phon, email, userName, roles };
};

export default useAuth;