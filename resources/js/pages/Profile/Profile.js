import './profile.css';
import React,{ useEffect,useState } from 'react';
import {Col} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Error404 from '../404/404';
import { Route } from "react-router";

const Profile = () => {
    const [isLogin,setIsLogin] = useState(false);
    useEffect(() => {
        const userLogin = sessionStorage.getItem('userLogin');
        if(userLogin){
            setIsLogin(true);
        }

    }, []);
    return (
        <section>
        { isLogin ? 
                (
                    <Col>
                    <div className="px-3">
                          <input
                            type="submit"
                            class="cursor-pointer mt-3 px-3 bg-primary rounded border-primary"
                            value="Change password"
                            // onClick={submitEditpassword}
                          />
                    </div>
                    <div className="w-2/4 h-fit">
                      <div className="w-full">
                          <label className="py-2"></label>
                          <div>
                            <input
                              type="text"
                              placeholder="Nhập đầy đủ họ tên"
                              className="px-2 py-2 outline-none rounded-md w-full focus:outline-indigo-400"
                              value={'...'}
                            //   onChange={(e) => setEditName(e.target.value)}
                            />
                            <small className="text-blue-600">{"hello"}</small>
                          </div>

                          <label className="py-2">Họ và tên</label>
                          <div>
                            <input
                              type="text"
                              placeholder="Nhập đầy đủ họ tên"
                              className="px-2 py-2 outline-none rounded-md w-full focus:outline-indigo-400"
                              value={'...'}
                            //   onChange={(e) => setEditName(e.target.value)}
                            />
                            <small className="text-blue-600">{"hello"}</small>
                          </div>

                          <label className="py-2">Số điện thoại </label>
                          <div>
                            <input
                              type="text"
                              placeholder="Nhập số điện thoại"
                              className="px-2 py-2 outline-none rounded-md w-full focus:outline-indigo-400"
                              value={"..."}
                            //   onChange={(e) => setEditPhone(e.target.value)}
                            />
                            <small className="text-blue-600">{"hello"}</small>
                          </div>
            
                          <label className="py-2">Địa chỉ </label>
                          <div>
                            <input
                              type="text"
                              placeholder="Nhập địa chỉ"
                              className="px-2 py-2 outline-none rounded-md w-full focus:outline-indigo-400"
                              value={"..."}
                            //   onChange={(e) => setEditAddress(e.target.value)}
                            />
                            <small className="text-blue-600">{}</small>
                          </div>
                          <input
                            type="submit"
                            class="cursor-pointer mt-5 px-7 py-3 mb-4"
                            value="Lưu thông tin"
                            // onClick={submitEdit}
                          />
                      </div>
                    </div>
                  </Col>
            ):(
                <Error404 />
            )}
        </section>
    );
}
export default Profile;