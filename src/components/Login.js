import { useState } from 'react';
import './Login.css'
import axios from 'axios';
import { Redirect } from 'react-router';
import { useForm } from "react-hook-form";

export default function Login() {

    const [errState, setErrState] = useState(false);
    const user = localStorage.getItem('user')
    const { register, formState: { errors }, handleSubmit } = useForm();
    let err_msg = "Email or Password is incorrect."

    const onSubmit = e => {    
        axios.post('https://shippop-test-server.herokuapp.com/user/login', {
            email: e.email,
            password: e.password
        }).then(res => {
            if (res.data.email) {
                localStorage.setItem('user', res.data.email)
                window.location.href='/'
            } 
            if (res.data.err) {
                setErrState(true);
                setInterval(() => {
                    setErrState(false);
                }, 2000);
                return
            }
            console.log(res.data)
        }).catch(err => {
            console.error(err)
        })
    }

    if (user) {
        return <Redirect to="/"/>
    } else {
        return (
            <div className="login">
                <div className="title">Login</div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label>Email :</label><br/>
                    <input type="email" {...register('email', {required: true})}/><br/>
                    <p className="err-msg">{errors.email && "Email is required."}</p>
                    <label>Password :</label><br/>
                    <input type="password" {...register('password', {required: true})}/><br/>
                    <p className="err-msg">{errors.password && "Password is required."}</p>
                    <div className="group-btn">
                        <button className="login-btn" type="submit">login</button>
                        <button className="cancel-btn" type="reset">cancel</button>
                    </div>
                </form>
                <a href="/user/register">register now</a>
                <div className={errState ? "err-status active" : "err-status"}>
                    {err_msg}
                </div>
            </div>
        )
    }

}