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
  page: number;
  total_pages: number;
}

export interface UsersAPIResponse {
  data: User[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface UserAPIResponse {
  data: {
    id: "";
    email: "";
    first_name: "";
    last_name: "";
    avatar: "";
  };
  status: "idle" | "loading" | "failed" | "success";
}

export const initialState: User = {
  id: "",
  email: "",
  first_name: "",
  last_name: "",
  avatar: "",
  status: "idle",
  users: [],
  page: 0,
  total_pages: 0,
};

export const getUsersAsync = createAsyncThunk(
  "user/getUsers",
  async (id: string = "1") => {
    const response = await fetch(`https://reqres.in/api/users/?page=${id}`);
    const data: UsersAPIResponse = await response.json();
    return data;
  }
);

export const getUserAsync = createAsyncThunk(
  "user/getUser",
  async (id: string = "0") => {
    if (id === "0") return;
    const response = await fetch(`https://reqres.in/api/users/${id}`);
    const data: UserAPIResponse = await response.json();
    return data;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersAsync.fulfilled, (state, action) => {
      const userIds = action.payload.data.map((user) => user.id);
      state.users = userIds;
      state.page = action.payload.page;
      state.total_pages = action.payload.total_pages;
      state.status = "success";
    });
    builder.addCase(getUsersAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getUsersAsync.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(getUserAsync.fulfilled, (state, action) => {
      state.id = action.payload?.data?.id ?? "";
      state.email = action.payload?.data?.email ?? "";
      state.first_name = action.payload?.data?.first_name ?? "";
      state.last_name = action.payload?.data?.last_name ?? "";
      state.avatar = action.payload?.data?.avatar ?? "";
      state.status = "success";
    });
    builder.addCase(getUserAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getUserAsync.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export const selectUsers = (state: RootState) => state.user;

export const selectUser = (state: RootState) => state;

export default userSlice.reducer;
