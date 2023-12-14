// Write your code here
import './index.css'
import CartContext from '../../context/CartContext'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const totalPriceArray = cartList.map(
        eachItem => eachItem.price * eachItem.quantity,
      )

      const totalPrice = totalPriceArray.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0,
      )

      return (
        <div className="cart-summary-bg">
          <div>
            <div className="total-price-container">
              <h1 className="order-total">Order Total:</h1>
              <h1 className="total-amount">{totalPrice}/-</h1>
            </div>
            <p className="items-in-cart">items in Cart</p>
            <button className="checkout-button" type="button">
              checkout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
