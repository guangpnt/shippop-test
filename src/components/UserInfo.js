import { Redirect } from 'react-router';
import './UserInfo.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";

export default function UserInfo() {

    const user = localStorage.getItem('user')
    const [formState, setFormState] = useState(false);
    const [editFormState, setEditFormState] = useState(false);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [books, setBooks] = useState([])

    useEffect(() => {
        axios.get('https://shippop-test-server.herokuapp.com/user/book', {
            params: {
                email: user
            }
        }).then(res => {
            setBooks(res.data)
        }).catch(err => {
            console.err(err)
        })
    }, [])

    const onSubmit = e => {
        axios.post('https://shippop-test-server.herokuapp.com/user/book', {
            name: e.name,
            detail: e.detail,
            price: e.price,
            discount: e.discount,
            author: e.author,
            email: user
        }).then(res => {
            if (res.data.err) {
                console.log('มีแล้ว')
                return
            }
            if (res.data.success) {
                console.log('success')
                return
            }
        }).catch(err => {
            console.error(err)
        })
        console.log(e)
        setFormState(!formState)
        window.location.href = '/user/profile'
    }

    const logout = () => {
        localStorage.removeItem('user');
        window.location.href = '/'
    }

    if (user) {
        return (
            <>
                <div className="user-info">
                    <div className="title">Profile</div>
                    <div className="email">Email : {user}</div>
                    <button onClick={logout}>Logout</button>
                </div>
                <div className="mybook">
                    <div className="header">
                        <div className="title">My Book</div>
                        <div className="add-book-btn" onClick={() => { setFormState(!formState) }}>Add Book</div>
                    </div>
                    <div className="border" />
                    {
                        books.map((value, index) => {
                            return (
                                <div className="book-item" key={index}>
                                    <div>
                                        <div onClick={() => {
                                            window.location.href = `/book/${value._id}`
                                        }} className="name">name : {value.name}</div>
                                        <div>status : {value.showStatus ? "Show" : "Hidden"}</div>
                                        <div>Score : {value.score}</div>
                                    </div>
                                    <div className="group-btn">
                                        <div onClick={() => { window.location.href = `/user/book/edit/${value._id}` }} className="edit-btn">Edit</div>
                                        <div onClick={() => {
                                            axios.get(`https://shippop-test-server.herokuapp.com/user/book/delete/${value._id}`, {})
                                                .then(res => {
                                                    console.log(res)
                                                    window.location.href = '/user/profile'
                                                }).catch(err => {
                                                    console.err(err)
                                                })
                                        }} className="del-btn">Del</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className={formState ? "add-book active" : "add-book"}>
                    <div className="header">
                        <div className="title">Add Book</div>
                        <div className="close-btn" onClick={() => { setFormState(!formState) }}>Close</div>
                    </div>
                    <div className="border" />
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input type="text" placeholder="ชื่อหนังสือ" {...register('name', { required: true })} />
                        <p className="err-msg">{errors.name && "Name is required."}</p>
                        <textarea placeholder="รายละเอียด" {...register('detail', { required: true })} />
                        <p className="err-msg">{errors.detail && "Detail is required."}</p>
                        <input type="number" min="0" placeholder="ราคา (เป็นตัวเลข)" {...register('price', { required: true })} />
                        <p className="err-msg">{errors.price && "Price is required."}</p>
                        <input type="number" min="0" placeholder="ส่วนลด (เป็นตัวเลข)" {...register('discount', { required: true })} />
                        <p className="err-msg">{errors.discount && "Dsicount is required."}</p>
                        <input type="text" placeholder="ชื่อผู้เขียน" {...register('author', { required: true })} />
                        <p className="err-msg">{errors.author && "Author is required."}</p>
                        <button type="submit">Add</button>
                    </form>
                </div>
            </>
        )
    } else {
        return <Redirect to="/user/login" />
    }
}