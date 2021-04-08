import './BookDetail.css'
import cover from '../images/cover.jpg'
import backCover from '../images/backCover.jpg'
import emailIcon from '../images/email.svg'
import twitterIcon from '../images/twitter.svg'
import facebookIcon from '../images/facebook.svg'
import googleIcon from '../images/google-plus-logo.svg'
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { AiFillHeart } from 'react-icons/ai';
import axios from 'axios';
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

export default function Book(props) {
    
    let { id } = useParams()
    const [book, setBook] = useState({})
    const [amount, setAmount] = useState(1)

    useEffect(() => {
        axios.get(`https://shippop-test-server.herokuapp.com/book/${id}`, {})
        .then(res => {
            setBook(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <>
            <div className="book-detail">
                <img src={cover}/>
                <div className="spec">
                    <div className="name">
                        {book.name}
                    </div>
                    <div className="detail">
                        ผู้เขียน : {book.author}<br/>
                        ประเภทของสินค้า : Books<br/>
                        บาร์โค้ด : 9786161840488<br/>
                    </div>
                    <div className="price">
                        ราคา
                        &nbsp; 
                        <h1>THB{parseInt(book.price, 10) - parseInt(book.discount, 10)}</h1>
                        &nbsp; 
                        <h3>THB{book.price}</h3>
                    </div>
                    <div className="group-btn">
                        <div className="num-changer">
                            {amount}
                            <div>
                                <IoIosArrowUp className="arr-up" onClick={() => {
                                    if (amount < 10) {
                                        setAmount(amount + 1)
                                    }
                                }}/>
                                <IoIosArrowDown className="arr-down" onClick={() => {
                                    if (amount > 1) {
                                        setAmount(amount - 1)
                                    }
                                }}/>
                            </div>
                        </div>
                        <div onClick={() => props.addGoods({
                            amount: amount,
                            id: book._id,
                            name: book.name,
                            price: parseInt(book.price, 10) - parseInt(book.discount, 10)
                        })} className="add-btn">Add</div>
                        <div className="wishlist-btn">
                            <AiFillHeart className="icon"/>
                            Wishlist
                        </div>
                    </div>
                    <div className="group-share">
                        แชร์ :
                        <span className="email-icon">
                            <img src={emailIcon}/>
                        </span>
                        <span className="twitter-icon">
                            <img src={twitterIcon}/>
                        </span>
                        <span className="facebook-icon">
                            <img src={facebookIcon}/>
                        </span>
                        <span className="google-icon">
                            <img src={googleIcon}/>
                        </span>
                    </div>
                </div>
            </div>
            <div className="book-preview">
                <img src={cover}/>
                <img src={backCover}/>
            </div>
            <div className="book-footer">
                <div className="about">
                    เกี่ยวกับสินค้า
                </div>
                <div className="detail">
                    รายละเอียด
                </div>
            </div>
            <div className="border"/>
            <div className="book-about">
                <span>รายละเอียด</span> : {book.name}<br/><br/>
                <div className="content">
                    {book.detail}
                </div>
            </div>
        </>
    )
}