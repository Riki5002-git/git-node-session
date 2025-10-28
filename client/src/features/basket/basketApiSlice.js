import apiSlice from "../../app/apiSlice";

const BasketApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        addProdToBasket: build.mutation({
            query: ({ barCode, token }) => ({
                url: "api/product/addProdToBasket",
                method: "PUT",
                body: { barCode },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }),
        deleteProdFromBasket: build.mutation({
            query: ({ barCode, token }) => ({
                url: "api/product/deleteProdFromBasket",
                method: "DELETE",
                body: { barCode },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }),
        plusProdToBasket: build.mutation({
            query: ({ barCode, token }) => ({
                url: "api/product/plusProdToBasket",
                method: "PUT",
                body: { barCode },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }),
        minusProdFromBasket: build.mutation({
            query: ({ barCode, token }) => ({
                url: "api/product/minusProdFromBasket",
                method: "PUT",
                body: { barCode },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }),
        viewBasket: build.query({
            query: (token) => ({
                url: "api/product/veiwBasket",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }),
        deleteBasket: build.mutation({
            query: (token) => ({
                url: "api/product/deleteBasket",
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        }),
    })
})

export const { useAddProdToBasketMutation, useDeleteProdFromBasketMutation, usePlusProdToBasketMutation, useMinusProdFromBasketMutation, useViewBasketQuery, useDeleteBasketMutation } = BasketApiSlice;