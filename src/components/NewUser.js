import React, { useEffect } from "react";
import "./NewUser.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectRoleThunk } from "../Redux/Thunk/NewUser/SelectRoleThunk";
import { createUserThunk } from "../Redux/Thunk/NewUser/CreateUserThunk";
import { toast, ToastContainer, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const initialValues = {
        fullName: '',
        email: '',
        phoneNo: '',
        address: '',
        userName: "",
        password: "",
        userRoleId: ''
    };

    const validationSchema = yup.object().shape({
        fullName: yup.string().required("*required!!"),
        email: yup.string().required("*required!!"),
        phoneNo: yup.string()
            .matches(/^\d{10}$/, "Invalid phone number")
            .min(10, 'minimum 10 numbers!!')
            .max(10, 'maximum 10 numbers!!')
            .required("*required!!"),
        address: yup.string().required("*required!!"),
        userName: yup.string().required("*required!!"),
        password: yup.string().required("*required!!"),
        userRoleId: yup.string().required("*required!!"),
    });
    const onSubmit = async (values) => {
        try {
            const resultAction = await dispatch(createUserThunk(values));
            console.log("resultAction", resultAction);

            if (createUserThunk.fulfilled.match(resultAction)) {
                const message = resultAction.payload.data;
                console.log('message', message)
                toast.success(message, {
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

                setTimeout(() => {
                    navigate("/userDetails");
                }, 500);
            } else if (createUserThunk.rejected.match(resultAction)) {
                const errorPayload = resultAction.payload.error.reason;
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

    useEffect(() => {
        dispatch(selectRoleThunk());
    }, [dispatch]);

    const role = useSelector((state) => state.selectRole?.data);
    const roleResponse = role?.data;

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <div className="userContainer p-5">
            <ToastContainer />
            <div>
                <p style={{ fontWeight: '500' }}>USER</p>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className="row gap-3 ">
                    <div className="col card p-3">
                        <label htmlFor="">FirstName <span style={{ color: 'red' }}>*</span> </label>
                        <input
                            type="text"
                            name="fullName"
                            value={formik.values.fullName}
                            className="form-control mt-3"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.fullName && formik.touched.fullName ? (
                            <p style={{ color: "red" }}>{formik.errors.fullName}</p>
                        ) : null}
                        <label htmlFor="">Email <span style={{ color: 'red' }}>*</span></label>
                        <input
                            type="email"
                            name="email"
                            value={formik.values.email}
                            className="form-control mt-3"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.email && formik.touched.email ? (
                            <p style={{ color: "red" }}>{formik.errors.email}</p>
                        ) : null}
                        <label htmlFor="">Phone No <span style={{ color: 'red' }}>*</span></label>
                        <input
                            type="number"
                            name="phoneNo"
                            value={formik.values.phoneNo}
                            className="form-control mt-3"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.phoneNo && formik.touched.phoneNo ? (
                            <p style={{ color: "red" }}>{formik.errors.phoneNo}</p>
                        ) : null}
                        <label htmlFor="">Address <span style={{ color: 'red' }}>*</span></label>
                        <input
                            type="textarea"
                            name="address"
                            value={formik.values.address}
                            className="form-control mt-3"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.userName && formik.touched.address ? (
                            <p style={{ color: "red" }}>{formik.errors.address}</p>
                        ) : null}
                    </div>
                    <div className="col card p-3">
                        <label htmlFor="">User Name <span style={{ color: 'red' }}>*</span></label>
                        <input
                            type="text"
                            name="userName"
                            value={formik.values.userName}
                            className="form-control mt-3"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.userName && formik.touched.userName ? (
                            <p style={{ color: "red" }}>{formik.errors.userName}</p>
                        ) : null}
                        <label htmlFor="">Password <span style={{ color: 'red' }}>*</span></label>
                        <input
                            type="password"
                            name="password"
                            value={formik.values.password}
                            className="form-control mt-3"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.password && formik.touched.password ? (
                            <p style={{ color: "red" }}>{formik.errors.password}</p>
                        ) : null}
                        <label htmlFor="">UserRole <span style={{ color: 'red' }}>*</span></label>
                        <select name="userRoleId" id="language" onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-select' >
                            <option value="">Select Role</option>
                            {
                                roleResponse?.map((item) => (
                                    <option value={item?.id} key={item?.id}>{item?.roleName} </option>
                                ))
                            }
                        </select>
                        {formik.errors.userRoleId && formik.touched.userRoleId ? (
                            <p style={{ color: "red" }}>{formik.errors.userRoleId}</p>
                        ) : null}
                    </div>
                </div>
                <div className="mt-3" style={{ textAlign: 'right' }}>
                    <button className="btn btn-primary" type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
};

export default NewUser;
