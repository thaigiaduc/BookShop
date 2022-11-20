import api from "./api";

const serviceForLogin = {
   login: (data) => {
        const url = "/api/session";
        console.log(data);
        return api.post(url,data);
   },
   logout: () =>{
        const url = "/api/session";
        return api.delete(url);
   },
   register: (data) => {
     const url = "/api/user/create";
     return api.post(url,data);
   }
}

export default serviceForLogin;