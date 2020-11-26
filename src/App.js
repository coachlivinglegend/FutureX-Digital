import React, { useEffect, useState } from 'react'
import './App.css';
import StripeButton from './Components/StripeButton/StripeButton';
import { addItemToCart, removeItemFromCart, increaseItemQuantity, decreaseItemQuantity } from './functions'

const App = () => {
  const [products, setProducts] = useState([])
  const [itemsToDisplay, setItemsToDisplay] = useState([])
  const [currentItem, setCurrentItem] = useState({})
  const retCart = localStorage.getItem('fxcart')
  console.log(retCart)
  const retrievedCart = JSON.parse(retCart)
  const [cart, setCart] = useState( retrievedCart || [])
  const totalCartCount = cart.reduce((acc, arr) => acc + arr.quantity, 0)
  const totalCartAmount = cart.reduce((acc, arr) => acc + (Number(Math.round(arr.quantity * arr.price))) , 0)

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => {
      const myArr = []
      data.map(datum => {
        const sampObj = {
          category: datum.category,
          description: datum.description,
          id: datum.id,
          image: datum.image,
          price: datum.price,
          title: datum.title,
          quantity: 0,
        }
        myArr.push(sampObj)
        return myArr
      })
      setProducts(myArr)
    })
  }, [])
  
  useEffect(() => {
    handleNavClick('men clothing')
  }, [products])

  useEffect(() => {
    setCurrentItem(itemsToDisplay[0] || {})
  }, [itemsToDisplay])

  useEffect(() => {
    localStorage.setItem('fxcart', JSON.stringify(cart))
  }, [cart])

    const [isActive, setIsActive] = useState('men clothing')

    const handleNavClick = (active) => {
      setIsActive(active)
      const currentDisplay = products.filter((product) => {
        return product.category === active
      })
      setItemsToDisplay(currentDisplay)
    }  
    return (
        <div className='wrapper'>
            <div className='showcase'>
                <div className='showcase__tab'>
                    <div onClick={() => handleNavClick('men clothing')} className={`showcase__tab__in ${isActive === 'men clothing' ? 'tabActive' : '' }`}>
                        Men's Clothing
                    </div>
                    <div onClick={() => handleNavClick('jewelery')} className={`showcase__tab__in ${isActive === 'jewelery' ? 'tabActive' : '' }`}>
                        Jewelery
                    </div>
                    <div onClick={() => handleNavClick('electronics')} className={`showcase__tab__in ${isActive === 'electronics' ? 'tabActive' : '' }`}>
                        Electronics
                    </div>
                    <div onClick={() => handleNavClick('women clothing')} className={`showcase__tab__in ${isActive === 'women clothing' ? 'tabActive' : '' }`}>
                        Women's Clothing
                    </div>
                </div>
                <div className='showcase__display'>
                    <p>{currentItem.title}</p>
                    <div className='main__display'>
                        <div className='showcase__image'>
                          <img alt='' src={currentItem.image}/>
                        </div>
                        <div className='showcase__price'>
                            <p>{currentItem.description}</p>
                            <h2>${currentItem.price}</h2>
                            <button onClick={() => setCart(addItemToCart(cart, currentItem))}>ADD TO CART</button>
                        </div>
                    </div>
                </div>
                <div className='other__products'>
                    <h2>Other Products</h2>
                    <div className='other__products__display'>
                      {
                        itemsToDisplay.map(item => {
                          return (
                            <div onClick={() => setCurrentItem(item)} key={item.id} className='mini__item'>
                              <div><img alt={item.title} src={item.image}/></div>
                              <p>{item.title}</p>
                              <h3>${item.price}</h3>
                            </div>
                          )
                        })
                      }
                    </div>
                </div>
            </div>
            <div className='cart'>
              <div className='cart__name'><span>Shopping Cart</span><span className='cart__count'>{totalCartCount}</span></div>
              <div className='cart__display'>
                {
                  !cart.length 
                  ?
                  'Your cart is empty. abeg buy something.'
                  :
                    cart.map(ct => {
                      return (
                        <div className='cart__display__item'>
                          <div className='cart__display__icon'>
                            <img src={ct.image}/>
                          </div>
                          <div className='cart__display__deets'>
                            <div className='cart__display__item__title'>{ct.title}</div>
                            <div className='cart__display__item__price'>${ct.price}</div>
                            <div className='cart__display__item__quantity'><div><span className='decrease' onClick={() => setCart(decreaseItemQuantity(cart, ct))}> - </span><span> {ct.quantity} </span><span className='increase' onClick={() => setCart(increaseItemQuantity(cart, ct))}> + </span></div><span>${Math.round(ct.quantity * ct.price)}</span><span className='remove' onClick={() => setCart(removeItemFromCart(cart, ct))}> x </span></div>
                          </div>
                        </div>
                      )
                    })                  
                }
              </div>
              {
                !cart.length
                ?
                ''
                :
                (<><div className='cart__total'>
                  <div className='cart__total__sub'>
                    <div><span>Subtotal</span><span>$ {totalCartAmount}</span></div>
                    <div><span>Shipping</span><span>Free</span></div>
                  </div>
                  <div className='cart__total__total'>
                    <span>Total</span><span>$ {totalCartAmount}</span>
                  </div>
                </div>
                {/* <button>COMPLETE ORDER</button> */}
                <StripeButton price={totalCartAmount}/>
                <div className='stripe__details'>
                  For the the test credit card payments, use <br/>
                  4242 4242 4242 4242 - Exp: 01/21 - CVV - 123
                </div>
                </>)
              }
            </div>
        </div>
    )
}

export default App