import { useEffect, useState } from "react";
import { useLoginFuncMutation } from "./authApiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "./authSlice";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { FloatLabel } from "primereact/floatlabel";

const Login = () => {
    const [login, { isSuccess, data, isError, error }] = useLoginFuncMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [formData, setFormData] = useState({
        userName: '',
        password: ''
    });

    const load = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    useEffect(() => {
        if (isSuccess) {
            console.log("Login data:", data);
            dispatch(setToken(data));
            alert("שמחים שחזרת...");
            navigate("/");
        };
        if (isError) {
            setErrorMessage(error.data || "משתמש לא קיים");
        };
    }, [isSuccess, isError, data, error, dispatch, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        login(formData);
    };

    const Register = () => {
        navigate('/register')
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="form-login">
            <div className="card">
                <div className="flex flex-column md:flex-row">
                    <h2 className="title-login">Login</h2>
                    <div className="w-full md:w-5 flex flex-column align-items-center justify-content-center gap-3 py-5">
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">Username</label>
                            <FloatLabel>
                                <InputText name="userName" id="username" onChange={(e) => handleChange(e)} />
                            </FloatLabel>
                        </div>
                        <div className="flex flex-wrap justify-content-center align-items-center gap-2">
                            <label className="w-6rem">password</label>
                            <FloatLabel>
                                <InputText name="password" id="password" onChange={(e) => handleChange(e)} />
                            </FloatLabel>
                        </div>
                        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                        <p>הצטרף לאלפי לקוחות מרוצים -<span onClick={Register} style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>הירשם עכשיו</span></p>
                        <Button label="Submit" icon="pi pi-check" onClick={load} type="submit" />
                    </div>
                </div>
            </div>
        </form>
    )
};

export default Login;