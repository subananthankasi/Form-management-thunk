import React, { useEffect, useState } from 'react';
import './UserDetails.css';
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBinLine } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userDetailsThunk } from '../Redux/Thunk/UserDetailsThunk';
import { userDeleteThunk } from '../Redux/Thunk/UserDeleteThunk';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { toast, ToastContainer, Bounce } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import spin from '../../../thunk/src/Assets/Animation - 1722514395569.gif';

const Read = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDeleted, setIsDeleted] = useState(false);

  const response = useSelector((state) => state.userData?.data);
  const responseData = response ? response.data : [];
  console.log('responseData', responseData);

  const loading = useSelector(state => state.userData.loading);
  console.log('loading', loading);

  const deleteResponse = useSelector((state) => state.deleteData?.data?.data);
  console.log('deleteResponse', deleteResponse);

  useEffect(() => {
    dispatch(userDetailsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (isDeleted && deleteResponse) {
      toast.success(`${deleteResponse}`, {
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
      setIsDeleted(false); 
    }
  }, [deleteResponse, isDeleted]);

  const newUser = () => {
    navigate('/newUser');
  };

  const editUser = (item) => {
    navigate('/updateUser', { state: { user: item } });
    console.log('item', item);
  };

  const deleteUser = (id) => {
    console.log('deleteUser id', id);
    dispatch(userDeleteThunk(id)).then(() => {
      dispatch(userDetailsThunk());
      setIsDeleted(true);
    });
  };

  const reject = () => {
    toast.warn('You have rejected!', {
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
  };

  const { confirm } = Modal;
  const showDeleteConfirm = (id) => {
    confirm({
      title: 'Are you sure delete this user?',
      icon: <ExclamationCircleFilled />,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => deleteUser(id),
      onCancel: reject
    });
  };

  const saveToken = localStorage.getItem('auth_token');
  console.log('saveToken', saveToken);
  useEffect(() => {
    if (!saveToken) {
      window.location.href = '/';
    }
  }, [saveToken]);

  const logoutPage = () => {
    localStorage.removeItem('auth_token');
    window.location.href = '/';
  };

  return (
    <>
      {
        loading ? (
          <div className='loading'>
            <img src={spin} className='img' alt="Loading" />
          </div>
        ) : (
          <div className='readContainer'>
            <div className='user'>
              <p>USER</p>
              <button className='newUser' onClick={newUser}>
                <i className="fa-solid fa-plus"></i> NewUser
              </button>
              <span style={{ marginLeft: '5px' }}>
                <button className='Logout' onClick={logoutPage}>
                  <b>Logout</b>
                </button>
              </span>
            </div>
            <div>
              <table className="table">
                <thead>
                  <tr className='table-primary'>
                    <th>SNo</th>
                    <th>NAME</th>
                    <th>EMAIL</th>
                    <th>ADDRESS</th>
                    <th>PHONE NO</th>
                    <th>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    responseData?.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item?.fullName}</td>
                        <td>{item?.email}</td>
                        <td>{item?.address}</td>
                        <td>{item?.phoneNo}</td>
                        <td className='d-flex gap-2'>
                          <button className='editIcon' onClick={() => editUser(item)}>
                            <FaRegEdit size={20} color='#1db9aa' />
                          </button>
                          <Button onClick={() => showDeleteConfirm(item.id)} style={{ border: 'none' }}>
                            <RiDeleteBinLine size={22} color='#e63c3c' />
                          </Button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        )
      }
      <ToastContainer />
    </>
  );
};

export default Read;
