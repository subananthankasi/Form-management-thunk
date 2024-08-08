import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import logo from "../Assets/logo.png";
import { useDispatch, useSelector } from "react-redux";
import { LoginThunk } from "../Redux/Thunk/LoginThunk";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialValues = {
        userName: "",
        password: "",
    };
    const validationSchema = yup.object().shape({
        userName: yup.string().required("*required!!"),
        password: yup.string().required("*required!!"),
    });

    const toastLogin = useSelector((state) => state.loginData);
    console.log("toastLogin", toastLogin);

    const onSubmit = async (values) => {
        try {
            const resultAction = await dispatch(LoginThunk(values));
            console.log("resultAction", resultAction);

            if (LoginThunk.fulfilled.match(resultAction)) {
                const { message } = resultAction.payload.data;
                toast.success(message, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });

                setTimeout(() => {
                    navigate("/userDetails");
                }, 2000);
            } else if (LoginThunk.rejected.match(resultAction)) {
                const errorPayload = resultAction.payload.error.message;
                console.log("errorPayload", errorPayload);
                toast.error(errorPayload, {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    transition: Bounce,
                });
            }
        } catch (error) {
            toast.error("Login failed", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
        }
    };

    const data = useSelector((state) => state.loginData);
    console.log("data", data);

    const role = data?.data;
    console.log("role", role);

    const data1 = role?.data;
    console.log("data1", data1);

    const auth_Token = data1?.jwt;
    console.log("auth_Token", auth_Token);

    useEffect(() => {
        if (auth_Token) {
            localStorage.setItem("auth_token", auth_Token);
        } else {
            return;
        }
    }, [auth_Token]);

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <div className="d-flex Container loginContainer" style={{ justifyContent: "center" }}>
            <ToastContainer />
            <form onSubmit={formik.handleSubmit}>
                <div className="box mt-5 ">
                    <div style={{ textAlign: "center" }}>
                        <img src={logo} alt="LoginImg" />
                    </div>
                    <div className="mt-3 title">
                        <p>Log In</p>
                    </div>
                    <div>
                        <label htmlFor="userName">UserName :</label>
                        <input
                            type="text"
                            name="userName"
                            value={formik.values.userName}
                            className="form-control mt-3"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    {formik.errors.userName && formik.touched.userName ? (
                        <p style={{ color: "red" }}>{formik.errors.userName}</p>
                    ) : null}
                    <div>
                        <label htmlFor="Password" className="mt-3">
                            Password :
                        </label>
                        <input
                            type="password"
                            name="password"
                            className="form-control mt-3"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                    </div>
                    {formik.errors.password && formik.touched.password ? (
                        <p style={{ color: "red" }}>{formik.errors.password}</p>
                    ) : null}
                    <div className="mt-3">
                        <p style={{ textAlign: "right" }}>Forgot Password ?</p>
                    </div>

                    <div className="mt-3 ">
                        <button type="submit" className="w-100 loginButton">
                            Log In
                        </button>
                    </div>
                    <div className="mt-3" style={{ textAlign: "center", color: "gray" }}>
                        <p>© Ebrain Technologies</p>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;
