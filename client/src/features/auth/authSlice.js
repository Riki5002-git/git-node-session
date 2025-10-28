import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const authInitState = {
    token: localStorage.getItem("token") || "",
    isUserLoggdin: !!localStorage.getItem("token"),
    roles: localStorage.getItem("roles") || "",
    basket: JSON.parse(localStorage.getItem("basket")) || []
};

const authSlice = createSlice({
    name: "auth",
    initialState: authInitState,
    reducers: {
        setToken: (state, action) => {
            const token = action.payload.accessToken;
            const decoded = jwtDecode(token);
            const roles = decoded.roles || "";

            state.token = token;
            state.roles = roles;
            state.isUserLoggdin = true;

            localStorage.setItem("token", token);
            localStorage.setItem("roles", roles);
        },
        setBasket: (state, action) => {
            state.basket = action.payload;
            localStorage.setItem("basket", JSON.stringify(action.payload));
        },
        clearToken: (state) => {
            state.token = "";
            state.roles = "";
            state.basket = [];
            state.isUserLoggdin = false;

            localStorage.removeItem("token");
            localStorage.removeItem("roles");
            localStorage.removeItem("basket");
        }
    }
});

export const { setToken, clearToken, setBasket } = authSlice.actions;
export default authSlice.reducer;