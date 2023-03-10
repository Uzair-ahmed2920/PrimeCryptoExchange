import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../services/AxiosInstance";
import { successMessage, errorMessage } from "../utils/message";
import Cookies from "universal-cookie";
import cryptoicons from "../../src/images/cryptoIcons/cryptoImg";
const cookies = new Cookies();
const initialState = {
  
  isloading: false, 
  data: [{}],
  withdrawRequest: [{}],
  coinData: [{}],
  tradeData: [{}],
  tradeHistory: [{}],
};
// get requests
// export const getUserWallet = createAsyncThunk(
//   "getUserWallet",
//   async (userId) => {
//     try {
//       const res = await axiosInstance.get(`api/wallet/${userId}`);
//       if (res.status === 200) {
//         return res.data;
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   }
// );

// get Coin
export const getAllCoin = createAsyncThunk("getAllCoin", async () => {
  try {
    const res = await axiosInstance.get(`/coinmarket`);
    if (res.status === 200) {
      successMessage("Successfully get All Coin !");
      console.log(res.data , "coin data");
      const filterData= res.data.filter(item => cryptoicons[item.symbol])
      return filterData;
      //return res.data;
    }
  } catch (err) {
    errorMessage(err.response.data || err.message);
    console.log(err);
  }
});

// get all trade
export const getAllTrade = createAsyncThunk("getAllTrade", async (postData) => {
  try {
    const res = await axiosInstance.get(`/api/activetrade/${postData.user_id}}`);
    if (res.status === 200) {
      console.log(res.data , "trade data");
      successMessage("Successfully get All Trade !");
      return res.data;
    }
  } catch (err) {
    errorMessage(err.response.data || err.message);
    console.log(err);
  }
  
});

// trade close
export const tradeClose = createAsyncThunk("tradeClose", async (postData) => {
  let reqBody = { crypto_sale_price: postData.crypto_sale_price };
  console.log(reqBody, "reqBody from trade close");
  try {   
    const res = await axiosInstance.delete(`/api/activetrade/${postData.id}`, {data:reqBody}).catch((err) => {
      console.log(err.response.data, "err.response.data");
    });
    if (res.status === 200) {
      console.log(res.data , "trade data close");
      successMessage("Successfully Trade close !");
      return res.data;
    }
  } catch (err) {
    errorMessage(err.response.data || err.message);
    console.log(err);
  }
});

// partial trade close
export const partialTradeClose = createAsyncThunk("partialTradeClose", async (postData) => {
  try {
    const res = await axiosInstance.post(`/api/activetrade/partial`, postData).catch((err) => {
      console.log(err.response.data, "err.response.data");
    });
    if (res.status === 200) {
      console.log(res.data , "trade data close");
      successMessage("Successfully partial Trade close !");
      return res.data;
    }
  } catch (err) {
    errorMessage(err.response.data || err.message);
    console.log(err);
  }
});

// get trade history
export const getTradeHistory = createAsyncThunk(
  "getTradeHistory",
  async (postData) => {
    try {
      const res = await axiosInstance.get(`/api/tradehistory/${postData.user_id}`);
      if (res.status === 200) {
        successMessage("Successfully get All Trade History !");
        return res.data;
      }
    } catch (err) {
      errorMessage(err.response.data || err.message);
      console.log(err);
    }
  }
);
  

// get requests
 export const getAllDepositRequest = createAsyncThunk(
    "getAllDepositRequest",
    async () => {
      try {
        const res = await axiosInstance.get(`/api/deposit/`);
        if (res.status === 200) {
          successMessage("Successfully get All Deposit Request !");
          return res.data;
        }
      } catch (err) {
        errorMessage(err.response.data || err.message);
        console.log(err);
      }
    }
  );

  export const getAllWithDrawRequest = createAsyncThunk(
    "getAllWithdrawRequest",
    async () => {
      try {
        const res = await axiosInstance.get(`/api/withdraw/`);
        if (res.status === 200) {
          successMessage("Successfully get All Withdraw Request !");
          return res.data;
        }
      } catch (err) {
        errorMessage(err.response.data || err.message);
        console.log(err);
      }
    }
  );
  // updste coin status
  export const updateDepositStatus = createAsyncThunk(
    "updateDepositStatus",
    
    async (postData) => {
     let reqBody = { status: postData.status, status_description: postData.status_description };
      try {
        const res = await axiosInstance.put(`/api/deposit/${postData.id}`, reqBody);
        if (res.status === 200) {
          console.log(res.data);
          successMessage("Deposit Status Updated Successfully !");
          return res.data;
        }
      } catch (err) {
        console.log(err);
        errorMessage(err.response.data || err.message);
      }
    }
  );



// @desc    Deposit Amount
// @route   POST /api/deposit/
 export const depositAmount = createAsyncThunk(
    "depositAmount",
    async (postData) => {
      try {
        const res = await axiosInstance.post(`/api/deposit/`, postData);
        console.log(res);
        if (res.data) { 
          successMessage("Deposit request sent Successfully !");
        }
        return res.data;
      } catch (err) {

        errorMessage(err.response.data || err.message);
        //reject with asyncthunk
        return Promise.reject(err.response.data || err.message);
    
        
      }
    }
  );
  export const withdrawAmount = createAsyncThunk(
    "withdrawAmount",
    async (postData) => {
      try {
        const res = await axiosInstance.post(`/api/withdraw/`, postData);
        console.log(res);
        if (res.data) { 
          successMessage("Withdraw request sent Successfully !");
        }
        return res.data;
      } catch (err) {

        errorMessage(err.response.data || err.message);
        //reject with asyncthunk
        return Promise.reject(err.response.data || err.message);
    
        
      }
    }
  );



  // create trade
 export const createTrade = createAsyncThunk(
    "createTrade",
    async (postData) => {
      try {
        const res = await axiosInstance.post(`/api/activetrade/`, postData);
        console.log(res);
        if (res.data) {
          successMessage("Trade Successfully !");
        }
        return res.data;
      } catch (err) {
        errorMessage(err.response.data || err.message);
      }
    }
  );

  //create trade

