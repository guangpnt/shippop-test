import './Basket.css'
import cover from '../images/cover.jpg'
import { IoIosArrowDown } from 'react-icons/io';
import { IoIosArrowUp } from 'react-icons/io';
import { Redirect } from 'react-router';

export default function Basket() {

    const user = localStorage.getItem('user')

    if (user) {
        return (
            <div className="basket">
                <div className="title">ตะกร้าสินค้า</div>
                <div className="basket-info">
                    <div className="detail">
                        <div className="header">
                            <div className="goods">สินค้า</div>
                            <div className="price">ราคา</div>
                            <div className="amount">จำนวน</div>
                            <div className="total">ยอดรวม</div>
                        </div>
                        <div className="border" />
                        <div className="info">
                            <div className="goods">
                                <img src={cover} />
                                <div className="name">รสชาติของผลไม้ที่ยังไม่สุกงอม</div>
                            </div>
                            <div className="price">THB499.00</div>
                            <div className="amount">
                                <div className="num">1</div>
                                <div className="num-changer">
                                    <IoIosArrowUp />
                                    <IoIosArrowDown />
                                </div>
                            </div>
                            <div className="total">THB499.00</div>
                        </div>
                        <div className="border" />
                        <div className="footer">
                            <div className="continue-btn">ซื้อสินค้าต่อไป</div>
                            <div className="clear-btn">ล้างตระกร้าสินค้า</div>
                        </div>
                    </div>
                    <div className="conclusion">
                        <div className="title">สรุปคำสั่งซื้อ</div>
                        <div className="total">
                            <div className="msg">ยอดรวม</div>
                            <div className="msg">THB499.00</div>
                        </div>
                        <div className="shipping-cost">
                            <div className="msg">ค่าส่ง</div>
                            <div className="msg">THB1.00</div>
                        </div>
                        <div className="border" />
                        <div className="net-amount">
                            <div className="msg">ยอดสุทธิ</div>
                            <div className="msg">THB500.00</div>
                        </div>
                        <div className="btn">ไปชำระเงิน</div>
                    </div>
                </div>
            </div>
        )
    } else {
        return <Redirect to="/user/login"/>
    }
}