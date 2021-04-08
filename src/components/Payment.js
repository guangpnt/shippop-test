import './Payment.css'
import { Redirect } from 'react-router';


export default function Payment() {

    const user = localStorage.getItem('user')

    if (user) {
        return (
            <div className="payment">
                <div className="title">ชำระเงิน</div>
                <div className="first-part">
                    <div className="address">
                        <div className="title">ที่อยู่ในการจัดส่ง</div>
                        <div className="border" />
                        <form>
                            <div className="name">
                                <div>
                                    <label>ชื่อ</label><br />
                                    <input></input>
                                </div>
                                <div>
                                    <label>นามสกุล</label><br />
                                    <input></input>
                                </div>
                            </div>
                            <div className="country">
                                <label>ประเทศ</label><br />
                                <input></input>
                            </div>
                            <div className="habitation">
                                <label>ที่อยู่<span>(บ้านเลขที่ / หมู่บ้าน / หมู่ที่ / ซอย / ถนน )</span></label><br />
                                <input></input>
                            </div>
                            <div className="habitation-first-part">
                                <div>
                                    <label>แขวง/ตำบล</label><br />
                                    <input></input>
                                </div>
                                <div>
                                    <label>เขต/อำเภอ</label><br />
                                    <input></input>
                                </div>
                            </div>
                            <div className="habitation-second-part">
                                <div>
                                    <label>จังหวัด</label><br />
                                    <input></input>
                                </div>
                                <div>
                                    <label>รหัสไปรษณีย์</label><br />
                                    <input></input>
                                </div>
                            </div>
                            <div className="tel">
                                <label>เบอร์ติดต่อ (กรุณาระบุหมายเลขโทรศัพท์ เฉพาะตัวเลขเท่านั้น)</label><br />
                                <input></input>
                            </div>
                        </form>
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
                <div className="second-part">
                    <div className="title">เลือกขนส่ง</div>
                    <div className="border" />
                    <form>
                        <div className="free-shipping">
                            <div>
                                <input type="radio" name="shipping" checked />
                                <label>Free Shipping</label>
                            </div>
                            <label>THB0.00</label>
                        </div>
                        <div className="kerry-shipping">
                            <div>
                                <input type="radio" name="shipping" />
                                <label>Free Shipping</label>
                            </div>
                            <label>THB40.00</label>
                        </div>
                    </form>
                </div>
                <div className="third-part">
                    <div className="title">วิธีชำระเงิน</div>
                    <div className="border" />
                    <form>
                        <div className="cash">
                            <input type="radio" name="payment" checked />
                            <label>Cash</label>
                        </div>
                        <div className="debit">
                            <input type="radio" name="payment" />
                            <label>Credit/Debit</label>
                        </div>
                    </form>
                </div>
                <div></div>
            </div>
        )
    } else {
        return <Redirect to="/user/login" />
    }
}