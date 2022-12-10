import './login.scss';
import { Modal, Container } from 'react-bootstrap';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link, Alert, CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import LockIcon from '@mui/icons-material/Lock';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import serviceForLogin from '../../Services/serviceForLogin';
function Login(props) {
    const [isShow, setIsShow] = useState(false);
    const [isShowRegister, setIsShowRegister] = useState(false);
    const show = props.show || false;
    const paperStyle = { padding: 20, height: '55vh', width: '100%' };
    const avatarStyle = { backgroundColor: '#1bbd7e' };
    const btnstyle = { margin: '8px 0', marginTop: '20px', height: '45px' };
    useEffect(() => {
        const showModal = async () => {
            setIsShow(show);
        };
        showModal();
    }, [show]);
    const schema = yup
        .object()
        .shape({
            email: yup.string().email().required(),
            password: yup.string().required(),
            confirmPassword: yup
                .string()
                .required()
                .oneOf([yup.ref('password')], 'Passwords does not match'),
            address: yup.string().required(),
            phone: yup.string().required().min(10).max(10),
            first_name: yup.string().required(),
            last_name: yup.string().required(),
        })
        .required();
    const schema2 = yup
        .object()
        .shape({
            email: yup.string().email().required(),
            password: yup.string().required(),
        })
        .required();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(isShowRegister ? schema : schema2),
    });
    const onSubmit = (data) => {
        console.log(data);
        if (!isShowRegister) {
            const signIn = async () => {
                try {
                    const response = await serviceForLogin.login(data);
                    console.log(response.access_token);
                    console.log(response);
                    if (response.role == 1) {
                        sessionStorage.setItem('userLogin', response.last_name + ' ' + response.first_name);
                        sessionStorage.setItem('token', response.access_token);
                        sessionStorage.setItem('isLogin', true);
                        setIsShow(false);
                        window.location.reload();
                    } else {
                        sessionStorage.setItem('adminLogin', response.last_name + ' ' + response.first_name);
                        sessionStorage.setItem('token', response.access_token);
                        sessionStorage.setItem('adminIsLogin', true);
                        setIsShow(false);
                        window.location = '/admin';
                    }
                } catch (error) {
                    if (error.response.status === 422) {
                        alert(error.response.data);
                    }
                    if (error.response.status === 401) {
                        alert(error.response.data);
                    }
                }
            };
            signIn();
        } else {
            const signUp = async () => {
                try {
                    const response = await serviceForLogin.register(data);
                    setIsShowRegister(false);
                    alert('sign up success');
                } catch (error) {
                    if (error.response.status === 422) {
                        alert(error.response.data);
                    }
                    if (error.response.status === 401) {
                        alert(error.response.data);
                    }
                }
            };
            signUp();
        }
    };

    const handleClosedModal = () => {
        setIsShow(false);
        setIsShowRegister(false);
    };

    return (
        <React.Fragment>
            <span onClick={() => setIsShow(true)}>{props.text}</span>

            <Modal show={isShow} onHide={handleClosedModal} className="modal-login">
                {isShowRegister ? (
                    <>
                        <Modal.Header closeButton>
                            <Modal.Title>Sign Up</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form style={{ padding: '20px 20px 0 20px' }} className="input">
                                <div className="row">
                                    <div className="form-group w-50">
                                        <label htmlFor="first_name">First Name</label>
                                        <input {...register('first_name')} className="form-control" />
                                        <small className="form-text text-danger">{errors.first_name?.message}</small>
                                    </div>
                                    <div className="form-group w-50">
                                        <label htmlFor="last_name">Last Name</label>
                                        <input {...register('last_name')} className="form-control" />
                                        <small className="form-text text-danger">{errors.last_name?.message}</small>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <input {...register('address')} className="form-control" />
                                    <small className="form-text text-danger">{errors.address?.message}</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Phone</label>
                                    <input {...register('phone')} className="form-control" />
                                    <small className="form-text text-danger">{errors.phone?.message}</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email address</label>
                                    <input {...register('email')} type="email" className="form-control" />
                                    <small className="form-text text-danger">{errors.email?.message}</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input {...register('password')} type="password" className="form-control" />
                                    <small className="form-text text-danger">{errors.password?.message}</small>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Confirm Password</label>
                                    <input {...register('confirmPassword')} type="password" className="form-control" />
                                    <small className="form-text text-danger">{errors.confirmPassword?.message}</small>
                                </div>
                                <Button type="submit" onClick={handleSubmit(onSubmit)} color="primary" variant="contained" style={btnstyle} fullWidth>
                                    Sign up
                                </Button>
                            </form>
                            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', paddingBottom: '10px' }}>
                                <Typography>
                                    Back to<Button onClick={() => setIsShowRegister(false)}>Sign In</Button>
                                </Typography>
                            </div>
                        </Modal.Body>
                    </>
                ) : (
                    <>
                        <Modal.Body>
                            <Paper elevation={10} style={paperStyle} className="d_flex_center">
                                <Avatar style={avatarStyle}>
                                    <LockIcon />
                                </Avatar>
                                <h2>Sign In</h2>
                                <form className="input">
                                    <TextField
                                        className="input_item"
                                        label="Username"
                                        name="email"
                                        type="email"
                                        placeholder="Enter username"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        {...register('email')}
                                    />
                                    <small className="form-text text-danger">{errors.email?.message}</small>
                                    <TextField
                                        className="input_item"
                                        label="Password"
                                        name="password"
                                        placeholder="Enter password"
                                        type="password"
                                        variant="outlined"
                                        fullWidth
                                        required
                                        {...register('password')}
                                    />
                                    <small className="form-text text-danger">{errors.password?.message}</small>
                                    <Button
                                        type="submit"
                                        onClick={handleSubmit(onSubmit)}
                                        color="primary"
                                        variant="contained"
                                        style={btnstyle}
                                        fullWidth
                                    >
                                        Sign in
                                    </Button>
                                </form>
                                {/* {authSate.error && <Alert severity="error">{authSate.error}</Alert>} */}

                                <Typography>
                                    Do you have an account ?<Button onClick={() => setIsShowRegister(true)}>Sign Up</Button>
                                </Typography>
                            </Paper>
                        </Modal.Body>
                    </>
                )}
            </Modal>
        </React.Fragment>
    );
}
export default Login;
