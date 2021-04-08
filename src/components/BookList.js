import { useState, useEffect } from 'react';
import './BookList.css'
import ReactStars from "react-rating-stars-component";
import { AiFillCheckCircle } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';
import cover from '../images/cover.jpg'
import axios from 'axios';

export default function BookList(props) {
    const { title, more, status, path } = props;
    const [books, setBooks] = useState([])

    useEffect(() => {
        axios.get('https://shippop-test-server.herokuapp.com/', {
            params: {
                status: status
            }
        }).then(res => {
            setBooks(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <div className="book-list">
            <div className="header">
                <h2>{title}</h2>
                <a href={path}>{more}</a>
            </div>
            <div className="books">
                {
                    books.map((value, index) => {
                        if (value.showStatus == true) {
                            return (
                                <a onClick={() => {
                                    window.location.href=`/book/${value._id}`
                                }} key={index} className="book">
                                    <div className="status">
                                        <AiFillCheckCircle />
                                        <div className="title">มีสินค้า</div>
                                    </div>
                                    <img src={cover} />
                                    <div className="add-cart">
                                        <div className="cart-icon"><FiShoppingCart /></div>
                                        <div className="cart-title">Add To Cart</div>
                                    </div>
                                    <div className="rating">
                                        <ReactStars count={5} size={16} />
                                        <div className="review">
                                            score {value.score}
                                        </div>
                                    </div>
                                    <div className="name">{value.name}</div>
                                    <div className="price-discount">THB{value.price}</div>
                                    <div className="price">THB{parseInt(value.price, 10) - parseInt(value.discount, 10)}</div>
                                </a>
                            )
                        }
                    })
                }
            </div>
            <div className="left-scroll">
                <div className="left-arrow">
                    <IoIosArrowBack />
                </div>
            </div>
            <div className="right-scroll">
                <div className="right-arrow">
                    <IoIosArrowForward />
                </div>
            </div>
        </div>
    )
}