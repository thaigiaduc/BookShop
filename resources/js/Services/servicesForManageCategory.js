import api from "./api";

const serviceForManageCategory = {
    getCategoryAdmin: () => {
        const url = "/api/admin/ManageCategory";
        return api.get(url);
    },

    insertCategory: (object) => {
        const url ="/api/admin/ManageCategory/create";
        return api.post(url,object);
    },

    getDetails: (id) => {
        const url = `/api/admin/ManageCategory/details/${id}`;
        return api.get(url);
    },

    updateCategory: (object,id) => {
        const url = `/api/admin/ManageCategory/update/${id}`;
        return api.post(url,object);
    }
}

export default serviceForManageCategory;