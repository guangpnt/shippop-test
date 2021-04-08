import { useState, useEffect } from 'react';
import './Register.css'
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";

export default function Register() {
    const [errState, setErrState] = useState(false);
    const [successState, setSuccessState] = useState(false);
    const user = localStorage.getItem('user')
    const { register, formState: { errors }, handleSubmit } = useForm();
    let err_msg = "Email has already exists."
    let success_msg = "Register successful."
    
    const onSubmit = e => {
        axios.post('https://shippop-test-server.herokuapp.com/user/register', {
            email: e.email,
            password: e.password
        }).then(res=> {
            if (res.data.err) {
                setErrState(true);
                setInterval(() => {
                    setErrState(false);
                }, 2000);
                return
            }
            if (res.data.success) {
                window.location.href = '/user/login'
            }
        }).catch(err => {
            console.error(err)
        })
    }

    if (user) {
        return <Redirect to="/"/>
    } else {
        return (
            <div className="register">
                <div className="title">Register</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Email :</label><br/>
                    <input type="email" {...register('email', {required: true})}/><br/>
                    <p className="err-msg">{errors.email && "Email is required."}</p>
                    <label>Password :</label><br/>
                    <input type="password" {...register('password', {required: true})}/><br/>
                    <p className="err-msg">{errors.password && "Password is required."}</p>
                    <div className="group-btn">
                        <button className="login-btn" type="submit">Register</button>
                        <button className="cancel-btn" type="reset">cancel</button>
                    </div>
                </form>
                <a href="/user/login">login now</a>
                <div className={errState ? "err-status active" : "err-status"}>
                    {err_msg}
                </div>
                <div className={successState ? "success-status active" : "success-status"}>
                    {success_msg}
                </div>
            </div>
        )
    }

}