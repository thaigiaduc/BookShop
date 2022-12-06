import api from "./api";

const servicesForOrder = {
    getOrder: () => {
        const url = "/api/showorder";
        return api.get(url);
    },

    getOrderDetail: (id) => {
        const url = "/api/order/detail/"+id;
        return api.get(url);
    },
}

export default servicesForOrder;