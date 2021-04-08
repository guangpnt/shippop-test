import './BookPage.css'
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function BookPage(props) {
    const { status, title } = props
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
        <div className="book-page">
            <div className="title">{title}</div>
            <div className="border"/>
            <div className="book-container">
                {
                    books.map((value, index) => {
                        if (value.showStatus == true) {
                            return (
                                <div className="book-item" key={index} onClick={() => {
                                    window.location.href=`/book/${value._id}`
                                }}>
                                    <div className="name">{value.name}</div>
                                    <div className="price">ราคา : {parseInt(value.price, 10) - parseInt(value.discount, 10)}</div>
                                    <div className="author">ผู้เขียน : {value.author}</div>
                                    <div className="post-by">โพสต์โดย : {value.email}</div>
                                </div>
                            )
                        } 
                    })
                }
            </div>
        </div>
    )
}