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
                <>
                </>
            ):(
                <Error404 />
            )}
        </section>
    );
}
export default Profile;