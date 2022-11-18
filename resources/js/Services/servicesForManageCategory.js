import api from "./api";

const serviceForManageCategory = {
    getCategoryAdmin: () => {
        const url = "api/admin/ManageCategory";
        return api.get(url);
    },

    insertCategory: (object) => {
        const url ="api/admin/ManageCategory/create";
        return api.post(url,object);
    },
}

export default serviceForManageCategory;