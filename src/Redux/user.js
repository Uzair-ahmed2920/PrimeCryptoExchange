import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../services/AxiosInstance";
import { successMessage, errorMessage } from "../utils/message";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const initialState = {
  currentUser: null,
  getUserRewards: [],
  allUsers: [],
  getUserWallet: 0,
  getAdminDefaultPer: {},
  isloading: false, 
};
// get requests
// export const allUsers = createAsyncThunk("allUsers", async () => {
//   try {
//     const res = await axiosInstance.get(`api/user/getall`);
//     if (res.status === 200) {
//       return res.data;
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

// export const getCurrentuser = createAsyncThunk(
//   "getCurrentuser",
//   async (userId) => {
//     try {
//       const { data } = await axiosInstance.get(`/api/user/${userId}`);
//       return data;
//     } catch (err) {
//       console.log(err);
//     }
//   }
// );

//post requests

export const userSignUp = createAsyncThunk("userSignUp", async (formData) => {
  try {
    const res = await axiosInstance.post(`/api/user/register`, formData);
    if (res.status === 200) {
      successMessage("User successfully registered");
      // return res.data.user;
    }
  } catch (err) {
    console.log(err);
    errorMessage(err.response.data || err.message);
  }
});

export const userLogin = createAsyncThunk("userLogin", async (formData) => {
  console.log("formDataLogin", formData);
  try {
    const res = await axiosInstance.post(`/api/user/login`, formData);
    if (res.status === 200) {
      successMessage("User successfully logedin");
      return res.data;
      // return res.data.user;
    }
  } catch (err) {
    console.log(err);
    errorMessage(err.response.data || err.message);
  }
});
// get wallet
export const getUserWallet = createAsyncThunk(
  "getUserWallet",
  async (userId) => {
    try {
      const res = await axiosInstance.get(`/api/wallet/${userId}`);
      if (res.status === 200) {
       // console.log(res.data, "wallet data");
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
  }
);

//update Requests
// export const updateUserLevel = createAsyncThunk(
//   "updateUserLevel",
//   async (formData, { getState }) => {
//     try {
//       const res = await axiosInstance.put(`/api/profile/level`, formData);
//       if (res.status === 200) {
//         let array = [...getState().userReducer.allUsers];
//         let index = array.findIndex((d) => d.id === formData?.user_id);
//         array[index] = { ...array[index], level: formData?.level };
//         // successMessage("User Level Changed");
//         return array;
//       }
//     } catch (err) {
//       console.log(err);
//       errorMessage(err.response.data || err.message);
//     }
//   }
// );

export const userReducer = createSlice({
  name: "userReducer",
  initialState: initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
    resetCurrentUser(state, action) {
      state.currentUser = null;
    },
  },
  extraReducers: {
    [userSignUp.fulfilled]: (state, action) => {
      state.isloading = false;
    },
    [userSignUp.pending]: (state, action) => {
      state.isloading = true;
    },

    [userLogin.fulfilled]: (state, action) => { 
      state.isloading = false;
      //state.token = action.payload.token;
      console.log(action.payload);
    },
    [userLogin.pending]: (state, action) => {
      state.isloading = true;
    },
    [getUserWallet.fulfilled]: (state, action) => {
      state.isloading = false;
      state.getUserWallet = action.payload.balance;
      console.log("balance", action.payload.balance);
    },
    [getUserWallet.pending]: (state, action) => {
      state.isloading = true;
    },
    [getUserWallet.rejected]: (state, action) => {
      state.isloading = false;
      console.log("rejected", action);
    },

  },
});
// Action creators are generated for each case reducer function
export const { setCurrentUser, resetCurrentUser } = userReducer.actions;
export default userReducer.reducer;
