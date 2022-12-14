import api from "./api";

const serviceForManageCategory = {
    getCategoryAdmin: (params) => {
        const url = "/api/admin/ManageCategory";
        return api.get(url, {params});
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
    },

    deleteCategory: (id) => {
        const url = `/api/admin/ManageCategory/delete/${id}`;
        return api.post(url);
    }
}

export default serviceForManageCategory;