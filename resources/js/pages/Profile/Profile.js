import './profile.css';
import React,{ useEffect,useState } from 'react';
import {Col} from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import Error404 from '../404/404';
import { Route } from "react-router";
import serviceForProfile from '../../Services/serviceForProfile';
import ChangePassword from './ChangePassword';
const Profile = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [userDetail, setUserDetail] = useState({});
    const [edit,setEdit] = useState(false);
    const [isShow, setIsShow] = useState(false);
    useEffect(() => {
        const fetchProfileData = async ()=> {
            const userLogin = sessionStorage.getItem('userLogin');
            if(userLogin){
                setIsLogin(true);
                const userDetail = await serviceForProfile.getUserDetail();
                setUserDetail(userDetail);
            }
        }
       fetchProfileData()
    }, []);
    const handleChangeField = (value,key) => {
        setEdit(true);
        switch(key){
            case 1:{
                setUserDetail({
                    ...userDetail,
                    first_name: value
                });
                break;
            }
            case 2:{
                setUserDetail({
                    ...userDetail,
                    last_name: value
                });
                break;
            }
            case 3:{
                setUserDetail({
                    ...userDetail,
                    phone: value
                });
                break;
            }
            case 4:{
                setUserDetail({
                    ...userDetail,
                    address: value
                });
                break;
            }
            default: break;
        }
    }
    const handleSubmitEdit = async () => {
        if(edit){
            try{
                const result = serviceForProfile.editUserDetail(userDetail);
                alert("edit success");
            }
            catch(error){
                console.log(error);
            }
        }
    }
    const handleEditPassword = async () => {
        if(!isShow) await setIsShow(true);
        else{
            
            await setIsShow(false);
            await setIsShow(true);
        }
    }
    return (
        <section>
        { isLogin ? 
                (
                    <div className="row" style={{marginBottom: '500px'}}>
                        <ChangePassword show={isShow} onHide={() => setIsShow(false)} />
                    <Col>
                    <div className="px-3">
                          <input
                            type="submit"
                            className="cursor-pointer mt-3 px-3 bg-primary rounded border-primary"
                            value="Change password"
                            onClick={handleEditPassword}
                          />
                    </div>
                    <div className="col-xxl-8 mb-5 mb-xxl-0">
						<div className="bg-secondary-soft px-4 py-5 rounded">
							<div className="row g-3">
								<h4 className="mb-4 mt-0">User detail</h4>
								<div className="col-md-6">
									<label className="form-label">First Name </label>
									<input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="" 
                                    aria-label="First name" 
                                    onChange={(e) => handleChangeField(e.target.value,1)}
                                    value={userDetail.first_name} 
                                    />
								</div>
								<div className="col-md-6">
									<label className="form-label">Last Name </label>
									<input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="" 
                                    aria-label="Last name" 
                                    onChange={(e) => handleChangeField(e.target.value,2)}
                                    value={userDetail.last_name} 
                                    />
								</div>
								<div className="col-md-6">
									<label className="form-label">Phone number </label>
									<input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="" 
                                    aria-label="Phone number" 
                                    onChange={(e) => handleChangeField(e.target.value,3)}
                                    value={userDetail.phone} 
                                    />
								</div>
								<div className="col-md-6">
									<label className="form-label">Address</label>
									<input 
                                    type="text" 
                                    className="form-control" 
                                    placeholder="" 
                                    aria-label="address"
                                    onChange={(e) => handleChangeField(e.target.value,4)}
                                    value={userDetail.address} 
                                    />
								</div>
                                <div classNameName="px-3">
                                    <input
                                        type="submit"
                                        className="cursor-pointer mt-3 px-3 bg-primary rounded border-primary"
                                        value="Edit Profile"
                                        onClick={() => handleSubmitEdit()}
                                    />
                                </div>
							</div> 
                        </div>
                        </div>
                  </Col>
                  </div>
            ):(
                <Error404 />
            )}
        </section>
    );
}
export default Profile;