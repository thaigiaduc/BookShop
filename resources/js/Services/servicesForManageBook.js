import api from "./api";

const serviceForManageBook = {
    getBookAdmin: () => {
        const url = "api/admin/ManageBook";
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
}

export default serviceForManageBook;