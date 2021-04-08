import './EditBookPage.css'
import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

export default function EditBookPage() {

    let { id } = useParams()
    const { register, formState: { errors }, handleSubmit, setValue } = useForm();

    useEffect(() => {
        axios.get(`https://shippop-test-server.herokuapp.com/book/${id}`, {})
            .then(res => {
                setValue('name', res.data.name)
                setValue('detail', res.data.detail)
                setValue('price', res.data.price)
                setValue('discount', res.data.discount)
            }).catch(err => {
                console.log(err)
            })
    }, [])

    const onSubmit = e => {
        axios.post(`https://shippop-test-server.herokuapp.com/user/book/edit/${id}`, {
            name: e.name,
            detail: e.detail,
            price: e.price,
            discount: e.discount,
            showStatus: e.showStatus
        }).then(res => {
            console.log(res)
        }).catch(err => {
            console.error(err)
        })
        console.log(e)
        window.location.href = '/user/profile'
    }

    return (
        <div className="edit-book">
            <div className="title">Edit</div>
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
                <select {...register('showStatus')}>
                    <option default value="true">Show</option>
                    <option value="false">Hidden</option>
                </select>
                <button type="submit">Confirm</button>
            </form>
        </div>
    )
}