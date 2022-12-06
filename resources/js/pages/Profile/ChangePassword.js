import './ChangePassword.scss';
import { Modal, Button, Container } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import serviceForProfile from '../../Services/serviceForProfile';
function ChangePassword(props){
    const [isShow, setIsShow] = useState(false);
    const show = props.show || false;
    useEffect(() => {
        setIsShow(show);
    }, [show]);
    const schema = yup.object().shape({
        oldPassword: yup.string().required(),
        confirmOldPassword: yup.string().required(),
        newPassword: yup.string().required(),
    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data) => {
        const signIn = async () => {
            try {
                const response = await serviceForProfile.editPasswordUser(data);
                alert("edit success");
            } catch (error) {
                if(error.response.status === 422){
                  console.log(error.response.data);
                }
                if(error.response.status === 401){
                    console.log(error.response.data);
                }
            }
        }
        signIn();
    }
return(
        <React.Fragment>
            <span onClick={()=>setIsShow(true)}>{props.text}</span>
            <Modal show={isShow} onHide={() => setIsShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="oldPassword">Old Password</label>
                            <input {...register('oldPassword')} type="password" className="form-control"/>
                            <small className="form-text text-danger">{errors.password?.message}</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmOldPassword">Confirm Old Password</label>
                            <input {...register('confirmOldPassword')} type="password" className="form-control"/>
                            <small className="form-text text-danger">{errors.password?.message}</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="newPassword">New Password</label>
                            <input {...register('newPassword')} type="password" className="form-control"/>
                            <small className="form-text text-danger">{errors.password?.message}</small>
                        </div>
                        <input onClick={handleSubmit(onSubmit)} type="submit" className="signin_button w-100" value="Sign In" />
                    </form>
                </Modal.Body>
            </Modal>
        </React.Fragment>
);
}
export default ChangePassword;