import "./home.css";
import serviceForHome from "../../Services/serviceForHome";
import { Button, Carousel, Col, Row } from "react-bootstrap";
import Image from "../../../assets";
import defaultBookCover from "../../../assets/bookcover/defaultbook.png";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import { useNavigate } from "react-router-dom";
import "swiper/css/navigation";
import slide01 from "../../../images/slide-book-01.jpg";
import "swiper/css";
import "./slide.css";

const Home = () => {
    const Navigate = useNavigate();
    const [onSaleBooks, setOnSaleBooks] = useState([]);
    const [recommendedBooks, setRecommendedBooks] = useState([]);
    const [popularBooks, setPopularBooks] = useState([]);
    const [defaultBooks, setDefaultBooks] = useState([]);
    const [recommended, setRecommended] = useState(true);
    useEffect(() => {
        const fetchProductList = async () => {
            const onSaleBooks = await serviceForHome.getBookOnSale();
            const recommendedBooks = await serviceForHome.getBookRecommended();
            const popularBooks = await serviceForHome.getBookPopular();
            setOnSaleBooks(onSaleBooks);
            setRecommendedBooks(recommendedBooks);
            setPopularBooks(popularBooks);
            setDefaultBooks(recommendedBooks);
        };
        fetchProductList();
    }, []);
    const recommendedBookClick = () => {
        setDefaultBooks(recommendedBooks);
        setRecommended(true);
    };
    const popularBookClick = () => {
        setDefaultBooks(popularBooks);
        setRecommended(false);
    };

    return (
        <section className="home-page flex-grow-1">
            <Carousel>
                <Carousel.Item>
                    <img
                        className="shadow"
                        style={{ width: "100%", height: "700px" }}
                        src={slide01}
                    ></img>
                    <Row
                        className="banner-message slider-middle"
                        style={{ width: "100%" }}
                    >
                        <Col xs={5}>
                            <div className="slider-text fade-it-up">
                                Feature of the book
                            </div>
                            <div className="slider-more fade-it-left">
                                See now
                            </div>
                        </Col>
                        <Col xs={6} className="fade-it-right">
                            <img
                                src="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/img1-12.png"
                                style={{ width: "100%" }}
                                alt=""
                            />
                        </Col>
                    </Row>
                </Carousel.Item>
            </Carousel>
            <div className="container" style={{ marginBottom: "200px" }}>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                    className="mb-4 mt-5"
                >
                    <div className="home-title-type">OnSale Books</div>
                    <Link to="/shop">
                        <div>View All</div>
                    </Link>
                </div>
                <Swiper
                    spaceBetween={50}
                    slidesPerView={4}
                    navigation={true}
                    loop={true}
                    loopFillGroupWithBlank={true}
                    modules={[Autoplay, Navigation]}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                >
                    {onSaleBooks.map((book, idx) => {
                        return (
                            <SwiperSlide key={idx} className="carousel">
                                <div
                                    className="item"
                                    onClick={() => {
                                        Navigate(`/shop/${book.id}`);
                                    }}
                                    style={{ padding: "5%" }}
                                >
                                    <div
                                        style={{
                                            paddingTop: "5%",
                                            paddingLeft: "10%",
                                            paddingRight: "10%",
                                        }}
                                    >
                                        <img
                                            className="card-img-top img-fluid"
                                            src={
                                                book.book_cover_photo
                                                    ? Image[
                                                          book.book_cover_photo
                                                      ]
                                                    : Image["defaultBook"]
                                            }
                                            alt="Books"
                                            style={{ height: "280px" }}
                                        />
                                    </div>
                                    <div className="product-loop-info">
                                        <div className=" h6 text-lh-md product-mb-2 text-height-2 crop-text-2 name-height">
                                            <a href={`/shop/${book.id}`}>
                                                <h6>{book.book_title} </h6>
                                            </a>
                                        </div>
                                        <div className="name-author-product">
                                            {book.author_name}
                                        </div>
                                        <div className="product-price">
                                            <div style={{ fontWeight: 400 }}>
                                                <strike>
                                                    {book.book_price !=
                                                    book.finalprice
                                                        ? "$" + book.book_price
                                                        : ""}
                                                </strike>{" "}
                                            </div>
                                            <div
                                                style={{ marginLeft: "0.4rem" }}
                                            >
                                                ${book.finalprice}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="product-hover">
                                        <div
                                            style={{ marginRight: "30%" }}
                                            className="pointer add-to-cart-text"
                                        >
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
                <div className="book-list">
                    <div className="mb-4">
                        <div className="home-title-type text-center">
                            Featured Books
                        </div>
                    </div>
                    <ul
                        className="mb-5"
                        style={{
                            display: "flex",
                            listStyle: "none",
                            paddingRight: "2rem",
                            justifyContent: "center",
                        }}
                    >
                        <div className="mb-4">
                            <Button
                                variant={recommended ? "secondary" : "light"}
                                onClick={recommendedBookClick}
                                className="mx-3"
                            >
                                Recommended
                            </Button>

                            <Button
                                variant={recommended ? "light" : "secondary"}
                                onClick={popularBookClick}
                                className="mx-3"
                            >
                                Popular
                            </Button>
                        </div>
                    </ul>

                    <Row id="mainRow">
                        {defaultBooks.map((book) => {
                            return (
                                <div
                                    className="col-lg-3 col-md-4 col-sm-6 mb-4 align-items-stretch"
                                    onClick={() => {
                                        Navigate(`/shop/${book.id}`);
                                    }}
                                    key={book.id}
                                    style={{ position: "relative" }}
                                >
                                    <div
                                        className="item"
                                        onClick={() => {
                                            Navigate(`/shop/${book.id}`);
                                        }}
                                        style={{ padding: "5%" }}
                                    >
                                        <div
                                            style={{
                                                paddingTop: "5%",
                                                paddingLeft: "10%",
                                                paddingRight: "10%",
                                            }}
                                        >
                                            <img
                                                className="card-img-top img-fluid"
                                                src={
                                                    book.book_cover_photo
                                                        ? Image[
                                                              book
                                                                  .book_cover_photo
                                                          ]
                                                        : Image["defaultBook"]
                                                }
                                                alt="Books"
                                                style={{ height: "280px" }}
                                            />
                                        </div>
                                        <div className="product-loop-info">
                                            <div className=" h6 text-lh-md product-mb-2 text-height-2 crop-text-2 name-height">
                                                <a href={`/shop/${book.id}`}>
                                                    <h6>{book.book_title} </h6>
                                                </a>
                                            </div>
                                            <div className="name-author-product">
                                                {book.author_name}
                                            </div>
                                            <div className="product-price">
                                                <div
                                                    style={{ fontWeight: 400 }}
                                                >
                                                    <strike>
                                                        {book.book_price !=
                                                        book.finalprice
                                                            ? "$" +
                                                              book.book_price
                                                            : ""}
                                                    </strike>{" "}
                                                </div>
                                                <div
                                                    style={{
                                                        marginLeft: "0.4rem",
                                                    }}
                                                >
                                                    ${book.finalprice}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="product-hover">
                                            <div
                                                style={{ marginRight: "30%" }}
                                                className="pointer add-to-cart-text"
                                            >
                                                <a href={`/shop/${book.id}`}>
                                                    Select Option
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </Row>
                </div>
            </div>
        </section>
    );
};
export default Home;
