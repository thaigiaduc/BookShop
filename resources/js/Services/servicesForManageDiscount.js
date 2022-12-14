import api from "./api";

const serviceForManageDiscount = {
    getDiscountAdmin: () => {
        const url = "/api/admin/ManageDiscount";
        return api.get(url);
    },

    insertDiscount: (object) => {
        const url ="/api/admin/ManageDiscount/create";
        return api.post(url,object);
    },

    getDetails: (id) => {
        const url = `/api/admin/ManageDiscount/details/${id}`;
        return api.get(url);
    },

    updateDiscount: (object,id) => {
        const url = `/api/admin/ManageDiscount/update/${id}`;
        return api.post(url,object);
    },

    deleteDiscount: (id) => {
        const url = `/api/admin/ManageDiscount/delete/${id}`;
        return api.post(url);
    }
}

export default serviceForManageDiscount;