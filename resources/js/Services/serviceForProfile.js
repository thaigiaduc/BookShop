import api from "./api";

const serviceForProfile = {
    getUserDetail: () => {
        const url = "api/user/detail";
        return api.get(url);
    },

    getOrder: () => {
        const url = "/api/order";
        return api.get(url);
    },
    
    editUserDetail: (data) => {
        const url = '/api/user/update/profile';
        return api.patch(url,data);
    },
    
    editPasswordUser: (data) => {
        const url = '/api/user/update/password'
        console.log(data);
        return api.patch(url,data);
    },
}

export default serviceForProfile;