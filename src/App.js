import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const {quantity} = product
    const foundItem = cartList.find(eachObject => eachObject.id === product.id)
    const removedItemList = cartList.filter(
      eachObject => eachObject.id !== product.id,
    )

    if (foundItem !== undefined) {
      foundItem.quantity = quantity + foundItem.quantity
      const updatedObject = foundItem
      this.setState({cartList: [...removedItemList, updatedObject]})
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: [
        ...prevState.cartList.filter(eachObject => eachObject.id !== id),
      ],
    }))
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: [
        ...prevState.cartList.map(eachObject => {
          if (eachObject.id === id) {
            return {...eachObject, quantity: eachObject.quantity + 1}
          }
          return eachObject
        }),
      ],
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: [
        ...prevState.cartList.map(eachObject => {
          if (eachObject.id === id) {
            if (eachObject.quantity === 1) {
              this.removeCartItem(id)
            }
            return {...eachObject, quantity: eachObject.quantity - 1}
          }
          return eachObject
        }),
      ],
    }))
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          removeAllCartItems: this.removeAllCartItems,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
