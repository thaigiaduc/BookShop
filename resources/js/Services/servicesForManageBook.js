import api from "./api";

const serviceForManageBook = {
    getBookAdmin: () => {
        const url = "api/admin/ManageBook";
        return api.get(url);
    },
}

export default serviceForManageBook;