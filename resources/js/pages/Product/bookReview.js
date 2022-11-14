import "./bookReview.scss";
import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Dropdown, Nav } from "react-bootstrap";
import ReactPaginate from 'react-paginate';
import serviceForProduct from '../../Services/serviceForProduct';
import queryString from 'query-string';
function BookReview({ id }) {
    const [reviews, setReviews] = useState([]);

    const [filterParams, setFilterParams] = useState({
        page: 1,
        limit: 5,
        sortby: 1,
        id: id,
    });

    const [rating, setRating] = useState({
        avg: 0,
        total: 0,
        five: 0,
        four: 0,
        three: 0,
        two: 0,
        one: 0
    });

    const [paginate, setPaginate] = useState({
        total: 0,
        current_page: 1,
        last_page: 1,
        from: 1,
        to: 1
    });

    const sortTypes = {
        "newest": 'date: newest to oldest',
        "oldest": 'date: oldest to newest',
    };

    const showTypes = {
        "5": '5',
        "10": '10',
        "15": '15',
        "20": '20',
    };

    const handlePageClick = (data) => {
        setFilterParams({
            ...filterParams,
            page: data.selected + 1
        });
    };

    const handleSortChange = (sortBy) => {
        setFilterParams({
            ...filterParams,
            sortby: sortBy,
            page: 1
        });
    };

    const handleShowChange = (limit) => {
        setFilterParams({
            ...filterParams,
            limit: limit
        });
    };

    const handleRatingChange = (rating) => {
        setFilterParams({
            ...filterParams,
            rating: rating,
            page: 1
        });
    };

    const convertDate = (dateTypeTimestamp) => {
        const date = new Date(dateTypeTimestamp);
        const day = date.getDate();
        const month = date.toLocaleString('en-us', {month: 'long'});
        const year = date.getFullYear();
        return `${month} ${day}, ${year}`;
    }
    useEffect(() => {
        const fetchRating = async () => {
            try {

                const response = await serviceForProduct.getRating(id);
                let countStarts = response.count_stars.sort((a, b) => parseInt(b.rating_start) - parseInt(a.rating_start));
                let total = countStarts.reduce((sum, item) => {
                    return sum + item.count_rating_start;
                }, 0)
                const data = {
                    avg: response.rating_avg,
                    total: total,
                    five: countStarts[0].count_rating_start,
                    four: countStarts[1].count_rating_start,
                    three: countStarts[2].count_rating_start,
                    two: countStarts[3].count_rating_start,
                    one: countStarts[4].count_rating_start,
                }
                setRating(data);
            } catch (error) {
                // 
            }
        };
        fetchRating();
    }, []);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await serviceForProduct.getReview(queryString.stringify(filterParams));
                setReviews(response.data);
                setPaginate({
                    current_page: response.meta.current_page,
                    last_page: response.meta.last_page,
                    total: response.meta.total,
                    from: response.meta.from,
                    to: response.meta.to
                });
            }
            catch (error) {
                console.log("Failed to fetch book reviews: ", error);
            }
        };
        fetchReviews();
    }, [filterParams]);

    return (
        <React.Fragment>
                <Col xs={12} md={8} lg={8} className="detail__colitem mb-2">
                    {
                        reviews.length === 0 ? (
                            <Card className="reviews">
                                <Card.Body className="reviews__body">
                                    <div className="review__empty">
                                        <p>There are no reviews yet.</p>
                                    </div>
                                </Card.Body>
                            </Card>
                        ) : (
                            <Card className="reviews">
                                <Card.Body className="reviews__body">
                                    <div className="reviews__title">
                                        <h5>Customer Reviews</h5>
                                        {
                                            filterParams.rating !== null ? (
                                                <span>(Filter by {filterParams.rating} star)</span>
                                            ) : null
                                        }
                                        
                                    </div>
                                    <Row className="reviews__statistics">
                                        <Col xs={12} md={2} lg={1}>
                                            <h3>{(rating.avg*1.0).toFixed(1)}</h3>
                                            <span className='reviews__statistics__filtertext' onClick={() => handleRatingChange(null)}>({rating.total})</span>
                                        </Col>
                                        <Col xs={12} md={10} lg={11}>
                                            <h3>Star</h3>
                                            <div className='reviews__statistics__filter'>
                                                <span onClick={() => rating.five ? handleRatingChange(5) : null} className='reviews__statistics__filtertext'>5 star ({rating.five})</span><span> | </span>
                                                <span onClick={() => rating.four ? handleRatingChange(4) : null} className='reviews__statistics__filtertext'>4 star ({rating.four})</span><span> | </span>
                                                <span onClick={() => rating.three ? handleRatingChange(3) : null} className='reviews__statistics__filtertext'>3 star ({rating.three})</span><span> | </span>
                                                <span onClick={() => rating.two ? handleRatingChange(2) : null} className='reviews__statistics__filtertext'>2 star ({rating.two})</span><span> | </span>
                                                <span onClick={() => rating.one ? handleRatingChange(1) : null} className='reviews__statistics__filtertext'>1 star ({rating.one})</span>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="reviews__filterbar">
                                        <h6>Showing {paginate.from} - {paginate.to} of {paginate.total} books</h6>
                                        <div className="reviews__filterbar__dropdown">
                                            <Dropdown className="reviews__filterbar__dropdown__sorting">
                                                <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                                                    Sort by {sortTypes[filterParams.sortby]}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => handleSortChange(1)}>Sort by {sortTypes['newest']}</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleSortChange(2)}>Sort by {sortTypes['oldest']}</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                            <Dropdown className="reviews__filterbar__dropdown__showing">
                                                <Dropdown.Toggle variant="secondary" id="dropdown-basic-2">
                                                    Show {filterParams.no_items}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item onClick={() => handleShowChange(5)}>Show {showTypes['5']}</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleShowChange(10)}>Show {showTypes['10']}</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleShowChange(15)}>Show {showTypes['15']}</Dropdown.Item>
                                                    <Dropdown.Item onClick={() => handleShowChange(20)}>Show {showTypes['20']}</Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                    {reviews.map((review, index) => {
                                        return (
                                            <div key={index}>
                                                <h4>
                                                    {review.review_title} <span className="reviews__rating">| {review.rating_start} stars</span>
                                                </h4>
                                                <p className="reviews__content">{review.review_detail}</p>
                                                <p className="reviews__date">{convertDate(review.review_date)}</p>
                                                <hr />
                                            </div>
                                        );
                                    })}

                                    <div className="reviews__pagination">
                                        <ReactPaginate 
                                            previousLabel={'Previous'}
                                            nextLabel={'Next'}
                                            breakLabel={'...'}
                                            pageRangeDisplayed={3}
                                            renderOnZeroPageCount={null}
                                            pageClassName="page-item"
                                            pageLinkClassName="page-link"
                                            previousClassName="page-item"
                                            previousLinkClassName="page-link"
                                            nextClassName="page-item"
                                            nextLinkClassName="page-link"
                                            breakClassName="page-item"
                                            breakLinkClassName="page-link"
                                            containerClassName="pagination"
                                            activeClassName="active"
                                            pageCount={paginate.last_page}
                                            onPageChange={(e) => handlePageClick(e)}
                                            forcePage={paginate.current_page - 1}
                                        />
                                    </div>
                                </Card.Body>
                            </Card>
                        )
                    }

                </Col>
        </React.Fragment>
    ); 
}

export default BookReview;