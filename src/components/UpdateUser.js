import React, { useEffect, useState } from "react";
import "./NewUser.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectRoleThunk } from "../Redux/Thunk/NewUser/SelectRoleThunk";
import { updateGetThunk } from "../Redux/Thunk/UpdateThunk";
import { updateThunk } from "../Redux/Thunk/UpdateGetThunk";
import { toast, ToastContainer, Bounce } from 'react-toastify';



const UpdateUser = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation();
    const [isUpdated, setIsUpdated] = useState(false);

    const userToUpdate = location.state?.user;
    console.log('userToUpdate', userToUpdate)

    const updateToast = useSelector((state) => state.update?.data?.data)
    console.log('updateToast', updateToast)


    const formik = useFormik({
        initialValues: {
            fullName: userToUpdate?.fullName || '',
            email: userToUpdate?.email || '',
            phoneNo: userToUpdate?.phoneNo || '',
            address: userToUpdate?.address || '',
            userName: userToUpdate?.userName || '',
            userRoleId: userToUpdate?.userRoleId || ''
        },
        validationSchema: yup.object().shape({
            fullName: yup.string().required("*required!!"),
            email: yup.string().required("*required!!"),
            phoneNo: yup.string().required("*required!!"),
            address: yup.string().required("*required!!"),
            userName: yup.string().required("*required!!"),
            userRoleId: yup.string().required("*required!!"),
        }),

        onSubmit: (values) => {
            const payload = {
                fullName: values.fullName,
                email: values.email,
                phoneNo: values.phoneNo,
                address: values.address,
                userName: values.userName,
                userRoleId: values.userRoleId,
                id: userToUpdate.id
            }
            console.log('values', values)
            dispatch(updateThunk(payload))
                .then(() => {
                    setIsUpdated(true);

                });
        }
    });
    useEffect(() => {
        if (isUpdated && updateToast) {
            toast.success(`${updateToast}`, {
                position: "top-right",
                autoClose: 4000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                transition: Bounce,
            });
            setTimeout(() => {
                navigate('/userDetails');
            }, 500);
        }
    }, [updateToast, isUpdated]);

    useEffect(() => {
        dispatch(selectRoleThunk())
        dispatch(updateGetThunk(userToUpdate))
    }, [])

    const role = useSelector((state) => state.selectRole?.data)
    const roleResponse = role?.data



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
                        {/* {formik.errors.fullName && formik.touched.fullName ? (
                            <p style={{ color: "red" }}>{formik.errors.fullName}</p>
                        ) : null} */}
                        <label htmlFor="">Email <span style={{ color: 'red' }}>*</span></label>
                        <input
                            type="email"
                            name="email"
                            value={formik.values.email}
                            className="form-control mt-3"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {/* {formik.errors.email && formik.touched.email ? (
                            <p style={{ color: "red" }}>{formik.errors.email}</p>
                        ) : null} */}
                        <label htmlFor="">Phone No <span style={{ color: 'red' }}>*</span></label>
                        <input
                            type="number"
                            name="phoneNo"
                            value={formik.values.phoneNo}
                            className="form-control mt-3"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {/* {formik.errors.phoneNo && formik.touched.phoneNo ? (
                            <p style={{ color: "red" }}>{formik.errors.phoneNo}</p>
                        ) : null} */}
                        <label htmlFor="">Address <span style={{ color: 'red' }}>*</span></label>
                        <input
                            type="textarea"
                            name="address"
                            value={formik.values.address}
                            className="form-control mt-3"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {/* {formik.errors.userName && formik.touched.address ? (
                            <p style={{ color: "red" }}>{formik.errors.address}</p>
                        ) : null} */}
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
                        {/* {formik.errors.userName && formik.touched.userName ? (
                            <p style={{ color: "red" }}>{formik.errors.userName}</p>
                        ) : null} */}

                        <label htmlFor="">UserRole <span style={{ color: 'red' }}>*</span></label>
                        <select name="userRoleId" id="language" onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-select' >
                            <option value=''>{userToUpdate?.roleName}</option>

                            {
                                roleResponse?.map((item) => (
                                    <option value={item.id} key={item.id}>{item?.roleName} </option>
                                ))
                            }

                        </select>
                        {/* {formik.errors.userRoleId && formik.touched.userRoleId ? (
                            <p style={{ color: "red" }}>{formik.errors.userRoleId}</p>
                        ) : null} */}
                    </div>
                </div>
                <div className="mt-3" style={{ textAlign: 'right' }}>
                    <button className="btn btn-primary" type="submit">Update</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateUser;
