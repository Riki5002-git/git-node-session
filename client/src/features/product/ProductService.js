export const ProductService = {
    getProductsData() {
        return fetch("http://localhost:2500/api/product/veiwAll")
            .then(res => res.json());
    },

    getProductsMini() {
        return this.getProductsData().then(data => data.slice(0, 5));
    },

    getProductsSmall(token) {
        return fetch("http://localhost:2500/api/product/veiwBasket", {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then(res => res.json())
            .then(data => data.basket || []);
    },

    getProducts() {
        return this.getProductsData();
    },

    getProductsWithOrdersSmall() {
        return this.getProductsWithOrdersData().then(data => data.slice(0, 10));
    },

    getProductsWithOrders() {
        return this.getProductsWithOrdersData();
    },

    getProductsWithOrdersData() {
        return Promise.resolve([]);
    }
};