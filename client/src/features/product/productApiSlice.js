import apiSlice from "../../app/apiSlice";

const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        veiwAll: build.query({
            query: (product) => ({
                url: "api/product/veiwAll",
                method: "GET"
            })
        }),
        addProductFunc: build.mutation({
            query: (product) => ({
                url: "api/product/addProduct",
                method: "POST",
                body: product
            })
        }),
        DeleteProductFunc: build.mutation({
            query: (product) => ({
                url: "api/product/deleteProduct",
                method: "DELETE",
                body: product
            })
        }),
        UpdateProductFunc: build.mutation({
            query: (product) => ({
                url: `api/product/updateProduct/${product.barCode}`,
                method: "PUT",
                body: product
            })
        }),
        BigProduct: build.query({
            query: (barCode) => `api/product/bigProduct/${barCode}`
        }),
    }),
});

export const { useAddProductFuncMutation, useDeleteProductFuncMutation, useUpdateProductFuncMutation, useVeiwAllQuery, useBigProductQuery } = productApiSlice;