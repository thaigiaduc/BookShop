import api from "./api";

const serviceForProfile = {
    getUserDetail: () => {
        const url = "api/home/onsale";
        return api.get(url);
    },


    getOrder: () => {
        const url = "/api/order";
        return api.get(url);
    },


    getOrderDetail: (id) => {
        const url = "/api/order/detail"+id;
        return api.get(url);
    },
}

export default serviceForProfile;