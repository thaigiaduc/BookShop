import api from "./api";

const serviceForManageAuthor = {
    getAuthorAdmin: () => {
        const url = "/api/admin/ManageAuthor";
        return api.get(url);
    },

    insertAuthor: (object) => {
        const url ="/api/admin/ManageAuthor/create";
        return api.post(url,object);
    },

    getDetails: (id) => {
        const url = `/api/admin/ManageAuthor/details/${id}`;
        return api.get(url);
    },

    updateAuthor: (object,id) => {
        const url = `/api/admin/ManageAuthor/update/${id}`;
        return api.post(url,object);
    }
}

export default serviceForManageAuthor;