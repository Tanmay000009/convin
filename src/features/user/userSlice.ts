import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  status: "idle" | "loading" | "failed" | "success";
  users: string[];
}

export interface APIResponse {
  data: User[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export const initialState: User = {
  id: "",
  email: "",
  first_name: "",
  last_name: "",
  avatar: "",
  status: "idle",
  users: [],
};

export const getUsersAsync = createAsyncThunk("user/getUsers", async () => {
  const response = await fetch("https://reqres.in/api/users");
  const data: APIResponse = await response.json();
  return data;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersAsync.fulfilled, (state, action) => {
      console.log(action.payload);
      const userIds = action.payload.data.map((user) => user.id);
      state.users = userIds;
      state.status = "success";
    });
    builder.addCase(getUsersAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getUsersAsync.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const selectUser = (state: RootState) => state.user.users;

export default userSlice.reducer;
