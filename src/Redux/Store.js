import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./Slice/LoginSlice";
import { userDetailsReducer } from "./Slice/UserDetailsSlice";
import { selectRoleReducer } from "./Slice/NewUser/SelectRoleSlice";
import { createUserReducer } from "./Slice/NewUser/CreateUserSlice";
import { updateGetReducer } from "./Slice/UpdateGetSlice";
import { updateReducer } from "./Slice/UpdateSlice";
import { userDeleteReducer } from "./Slice/UserDeleteSlice";



export const store = configureStore({
    reducer:{
      loginData :loginReducer,
      userData : userDetailsReducer,
      selectRole:selectRoleReducer,
      createUser:createUserReducer,
      updateGet:updateGetReducer,
      update:updateReducer,
      deleteData:userDeleteReducer,
    }
})