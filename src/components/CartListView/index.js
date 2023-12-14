import CartItem from '../CartItem'
import CartContext from '../../context/CartContext'

import './index.css'

const CartListView = () => (
  <CartContext.Consumer>
    {value => {
      const {
        cartList,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value

      const onIncrementItemQuantity = id => {
        incrementCartItemQuantity(id)
      }
      const onDecrementItemQuantity = id => {
        decrementCartItemQuantity(id)
      }

      return (
        <ul className="cart-list">
          {cartList.map(eachCartItem => (
            <CartItem
              key={eachCartItem.id}
              cartItemDetails={eachCartItem}
              onIncrementItemQuantity={onIncrementItemQuantity}
              onDecrementItemQuantity={onDecrementItemQuantity}
            />
          ))}
        </ul>
      )
    }}
  </CartContext.Consumer>
)

export default CartListView
