import './Navbar.css'
import { AiOutlineSearch } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { BiUser } from 'react-icons/bi';
import cover from '../images/cover.jpg'
import { useState, useEffect } from 'react';

export default function Navbar(props) {

    const [goods, setGoods] = useState([])
    const [basketState, setBasketState] = useState(false)
    const user = localStorage.getItem('user')
    const basket = JSON.parse(localStorage.getItem('goods'));
    let userPic
    let totalPrice = 0
    let totalGoods = 0  

    console.log(props.goods)

    useEffect(() => {
        localStorage.setItem('goods', JSON.stringify(goods))
    }, [goods])

    useEffect(() => {
        if (props.goods != undefined) {
            setGoods([...goods, props.goods])
        }
    }, [props.goods])

    function openBasket() {
        setBasketState(!basketState)
    }

    goods.forEach(item => {
        totalPrice = totalPrice + (item.price * item.amount)
        totalGoods = totalGoods + item.amount
    })

    if (user) {
        userPic = user.charAt(0)
    } else {
        userPic = ""
    }

    return (
        <>
            <div className="navbar">
                <a href="/" className="logo">
                    <h1>Book</h1>
                </a>
                <div className="items">
                    <a href="/top-sell-book" className="item">
                        สินค้าขายดี
                </a>
                    <a href="/recommend-book" className="item">
                        สินค้าแนะนำ
                </a>
                    <a href="/book" className="item">
                        สินค้าทั้งหมด
                </a>
                </div>
                <div className="option">
                    <div className="search">
                        <AiOutlineSearch />
                    </div>
                    <div onClick={openBasket} className="cart">
                        <FiShoppingCart />
                    </div>
                    {user ?
                        <a href="/user/profile" className="profile-info">{userPic}</a>
                        :
                        <a href="/user/login" className="profile-login"><BiUser /></a>
                    }
                </div>
            </div>
            <div className={basketState ? "cart-popup active" : "cart-popup"}>
                <div className="title">ตะกร้าของฉัน</div>
                <div className="goods-amount">{totalGoods} สินค้าในตะกร้า</div>
                <div onClick={() => {
                    window.location.href = '/user/basket'
                }} className="edit-basket">ดูหรือแก้ไขตะกร้าของฉัน</div>
                <div className="border" />
                {
                    goods.map((value, index) => {
                        return (
                            <div key={index}>
                                <div className="basket-item">
                                    <div className="amount">{value.amount} x</div>
                                    <img src={cover} />
                                    <div className="name">{value.name}</div>
                                </div>
                            </div>
                        )

                    })
                }
                <div className="border" />
                <div className="total">ยอดรวม : <span>{totalPrice}</span></div>
                <div onClick={() => {
                    window.location.href = '/user/payment'
                }} className="payment-link">ไปชำระเงิน</div>
            </div>
            <div className={basketState ? "cart-popup-arrow active" : "cart-popup-arrow"}>
                <div className="cart-popup-inner-arrow"></div>
            </div>
        </>
    );
}