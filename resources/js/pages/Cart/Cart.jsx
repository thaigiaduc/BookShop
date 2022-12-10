import './cart.scss';
import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Image from '../../../assets';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Login from '../Login/Login';
import serviceForCart from '../../Services/serviceForCart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from '@material-ui/core';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { IconButton, Table, TableCell, TableContainer, TableHead, TableBody, TextField, Button } from '@mui/material';
const useStyles = makeStyles({
    input: {
        '& input[type=number]': {
            '-moz-appearance': 'textfield',
        },
        '& input[type=number]::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
        },
        '& input[type=number]::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            margin: 0,
        },
    },
});
function Cart() {
    const classes = useStyles();
    const [cart, setCart] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const [total, setTotal] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [expanded, setExpanded] = useState('panel1');

    const navigate = useNavigate();
    useEffect(() => {
        if (sessionStorage.getItem('item_cart')) {
            setCart(JSON.parse(sessionStorage.getItem('item_cart')));
        }
    }, []);

    useEffect(() => {
        let total = 0;
        let quantity = 0;
        let flag = 0;
        cart.forEach((item) => {
            if (item.book.id != null) {
                total += item.book.final_price * item.quantity;
                quantity += item.quantity;
            } else {
                cart.splice(flag, 1);
                sessionStorage.setItem('item_cart', JSON.stringify(cart));
                window.location.reload();
            }
            flag++;
        });
        setTotal(total);
        setQuantity(quantity);
    }, [cart]);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : 'panel1');
    };

    const handleAddQuantity = (id) => {
        cart.map((item) => {
            if (item.id == id) {
                if (item.quantity < item.book.quantity) item.quantity++;
                sessionStorage.setItem('item_cart', JSON.stringify(cart));
            }
        });
        setCart(JSON.parse(sessionStorage.getItem('item_cart')));
    };
    const removebook = (id) => {
        cart.splice(id, 1);
        sessionStorage.setItem('item_cart', JSON.stringify(cart));
        window.location.reload();
    };
    const handleRemoveQuantity = (id) => {
        let flag = 0;
        cart.map((item) => {
            if (item.id == id) {
                if (item.quantity == 1) {
                    if (confirm('Are you sure to delete this book ?') == true) {
                        cart.splice(flag, 1);
                        sessionStorage.setItem('item_cart', JSON.stringify(cart));
                        window.location.reload();
                    }
                }
                if (item.quantity > 1) item.quantity--;
                sessionStorage.setItem('item_cart', JSON.stringify(cart));
            }
            flag++;
        });
        setCart(JSON.parse(sessionStorage.getItem('item_cart')));
    };

    const handleClick = (book) => {
        navigate(`/shop/${book.id}`);
    };

    const handlePlaceOrder = () => {
        if (!sessionStorage.getItem('isLogin')) {
            setIsShow(true);
        } else {
            if (cart.length === 0) {
                alert('Cart is empty');
            } else {
                let confirm = window.confirm('Are you sure to place order?');
                if (confirm) {
                    const itemOrder = cart.map((item) => {
                        return {
                            book_id: item.id,
                            quantity: item.quantity,
                        };
                    });
                    const order = async () => {
                        try {
                            const response = await serviceForCart.createOrder({ itemOrder: itemOrder });
                            sessionStorage.removeItem('item_cart');
                            setCart([]);
                            toast.success('Success', {
                                position: 'top-right',
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: false,
                                draggable: true,
                                progress: undefined,
                            });
                            setTimeout(function () {
                                window.location.reload();
                            }, 5000);
                            console.log(response);
                        } catch (error) {
                            if (error.response.status === 422) {
                                console.log(error.response);
                                let listIdBook = [];
                                if (error.response.data.errors.book_id) {
                                    error.response.data.errors.book_id.forEach((item) => {
                                        if (item[0].includes('book_id')) {
                                            const itemId = item[0].split('.')[1];
                                            //
                                            listIdBook.push(itemId);
                                        }
                                    });
                                } else {
                                    const itemId = error.response.data.errors.split('.')[1];
                                    listIdBook.push(itemId);
                                    console.log(itemId);
                                }
                                // console.log(error.response);
                                if (listIdBook) {
                                    listIdBook.map((id) => {
                                        removebook(id);
                                    });
                                    toast.error('error', {
                                        position: 'top-right',
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: false,
                                        draggable: true,
                                        progress: undefined,
                                    });
                                }
                            }
                        }
                    };
                    order();
                }
            }
        }
    };

    return (
        <section className="cart-page flex-grow-1">
            <div className="container" style={{ marginBottom: '500px' }}>
                <div className="title-section">
                    <p className="title-page font-22px">
                        Your cart: {Object.keys(cart).length > 1 ? Object.keys(cart).length + ' items' : Object.keys(cart).length + ' item'}
                    </p>
                </div>

                <div>
                    <div className="row">
                        <Login show={isShow} onHide={() => setIsShow(false)} />
                        <Col>
                            <TableContainer component={Paper} sx={{ maxHeight: '40rem' }}>
                                <Table sx={{ width: '100%' }} aria-label="customized table">
                                    <TableHead style={{ backgroundColor: 'rgba(228, 228, 228, 0.781)' }}>
                                        <TableRow>
                                            <TableCell>Product</TableCell>
                                            <TableCell align="left">Price</TableCell>
                                            <TableCell align="left">Quantity</TableCell>
                                            <TableCell align="left">Total</TableCell>
                                            <TableCell align="left"></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {cart.map((item, index) => (
                                            <TableRow key={index} className="pt-3 pb-5" style={{ height: '13rem' }}>
                                                <TableCell component="th" scope="row">
                                                    <div className="d-flex align-item-center">
                                                        <img
                                                            style={{ maxWidth: '27%' }}
                                                            src={
                                                                item.book.book_cover_photo ? Image[item.book.book_cover_photo] : Image['defaultBook']
                                                            }
                                                            alt=""
                                                        />
                                                        <div className="ms-3">{item.book.book_title}</div>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="left">
                                                    {item.book.book_price === item.book.final_price ? (
                                                        <h6>${item.book.final_price}</h6>
                                                    ) : (
                                                        <>
                                                            <div>${item.book.final_price}</div>
                                                            <strike>${item.book.book_price}</strike>
                                                        </>
                                                    )}
                                                </TableCell>
                                                <TableCell align="left">
                                                    <TextField
                                                        id="standard-name"
                                                        value={item.quantity}
                                                        InputProps={{
                                                            startAdornment: (
                                                                <IconButton
                                                                    sx={{ borderRadius: 0 }}
                                                                    edge="start"
                                                                    onClick={() => handleRemoveQuantity(item.book.id)}
                                                                >
                                                                    <RemoveIcon sx={{ stroke: '#ffffff', strokeWidth: 1 }} />
                                                                </IconButton>
                                                            ),
                                                            endAdornment: (
                                                                <IconButton
                                                                    sx={{ borderRadius: 0 }}
                                                                    edge="end"
                                                                    onClick={() => handleAddQuantity(item.book.id)}
                                                                >
                                                                    <AddIcon sx={{ stroke: '#ffffff', strokeWidth: 1 }} />
                                                                </IconButton>
                                                            ),
                                                        }}
                                                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', readOnly: true }}
                                                        type="number"
                                                        className={classes.input}
                                                        style={{ width: '6.5rem' }}
                                                        // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                        //     handleInput(item.formatId, item.productId, e)
                                                        // }
                                                    />
                                                </TableCell>
                                                <TableCell align="left">${(item.book.final_price * item.quantity).toFixed(2)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <ToastContainer />
                        </Col>
                        <Col lg={4}>
                            <div>
                                <Accordion
                                    expanded={expanded === 'panel1'}
                                    onChange={handleChange('panel1')}
                                    disableGutters={true}
                                    defaultExpanded={true}
                                >
                                    <AccordionSummary
                                        expandIcon={expanded === 'panel1' ? <RemoveIcon /> : <AddIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <h5 className="px-3 pt-2 pb-2">
                                            <div>Cart Totals</div>
                                        </h5>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className="px-3  d-flex" style={{ justifyContent: 'space-between' }}>
                                            <div>Quantity</div>
                                            {quantity}
                                        </div>
                                    </AccordionDetails>
                                    <AccordionDetails>
                                        <div className="px-3  d-flex" style={{ justifyContent: 'space-between' }}>
                                            <div>Total</div>${total.toFixed(2)}
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} disableGutters={true}>
                                    <AccordionSummary
                                        expandIcon={expanded === 'panel2' ? <RemoveIcon /> : <AddIcon />}
                                        aria-controls="panel2a-content"
                                        id="panel2a-header"
                                    >
                                        <h5 className="px-3 pt-2 pb-2">
                                            <div>Coupon</div>
                                        </h5>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <div className="p-4" style={{ textAlign: 'center' }}>
                                            <h5>Coming soon</h5>
                                        </div>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                            <div className="mt-4 cart__checkput">
                                <Button
                                    variant="contained"
                                    className="border-btn-black btn-bg-black btn-proceed pt-3 pb-3"
                                    onClick={handlePlaceOrder}
                                >
                                    Proceed to checkout
                                </Button>
                            </div>
                        </Col>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Cart;
