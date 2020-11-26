import React, { useState } from 'react'
import './ItemDisplay.css'
const ItemDisplay = () => {
    const [isActive, setIsActive] = useState('men')
    const handleNavClick = (active) => {
        setIsActive(active)
    }

    return (
        <div className='wrapper'>
            <div className='showcase'>
                <div className='showcase__tab'>
                    <div onClick={() => handleNavClick('men')} className={`showcase__tab__in ${isActive === 'men' ? 'tabActive' : '' }`}>
                        Men's Clothing
                    </div>
                    <div onClick={() => handleNavClick('jew')} className={`showcase__tab__in ${isActive === 'jew' ? 'tabActive' : '' }`}>
                        Jewelery
                    </div>
                    <div onClick={() => handleNavClick('elec')} className={`showcase__tab__in ${isActive === 'elec' ? 'tabActive' : '' }`}>
                        Electronics
                    </div>
                    <div onClick={() => handleNavClick('women')} className={`showcase__tab__in ${isActive === 'women' ? 'tabActive' : '' }`}>
                        Women's Clothing
                    </div>
                </div>
                <div className='showcase__display'>
                    <p>Herschel Supply Co. Heritage</p>
                    <div>
                        <div className='showcase__image'>
                            <img/>
                        </div>
                        <div>
                            <p>$59.99</p>
                            <button>ADD TO CART</button>
                        </div>
                    </div>
                </div>
                <div>
                    <p>Other Products</p>
                    <div></div>
                </div>
            </div>
            <div className='cart'>
                <div>Shopping Cart <span>2</span></div>

            </div>
        </div>
    )
}

export default ItemDisplay
