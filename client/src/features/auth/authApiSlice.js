import { apiSlice } from "../../app/apiSlice";

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        registerFunc: build.mutation({
            query: (registerUser) => ({
                url: "api/user/register",
                method: "POST",
                body: registerUser,
            }),
        }),
        loginFunc: build.mutation({
            query: (loginUser) => ({
                url: "/api/user/logIn",
                method: "POST",
                body: loginUser,
            }),
        }),
    }),
});

export const { useRegisterFuncMutation, useLoginFuncMutation } = authApiSlice;