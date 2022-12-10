import api from "./api";

const serviceForManageBook = {
    getBookAdmin: () => {
        const url = "/api/admin/ManageBook";
        return api.get(url);
    },
    
    getCategory: () => {
        const url = "/api/category";
        return api.get(url);
    },

    getAuthor: () => {
        const url = "/api/author";
        return api.get(url);
    },

    getPublisher: () => {
        const url = "/api/publisher";
        return api.get(url);
    },

    insertBook: (object) => {
        const url ="/api/admin/ManageBook/create";
        return api.post(url,object);
    },

    getDetails: (id) => {
        const url = `/api/admin/ManageBook/details/${id}`;
        return api.get(url);
    },

    updateBook: (object,id) => {
        const url = `/api/admin/ManageBook/update/${id}`;
        return api.post(url,object);
    }
}

export default serviceForManageBook;