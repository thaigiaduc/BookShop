import "./header.css";
import {Link, NavLink} from 'react-router-dom';
import Login from "../../../pages/Login/Login";
import serviceForLogin from "../../../Services/serviceForLogin";
import {useEffect, useState} from 'react';
import {NavDropdown} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Header(){
    const [isLogin, setIsLogin] = useState(false);
    const [fullname, setFullname] = useState('');
    const [cartAmount, setcartAmount] = useState(0);
    useEffect(() => {
        const userLogin = sessionStorage.getItem('userLogin');
        if(userLogin){
            setIsLogin(true);
            setFullname(userLogin);
        }

    }, []);
    useEffect(() => {
        if(sessionStorage.getItem('item_cart'))
        setcartAmount(Object.keys(JSON.parse(sessionStorage.getItem('item_cart'))).length);
    }, []);
    const handleLogout = () => {
        const signOut = async () => {
            try {
                const response = await serviceForLogin.logout();
                    sessionStorage.removeItem('userLogin');
                    sessionStorage.removeItem('token');
                    sessionStorage.removeItem('isLogin');
                    setIsLogin(false);
                    setFullname('');
                    navigate('/');
            } catch (error) {
                console.log(error);
            }
        }
        signOut();
    }
    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
            <Container fluid>
                <NavLink className="navbar-brand" to="/">Logo</NavLink>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="justify-content-end flex-grow-1 pe-3">
                    <NavLink className={({ isActive }) =>
                        isActive ? 'activeClass' : 'bg-red-500 font-thin nav-link'
                    } to="/">Home</NavLink>

                    <NavLink className={({ isActive }) =>
                        isActive ? 'activeClass' : 'bg-red-500 font-thin nav-link'
                    } to="/shop">Shop</NavLink>

                    <NavLink className={({ isActive }) =>
                        isActive ? 'activeClass' : 'bg-red-500 font-thin nav-link'
                    } to="/about">About</NavLink>

                    <NavLink className={({ isActive }) =>
                        isActive ? 'activeClass' : 'bg-red-500 font-thin nav-link'
                    } to="/cart">Cart({cartAmount})</NavLink>

                    {
                                isLogin ?
                                <>
                                    <NavDropdown title={fullname} id="collasible-nav-dropdown">
                                        <NavDropdown.Item><NavLink className={'text-center nav-link'} to="/order">Order</NavLink></NavDropdown.Item>
                                        <NavDropdown.Item><NavLink className={'text-center nav-link'} to="/profile">Profile</NavLink></NavDropdown.Item>
                                        <NavDropdown.Item onClick={() => handleLogout()} className={'text-center'}>Logout</NavDropdown.Item>
                                    </NavDropdown>
                                </>
                                :
                                <NavLink className="nav-link"><Login  text={'SignIn'}/></NavLink>
                    }
                </Nav>         
                </Navbar.Collapse>
            </Container>
        </Navbar> 
    );
}

export default Header;