import './CreateUser.scss';
import { Modal, Button, Container } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import serviceForLogin from '../../../Services/serviceForLogin';
function CreateUser(props){
    const [isShow, setIsShow] = useState(false);
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
        role: yup.string().required(),
        }).required();
    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data) => {
        
        const signUp = async () => {
            try {
                const response = await serviceForLogin.register(data);
                    console.log(data);
                    alert("sign up success");
                    window.location.reload();
            } catch (error) {
                console.log(error);
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

return(
        <React.Fragment>
            <span onClick={()=>setIsShow(true)}>{props.text}</span>
            <Modal show={isShow} onHide={() => setIsShow(false)}>
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
                         <input {...register('role')} value={2} type="password" style={{display:'none'}} />
                     </div>
                     <input onClick={handleSubmit(onSubmit)} type="submit" className="signin_button w-100" value="Save" />
                 </form>
             </Modal.Body>
            </Modal>
        </React.Fragment>
);
}
export default CreateUser;