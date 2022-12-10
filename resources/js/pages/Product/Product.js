import './product.scss';
import Image from '../../../assets';
import serviceForProduct from '../../Services/serviceForProduct';
import { Routes, Route, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AddIcon from '@mui/icons-material/Add';

import BookReview from './bookReview';
import { IconButton, TextField, Button } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import { makeStyles } from '@material-ui/core';

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
const Product = () => {
    const classes = useStyles();
    const { id } = useParams();
    const [bookDetail, setBookDetail] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [showAddToCart, setShowAddToCart] = useState(true);
    const [minMaxQuantity, setminMaxQuantity] = useState({
        min: 1,
        max: 8,
    });
    const schema = yup
        .object()
        .shape({
            review_title: yup.string().required(),
            review_details: yup.string().required(),
            rating_start: yup.number().required(),
        })
        .required();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    });
    useEffect(() => {
        const fetchBookDetail = async () => {
            const bookDetail = await serviceForProduct.getBook(id);
            if (sessionStorage.getItem('item_cart') != null) {
                let flag = 0;
                const items = JSON.parse(sessionStorage.getItem('item_cart'));
                items.map((item) => {
                    if (item.id == id) {
                        setminMaxQuantity({
                            ...minMaxQuantity,
                            max: bookDetail['quantity'] - item.quantity > 1 ? bookDetail['quantity'] - item.quantity : 1,
                        });
                        flag = 1;
                    }
                });
                if (flag == 0)
                    setminMaxQuantity({
                        ...minMaxQuantity,
                        max: bookDetail['quantity'],
                    });
            } else
                setminMaxQuantity({
                    ...minMaxQuantity,
                    max: bookDetail['quantity'],
                });

            if (bookDetail.quantity > 0) setShowAddToCart(true);
            else setShowAddToCart(false);
            setBookDetail(bookDetail);
        };
        fetchBookDetail();
    }, []);

    const handleAddToCart = () => {
        const dataCart = {
            id: bookDetail.id,
            quantity: quantity,
            book: bookDetail,
        };
        let items = [];
        if (sessionStorage.getItem('item_cart') != null) {
            let flag = 0;
            items = JSON.parse(sessionStorage.getItem('item_cart'));
            items.map((item) => {
                if (item.id == id) {
                    if (item.quantity + dataCart.quantity <= bookDetail['quantity']) item.quantity += dataCart.quantity;
                    flag = 1;
                }
            });
            if (flag == 0) items.push(dataCart);
        } else items.push(dataCart);
        alert('Add to Cart sucess');
        sessionStorage.setItem('item_cart', JSON.stringify(items));
        window.location.reload();
    };

    const onSubmit = (data) => {
        const newdata = {
            book_id: id,
            ...data,
        };
        console.log(review);
        const submitReview = async () => {
            try {
                const result = await serviceForProduct.submitReview(newdata);
                result.book_id == id && alert('submit review success');
                setTimeout(function () {
                    window.location.reload();
                }, 5000);
            } catch (error) {
                if (error.response.status === 422) {
                    for (const key in error.response.data.errors) {
                        if (Object.hasOwnProperty.call(error.response.data.errors, key)) {
                            const element = error.response.data.errors[key];
                            alert(element[0]);
                        }
                    }
                }
            }
        };
        submitReview();
    };
    return (
        <section className="detail-page flex-grow-1">
            <div className="container" style={{ marginBottom: '200px' }}>
                <div>
                    <div className="row">
                        <Col xs={12} md={8} lg={8} className="detail__colitem mb-2">
                            <div className="mt-5 pb-3 ">
                                <Row className="product-detail-body pt-3">
                                    <Col xs="5">
                                        <img src={bookDetail.book_cover_photo ? Image[bookDetail.book_cover_photo] : Image['defaultBook']} alt="" />
                                    </Col>
                                    <Col xs="7" className="pe-5">
                                        <div className="pt-2 ps-4">
                                            <h2>{bookDetail.book_title}</h2>
                                        </div>
                                        <div className="mt-3 ps-4">By (author) {bookDetail.author_name}</div>

                                        <div className="mt-3 ps-4">{bookDetail.book_summary}</div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col className="pt-5 pb-5">
                            <Card>
                                <Card.Header className="detail__card__header px-4">
                                    {bookDetail.book_price === bookDetail.final_price ? (
                                        <div className="detail__card__price">
                                            <span className="detail__card__price__finalprice">${bookDetail.final_price}</span>
                                        </div>
                                    ) : (
                                        <div className="detail__card__price">
                                            <span className="detail__card__price__bookprice">${bookDetail.book_price}</span>
                                            <span className="detail__card__price__finalprice">${bookDetail.final_price}</span>
                                        </div>
                                    )}
                                </Card.Header>
                                <Card.Body className="detail__card__body px-4 my-4">
                                    <div className="mb-2">Quantity</div>
                                    <TextField
                                        id="standard-name"
                                        value={quantity}
                                        InputProps={{
                                            startAdornment:
                                                quantity === minMaxQuantity.min ? (
                                                    <IconButton
                                                        sx={{ borderRadius: 0 }}
                                                        edge="start"
                                                        onClick={() => handleRemoveQuantity(item.book.id)}
                                                        disabled
                                                    >
                                                        <RemoveIcon sx={{ stroke: '#ffffff', strokeWidth: 1 }} />
                                                    </IconButton>
                                                ) : (
                                                    <IconButton sx={{ borderRadius: 0 }} edge="start" onClick={() => setQuantity(quantity - 1)}>
                                                        <RemoveIcon sx={{ stroke: '#ffffff', strokeWidth: 1 }} />
                                                    </IconButton>
                                                ),
                                            endAdornment:
                                                quantity >= minMaxQuantity.max ? (
                                                    <IconButton
                                                        sx={{ borderRadius: 0 }}
                                                        edge="end"
                                                        onClick={() => handleAddQuantity(item.book.id)}
                                                        disabled
                                                    >
                                                        <AddIcon sx={{ stroke: '#ffffff', strokeWidth: 1 }} />
                                                    </IconButton>
                                                ) : (
                                                    <IconButton sx={{ borderRadius: 0 }} edge="end" onClick={() => setQuantity(quantity + 1)}>
                                                        <AddIcon sx={{ stroke: '#ffffff', strokeWidth: 1 }} />
                                                    </IconButton>
                                                ),
                                        }}
                                        inputProps={{
                                            inputMode: 'numeric',
                                            readOnly: true,
                                            pattern: '[0-9]*',
                                            style: { textAlign: 'center', fontSize: '20px' },
                                        }}
                                        type="number"
                                        className={classes.input}
                                        style={{ width: '100%' }}
                                        // onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        //     handleInput(item.formatId, item.productId, e)
                                        // }
                                    />

                                    {showAddToCart ? (
                                        <div className="detail__card__body__addtocart">
                                            <button onClick={() => handleAddToCart()}>Add to cart</button>
                                        </div>
                                    ) : (
                                        <div className="detail__card__body__addtocart">
                                            <button>Sold Out</button>
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        </Col>
                    </div>
                    <div className="row">
                        <BookReview id={id} />
                        <Col>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Card className="review__form">
                                    <Card.Header>
                                        <h3>Write a review</h3>
                                    </Card.Header>
                                    <Card.Body>
                                        <div className="form-group mb-3">
                                            <label htmlFor="reviewTitle">Add a title</label>
                                            <input id="reviewTitle" {...register('review_title')} className="form-control" />
                                            <span className="text-danger">{errors.review_title?.message}</span>
                                        </div>
                                        <div className="form-group mb-3">
                                            <label htmlFor="review">Detail please! Your review helps other shoppers.</label>
                                            <textarea className="form-control" id="review" rows="3" {...register('review_details')}></textarea>
                                            <span className="text-danger">{errors.review_details?.message}</span>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="rating">Select a rating star</label>
                                            <select className="form-control" id="rating" {...register('rating_start')}>
                                                <option value="1">1 Star</option>
                                                <option value="2">2 Star</option>
                                                <option value="3">3 Star</option>
                                                <option value="4">4 Star</option>
                                                <option value="5">5 Star</option>
                                            </select>
                                        </div>
                                    </Card.Body>
                                    <Card.Footer className="px-5 py-3 detail__card__body__addtocart mt-0">
                                        <button type="submit">Submit Review</button>
                                    </Card.Footer>
                                </Card>
                            </form>
                        </Col>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Product;
