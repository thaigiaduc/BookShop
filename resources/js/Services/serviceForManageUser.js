import api from "./api";

const serviceForManageUser = {
    getAllUsers: () => {
        const url = "/api/admin/user";
        return api.get(url);
    },
    updateUserStatus: (id, value) => {
        const url = "/api/admin/user/update";
        const data = {
            id: id,
            status: value,
        }
        console.log(url);
        return api.patch(url,data);
    },

}

export default serviceForManageUser;