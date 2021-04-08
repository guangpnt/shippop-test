import './Carousel.css'
import { IoIosArrowBack } from 'react-icons/io';
import { IoIosArrowForward } from 'react-icons/io';


export default function Carousel() {
    return (
        <div className="carousel-container">
            <div className="carousel">
                <div className="left-scroll">
                    <div className="left-arrow">
                        <IoIosArrowBack/>   
                    </div>
                </div>
                <div className="right-scroll">
                    <div className="right-arrow">
                        <IoIosArrowForward/>                
                    </div>
                </div>
            </div>
        </div>
    )
}