import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
    user: {username: "Joe"}
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload;
            console.log('userSlice is trying to save user:', state.user);
        },
        logoutUser: (state) => {
            state.user = null;
            console.log("logout");
        },
    }
});

console.log(userSlice);

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;