import React, { useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import './shop.scss';
import Image from '../../../assets';
import { Col } from 'react-bootstrap';
import serviceForShop from '../../Services/serviceForShop';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { Dropdown } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import { SettingOutlined, CloseOutlined, PlusOutlined, UploadOutlined, SearchOutlined } from '@ant-design/icons';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
const Shop = () => {
    const Navigate = useNavigate();
    const [total, setTotal] = useState(0);
    const [finalPage, setFinalPage] = useState(0);
    const [from, setFrom] = useState(0);
    const [to, setTo] = useState(0);
    const [allBooks, setAllBooks] = useState([]);
    const [allAuthors, setAllAuthors] = useState([]);
    const [allCategories, setAllCategories] = useState([]);
    const [allPublishers, setAllPublishers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showing, setShowing] = useState({});
    const [filter, setFilter] = useState({
        sort: 1,
        page: 1,
        limit: 15,
        search: '',
    });
    const sortby = {
        1: 'On Sale',
        2: 'Popularity',
        3: 'Price: low to high',
        4: 'Price: high to low',
    };
    const limit = {
        5: '5',
        15: '15',
        20: '20',
        25: '25',
    };

    useEffect(() => {
        const fetchDataShop = async () => {
            try {
                const resultBooks = await serviceForShop.getBookShop(queryString.stringify(filter));
                const allBooks = resultBooks.data;
                const total = resultBooks.meta.total;
                const finalPage = resultBooks.meta.last_page;
                const from = resultBooks.meta.from;
                const to = resultBooks.meta.to;

                setAllBooks(allBooks);

                setFinalPage(finalPage);
                setFrom(from);
                setTo(to);
                setTotal(total);
            } catch (error) {
                console.log(error);
            }
        };
        fetchDataShop();
    }, [filter]);
    useEffect(() => {
        const fetchFilterList = async () => {
            try {
                const resultAuthors = await serviceForShop.getAuthor();
                const resultCategories = await serviceForShop.getCategory();
                const resultPublishers = await serviceForShop.getPublisher();
                const allAuthors = resultAuthors.data;
                const allCategories = resultCategories.data;
                const allPublishers = resultPublishers.data;
                setAllCategories(allCategories);
                setAllAuthors(allAuthors);
                setAllPublishers(allPublishers);
            } catch (error) {
                console.log(error);
            }
        };
        fetchFilterList();
    }, []);

    const handleshowing = () => {
        let string = '';
        let flag = 0;
        Object.keys(showing).forEach((key) => {
            if (flag == 1) string += '| ';
            string += key + ':' + showing[key] + '  ';
            flag = 1;
        });
        return string;
    };
    const handlesorting = (sortby) => {
        setFilter({
            ...filter,
            sort: sortby,
            page: 1,
        });
        setCurrentPage(1);
    };

    const handlelimit = (limit) => {
        setFilter({
            ...filter,
            limit: limit,
        });
    };

    const handlepage = (page) => {
        page += 1;
        setCurrentPage(page);
        setFilter({
            ...filter,
            page: page,
        });
        window.scrollTo(0, 0);
    };

    const handleFilter = (value, name, key) => {
        switch (key) {
            case 1:
                if (filter.category != value) {
                    setFilter({
                        ...filter,
                        category: value,
                        page: 1,
                    });
                    setShowing({
                        ...showing,
                        category: name,
                    });
                } else {
                    delete filter['category'];
                    setFilter({ ...filter });
                    delete showing['category'];
                }
                break;
            case 2:
                if (filter.author != value) {
                    setFilter({
                        ...filter,
                        author: value,
                        page: 1,
                    });
                    setShowing({
                        ...showing,
                        author: name,
                    });
                } else {
                    delete filter['author'];
                    setFilter({ ...filter });
                    delete showing['author'];
                }
                break;
            case 3:
                if (filter.rating != value) {
                    setFilter({
                        ...filter,
                        rating: value,
                        page: 1,
                    });
                    setShowing({
                        ...showing,
                        rating: name,
                    });
                } else {
                    delete filter['rating'];
                    setFilter({ ...filter });
                    delete showing['rating'];
                }
                break;
            case 4:
                if (filter.publisher != value) {
                    setFilter({
                        ...filter,
                        publisher: value,
                        page: 1,
                    });
                    setShowing({
                        ...showing,
                        publisher: name,
                    });
                } else {
                    delete filter['publisher'];
                    setFilter({ ...filter });
                    delete showing['publisher'];
                }
                break;
            default:
                break;
        }
        setCurrentPage(1);
    };

    function handleSearch(e) {
        e.preventDefault();
        const se = document.getElementById('search').value;
        console.log(se);
        setFilter({
            ...filter,
            search: se,
        });
    }
    return (
        <section className="shop-page flex-grow-1">
            <div className="container" style={{ marginBottom: '200px' }}>
                <div className="row">
                    <div className="col">
                        <div className="title-page">
                            <p>
                                Books <span>(Filtered by {handleshowing()})</span>
                            </p>
                        </div>
                    </div>
                    <div className="col">
                        <div
                            style={{
                                padding: '2rem 0',
                                display: 'flex',
                                justifyContent: 'end',
                            }}
                        >
                            <Form.Group as={Row} className="mb-3" controlId="search">
                                <Form.Label column sm="2">
                                    Search:
                                </Form.Label>
                                <Col sm="10">
                                    <InputGroup className="mb-3">
                                        <Form.Control placeholder="Search..." />
                                        <Button
                                            variant="outline-secondary"
                                            onClick={(e) => handleSearch(e)}
                                            style={{
                                                alignItems: 'center',
                                                display: 'flex',
                                            }}
                                        >
                                            <SearchOutlined />
                                        </Button>
                                    </InputGroup>
                                </Col>
                            </Form.Group>
                        </div>
                    </div>
                </div>

                <div className="book-list">
                    <div className="row">
                        <div className="col-lg-3">
                            <p className="bl-filter">Filter by</p>

                            <div className="bl-main-filter">
                                <Accordion>
                                    {/*
                        <!-- Category --> */}
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header className="pt-1 pb-1">
                                            <h5>Category</h5>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            {allCategories.map((category) => {
                                                return (
                                                    <div
                                                        key={category.id}
                                                        className={
                                                            showing['category'] == category.category_name
                                                                ? 'filter__body__active px-3 pt-2 pb-2'
                                                                : 'filter__body px-3 pt-2 pb-2'
                                                        }
                                                        onClick={() => handleFilter(category.id, category.category_name, 1)}
                                                    >
                                                        {category.category_name}
                                                    </div>
                                                );
                                            })}
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    {/*
                        <!-- Author --> */}
                                    <Accordion.Item eventKey="1">
                                        <Accordion.Header className="pt-1 pb-1">
                                            <h5>Author</h5>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            {allAuthors.map((author) => {
                                                return (
                                                    <div
                                                        key={author.id}
                                                        className={
                                                            showing['author'] == author.author_name
                                                                ? 'filter__body__active px-3 pt-2 pb-2'
                                                                : 'filter__body px-3 pt-2 pb-2'
                                                        }
                                                        onClick={() => handleFilter(author.id, author.author_name, 2)}
                                                    >
                                                        {author.author_name}
                                                    </div>
                                                );
                                            })}
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    {/*
                        <!-- Publisher --> */}
                                    <Accordion.Item eventKey="2">
                                        <Accordion.Header className="pt-1 pb-1">
                                            <h5>Publisher</h5>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            {allPublishers.map((publisher) => {
                                                return (
                                                    <div
                                                        className={
                                                            showing['publisher'] == publisher.publisher_name
                                                                ? 'filter__body__active px-3 pt-2 pb-2'
                                                                : 'filter__body px-3 pt-2 pb-2'
                                                        }
                                                        onClick={() => handleFilter(publisher.id, publisher.publisher_name, 4)}
                                                    >
                                                        {publisher.publisher_name}
                                                    </div>
                                                );
                                            })}
                                        </Accordion.Body>
                                    </Accordion.Item>

                                    {/* 
                        <!-- Rating --> */}
                                    <Accordion.Item eventKey="3">
                                        <Accordion.Header className="pt-1 pb-1">
                                            <h5>Rating</h5>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div
                                                className={
                                                    showing['rating'] == 1 ? 'filter__body__active px-3 pt-2 pb-2' : 'filter__body px-3 pt-2 pb-2'
                                                }
                                                onClick={() => handleFilter(1, 1, 3)}
                                            >
                                                1 Star
                                            </div>
                                            <div
                                                className={
                                                    showing['rating'] == 2 ? 'filter__body__active px-3 pt-2 pb-2' : 'filter__body px-3 pt-2 pb-2'
                                                }
                                                onClick={() => handleFilter(2, 2, 3)}
                                            >
                                                2 Star
                                            </div>
                                            <div
                                                className={
                                                    showing['rating'] == 3 ? 'filter__body__active px-3 pt-2 pb-2' : 'filter__body px-3 pt-2 pb-2'
                                                }
                                                onClick={() => handleFilter(3, 3, 3)}
                                            >
                                                3 Star
                                            </div>
                                            <div
                                                className={
                                                    showing['rating'] == 4 ? 'filter__body__active px-3 pt-2 pb-2' : 'filter__body px-3 pt-2 pb-2'
                                                }
                                                onClick={() => handleFilter(4, 4, 3)}
                                            >
                                                4 Star
                                            </div>
                                            <div
                                                className={
                                                    showing['rating'] == 5 ? 'filter__body__active px-3 pt-2 pb-2' : 'filter__body px-3 pt-2 pb-2'
                                                }
                                                onClick={() => handleFilter(5, 5, 3)}
                                            >
                                                5 Star
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        </div>

                        <div className="col-lg-9">
                            <div className="row mb-4">
                                <div className="col-lg-6">
                                    <p className="bl-showing font-14px">
                                        {total > 0 ? 'showing ' + from + '-' + to + ' of ' + total : 'showing ' + 0 + '-' + 0 + ' of ' + total}
                                    </p>
                                </div>
                                <div className="col-lg-6 d-flex justify-content-end">
                                    <div className="row">
                                        <Col xs lg={1} style={{ width: 'auto' }}>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="secondary">Sort By {sortby[filter.sort]}</Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => handlesorting(1)} eventKey="1">
                                                        Sort By On Sale
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handlesorting(2)} eventKey="2">
                                                        Sort By Popularity
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handlesorting(3)} eventKey="3">
                                                        Sort By Price: low to high
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handlesorting(4)} eventKey="4">
                                                        Sort By Price: high to low
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                        <Col xs lg={1}>
                                            <Dropdown>
                                                <Dropdown.Toggle variant="secondary">Show {limit[filter.limit]}</Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => handlelimit(5)} eventKey="1">
                                                        5
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handlelimit(15)} eventKey="2">
                                                        15
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handlelimit(20)} eventKey="3">
                                                        20
                                                    </Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handlelimit(25)} eventKey="4">
                                                        25
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </Col>
                                    </div>
                                </div>
                            </div>

                            <div id="mainRow" className="row">
                                {allBooks.map((book) => {
                                    return (
                                        <div
                                            className="col-lg-3 col-md-4 col-sm-6 padding-0"
                                            style={{
                                                height: 480,
                                                position: 'relative',
                                            }}
                                            key={book.id}
                                        >
                                            <div
                                                className="item"
                                                onClick={() => {
                                                    Navigate(`/shop/${book.id}`);
                                                }}
                                                style={{ padding: '5%' }}
                                            >
                                                <div
                                                    style={{
                                                        paddingTop: '10%',
                                                        paddingLeft: '15%',
                                                        paddingRight: '15%',
                                                    }}
                                                >
                                                    <img
                                                        className="card-img-top img-fluid"
                                                        src={book.book_cover_photo ? Image[book.book_cover_photo] : Image['defaultBook']}
                                                        alt="Books"
                                                        style={{
                                                            height: '290px',
                                                        }}
                                                    />
                                                </div>
                                                <div className="product-loop-info">
                                                    <div className=" h6 text-lh-md product-mb-2 text-height-2 crop-text-2 name-height">
                                                        <a href={`/shop/${book.id}`}>
                                                            <h6>{book.book_title} </h6>
                                                        </a>
                                                    </div>
                                                    <div className="name-author-product">{book.author_name}</div>
                                                    <div className="product-price">
                                                        <div
                                                            style={{
                                                                fontWeight: 400,
                                                            }}
                                                        >
                                                            <strike>{book.book_price != book.finalprice ? '$' + book.book_price : ''}</strike>{' '}
                                                        </div>
                                                        <div
                                                            style={{
                                                                marginLeft: '0.4rem',
                                                            }}
                                                        >
                                                            ${book.final_price}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="product-hover">
                                                    <div
                                                        style={{
                                                            marginRight: '30%',
                                                        }}
                                                        className="pointer add-to-cart-text"
                                                    >
                                                        <a href={`/shop/${book.id}`}>Select Option</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="row mt-4">
                                <div className="col-12 d-flex justify-content-center">
                                    {
                                        <ReactPaginate
                                            breakLabel="..."
                                            nextLabel="Next >"
                                            pageClassName={'page-item'}
                                            pageLinkClassName={'page-link'}
                                            previousClassName={'page-item'}
                                            previousLinkClassName={'page-link'}
                                            nextClassName={'page-item'}
                                            nextLinkClassName={'page-link'}
                                            breakClassName={'page-item'}
                                            breakLinkClassName={'page-link'}
                                            containerClassName={'pagination'}
                                            activeClassName={'active'}
                                            previousLabel="< Previous"
                                            prevPageRel="null"
                                            onPageChange={(event) => {
                                                handlepage(event.selected);
                                            }}
                                            pageRangeDisplayed={3}
                                            pageCount={finalPage}
                                            forcePage={parseInt(currentPage) - 1}
                                            renderOnZeroPageCount={null}
                                        />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Shop;
