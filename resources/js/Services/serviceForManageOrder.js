import api from "./api";

const serviceForManageOrder = {
    getOrderAdmin: () => {
        const url = "/api/admin/order";
        return api.get(url);
    },
    
    getOrderDetail: (id) => {
        const url = "/api/order/detail/"+id;
        return api.get(url);
    },

    updateOrderStatus: (id, value) => {
        const url = "/api/order/update/status";
        const data = {
            id: id,
            order_status: value,
        }
        console.log(data);
        return api.post(url,data);
    },

}

export default serviceForManageOrder;