import api from "./api";

const serviceForManageOrder = {
    getOrderAdmin: () => {
        const url = "api/admin/order";
        return api.get(url);
    },
    
    getOrderDetail: (id) => {
        const url = "/api/order/detail"+id;
        return api.get(url);
    },

    updateOrderStatus: (data) => {
        const url = "/api/author";
        return api.patch(url,data);
    },

}

export default serviceForManageOrder;