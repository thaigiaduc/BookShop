import api from "./api";

const serviceForManagePublisher = {
    getPublisherAdmin: () => {
        const url = "/api/admin/ManagePublisher";
        return api.get(url);
    },

    insertPublisher: (object) => {
        const url = "/api/admin/ManagePublisher/create";
        return api.post(url,object);
    },

    getDetails: (id) => {
        const url = `/api/admin/ManagePublisher/details/${id}`;
        return api.get(url);
    },

    updatePublisher: (object,id) => {
        const url = `/api/admin/ManagePublisher/update/${id}`;
        return api.post(url,object);
    }
}

export default serviceForManagePublisher;