import api from "./api";

const servicesForOrder = {
    getOrder: () => {
        const url = "/api/admin/order";
        return api.get(url);
    },

    getOrderDetail: (id) => {
        const url = "/api/order/detail/"+id;
        return api.get(url);
    },

    updateOrderStatus: (id) => {
        const url = "/api/order/update/status";
        const data = {
            id: id,
            order_status: 4,
        }
        console.log(data);
        return api.patch(url,data);
    },
}

export default servicesForOrder;