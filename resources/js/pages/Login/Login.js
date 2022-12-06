import './login.scss';
import { Modal, Button, Container } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import serviceForLogin from '../../Services/serviceForLogin';
function Login(props){
    const [isShow, setIsShow] = useState(false);
    const [isShowRegister, setIsShowRegister] = useState(false);
    const show = props.show || false;
    useEffect(() => {
        const showModal = async () =>{
            setIsShow(show);
        }
        showModal();
    }, [show]);
    const schema = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
        confirmPassword: yup.string().required().oneOf([yup.ref('password')], 'Passwords does not match'),
        address: yup.string().required(),
        phone: yup.string().required().min(10).max(10),
        first_name: yup.string().required(),
        last_name: yup.string().required(),
       
        }).required();
    const schema2 = yup.object().shape({
        email: yup.string().email().required(),
        password: yup.string().required(),
       
        }).required();
    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(isShowRegister ? schema:schema2)
    });
    const onSubmit = (data) => {
        if(!isShowRegister){
        const signIn = async () => {
            try {
                const response = await serviceForLogin.login(data);
                console.log(response.access_token);
                console.log(response);
                if(response.role==1){
                    sessionStorage.setItem('userLogin', response.last_name+" "+response.first_name);
                    sessionStorage.setItem('token', response.access_token);
                    sessionStorage.setItem('isLogin', true);
                    setIsShow(false);
                    window.location.reload();
                }
                else{
                    sessionStorage.setItem('adminLogin', response.last_name+" "+response.first_name);
                    sessionStorage.setItem('token', response.access_token);
                    sessionStorage.setItem('adminIsLogin', true);
                    setIsShow(false);
                    window.location="/admin";
                }
            } catch (error) {
                if(error.response.status === 422){
                  alert(error.response.data);
                }
                if(error.response.status === 401){
                    alert(error.response.data);
                }
            }
        }
        signIn();
    }
    else{
        const signUp = async () => {
            try {
                const response = await serviceForLogin.register(data);
                    setIsShowRegister(false);
                    alert("sign up success");
            } catch (error) {
                if(error.response.status === 422){
                  alert(error.response.data);
                }
                if(error.response.status === 401){
                    alert(error.response.data);
                }
            }
        }
        signUp();
    }
    }

return(
        <React.Fragment>
            <span onClick={()=>setIsShow(true)}>{props.text}</span>
           
            <Modal show={isShow} onHide={() => setIsShow(false)}>
                 {isShowRegister ?  
                 <>
                 <Modal.Header closeButton>
                 <Modal.Title>Sign Up</Modal.Title>
             </Modal.Header>
             <Modal.Body>
                 <form>
                    <div className="row">
                    <div className="form-group w-50">
                         <label htmlFor="first_name">First Name</label>
                         <input {...register('first_name')}  className="form-control"/>
                         <small className="form-text text-danger">{errors.first_name?.message}</small>
                     </div>
                     <div className="form-group w-50">
                         <label htmlFor="last_name">Last Name</label>
                         <input {...register('last_name')}  className="form-control"/>
                         <small className="form-text text-danger">{errors.last_name?.message}</small>
                     </div>
                     </div>
                      <div className="form-group">
                         <label htmlFor="address">Address</label>
                         <input {...register('address')}  className="form-control"/>
                         <small className="form-text text-danger">{errors.address?.message}</small>
                     </div>
                     <div className="form-group">
                         <label htmlFor="phone">Phone</label>
                         <input {...register('phone')}  className="form-control"/>
                         <small className="form-text text-danger">{errors.phone?.message}</small>
                     </div>
                     <div className="form-group">
                         <label htmlFor="email">Email address</label>
                         <input {...register('email')} type="email" className="form-control"/>
                         <small className="form-text text-danger">{errors.email?.message}</small>
                     </div>
                     <div className="form-group">
                         <label htmlFor="password">Password</label>
                         <input {...register('password')} type="password" className="form-control"/>
                         <small className="form-text text-danger">{errors.password?.message}</small>
                     </div>
                     <div className="form-group">
                         <label htmlFor="password">Confirm Password</label>
                         <input {...register('confirmPassword')} type="password" className="form-control"/>
                         <small className="form-text text-danger">{errors.confirmPassword?.message}</small>
                     </div>
                     <input onClick={handleSubmit(onSubmit)} type="submit" className="signin_button w-100" value="Save" />
                     <input onClick={() => setIsShowRegister(false)} type="submit" className="signin_button w-100" value="Back To Sign In" />
                 </form>
             </Modal.Body>
             </>
             :
             <>
                 <Modal.Header closeButton>
                 <Modal.Title>Sign In</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                 <form>
                     <div className="form-group">
                         <label htmlFor="email">Email address</label>
                         <input {...register('email')} type="email" className="form-control"/>
                         <small className="form-text text-danger">{errors.email?.message}</small>
                     </div>
                     <div className="form-group">
                         <label htmlFor="password">Password</label>
                         <input {...register('password')} type="password" className="form-control"/>
                         <small className="form-text text-danger">{errors.password?.message}</small>
                     </div>
                     <input onClick={handleSubmit(onSubmit)} type="submit" className="signin_button w-50" value="Sign In" />
                     <input onClick={() => setIsShowRegister(true)} type="submit" className="signin_button w-50" value="Sign Up" />
                 </form>
             </Modal.Body>
             </>
                 }
            </Modal>
           
        </React.Fragment>
);
}
export default Login;