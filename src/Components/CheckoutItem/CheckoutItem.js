import React from 'react'
import './CheckoutItem.css'

const CheckoutItem = ({product}) => {
    const { title, image, price, quantity } = product;
    return (
        <div className='cart-item'>
        <div style={{ backgroundImage: `url(${image})`, backgroundSize: 'cover' }} className='for-picture'></div>
        <div  style={{width: '30%'}}>
          <div style={{width: '95%'}}>{title}</div>
        </div>
        <div className='the-quantity'>
          <span onClick={() => console.log('cartItem')} className='mod-item'>
            {' '}
            -{' '}
          </span>
          <span className='quantity'>{quantity}</span>
          <span onClick={() => console.log('cartItem')} className='mod-item'>
            {' '}
            +{' '}
          </span>
        </div>
        <div className='price'>${price}</div>
        <div onClick={() => console.log('cartItem')} className='mod-item cancel'>
          x
        </div>
      </div>
      )
}

export default CheckoutItem