// post requests
// export const solidToStandExchange = createAsyncThunk(
//   "solidToStandExchange",
//   async (postData) => {
//     try {
//       const res = await axiosInstance.post(`api/exchangecoin`, postData);
//       console.log(res);
//       if (res.data) {
//         successMessage("Stand to Solid Exchange Successfully !");
//       }
//       return res.data;
//     } catch (err) {
//       errorMessage(err.response.data || err.message);
//     }
//   }
// );

export const coinReducer = createSlice({
  name: "coinReducer",
  initialState: initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.currentUser = action.payload;
    },
  },
  extraReducers: {
        [depositAmount.fulfilled]: (state, action) => {
          state.isloading = false;
        },
        [depositAmount.pending]: (state, action) => {
          state.isloading = true;
        },

        [depositAmount.rejected]: (state, action) => {
          state.isloading = false;
          console.log("rejected", action);
        },
        [withdrawAmount.fulfilled]: (state, action) => {
          state.isloading = false;
        },
        [withdrawAmount.pending]: (state, action) => {
          state.isloading = true;
        },
        [withdrawAmount.rejected]: (state, action) => {
          state.isloading = false;
          console.log("rejected", action);
        },
        [getAllDepositRequest.fulfilled]: (state, action) => {
          state.isloading = false;
          state.data = action.payload;
          console.log("action.payload", action.payload);
        },
        [getAllDepositRequest.pending]: (state, action) => {
          state.isloading = true;
        },
        [getAllDepositRequest.rejected]: (state, action) => {
          state.isloading = false;
          console.log("rejected", action);
        },

        [getAllWithDrawRequest.fulfilled]: (state, action) => {
          state.isloading = false;
          state.withdrawRequest = action.payload;
          console.log("action.payload", action.payload);
        },
        [getAllWithDrawRequest.pending]: (state, action) => {
          state.isloading = true;
        },
        [getAllWithDrawRequest.rejected]: (state, action) => {
          state.isloading = false;
          console.log("rejected", action);
        },
        
        [updateDepositStatus.fulfilled]: (state, action) => {
          state.isloading = false;
         // state.data = action.payload;
          console.log("action.payload", action.payload);
        },
        [updateDepositStatus.pending]: (state, action) => {
          state.isloading = true;
        },
        [updateDepositStatus.rejected]: (state, action) => {
          state.isloading = false;
          console.log("rejected", action);
        },

    [getAllCoin.fulfilled]: (state, action) => {
      state.isloading = false;
      state.coinData = action.payload;
      console.log("action.payload", action.payload);
    },
    [getAllCoin.pending]: (state, action) => {
      state.isloading = true;
    },
    [getAllCoin.rejected]: (state, action) => {
      state.isloading = false;
      console.log("rejected", action);
    },

    [createTrade.fulfilled]: (state, action) => {
      state.isloading = false;
      //state.data = action.payload;
      console.log("action.payload", action.payload);
    },
    [createTrade.pending]: (state, action) => {
      state.isloading = true;
    },
    [createTrade.rejected]: (state, action) => {
      state.isloading = false;
      console.log("rejected", action);
    },

    [getAllTrade.fulfilled]: (state, action) => {
      state.isloading = false;
      state.tradeData = action.payload;
      console.log("action.payload for portfolio", action.payload);
    },
    [getAllTrade.pending]: (state, action) => {
      state.isloading = true;
    },
    [getAllTrade.rejected]: (state, action) => {
      state.isloading = false;
      console.log("rejected", action);
    },
    [tradeClose.fulfilled]: (state, action) => {
      state.isloading = false;
      //state.data = action.payload;
      console.log("action.payload", action.payload);
    },
    [tradeClose.pending]: (state, action) => {
      state.isloading = true;
    },
    [tradeClose.rejected]: (state, action) => {
      state.isloading = false;
      console.log("rejected trade", action);
    },

    [partialTradeClose.fulfilled]: (state, action) => {
      state.isloading = false;
      //state.data = action.payload;
      console.log("action.payload partial close", action.payload);
    },
    [partialTradeClose.pending]: (state, action) => {
      state.isloading = true;
    },
    [partialTradeClose.rejected]: (state, action) => {
      state.isloading = false;
      console.log("rejected partial trade close", action);
    },
    
    [getTradeHistory.fulfilled]: (state, action) => {
      state.isloading = false;
      state.tradeHistory = action.payload;
    },
    [getTradeHistory.pending]: (state, action) => {
      state.isloading = true;
    },
    [getTradeHistory.rejected]: (state, action) => {
      state.isloading = false;
      console.log("rejected", action);
    },

    






    // [getUserWallet.fulfilled]: (state, action) => {
    //   state.amount = action.payload;
    // },
  },
});
// Action creators are generated for each case reducer function
export const { setCurrentUser } = coinReducer.actions;
export default coinReducer.reducer;
