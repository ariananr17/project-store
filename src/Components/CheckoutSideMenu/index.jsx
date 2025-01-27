import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { ShoppingCartContext } from '../../Context'
import OrderCard from '../../Components/OrderCard'
import { totalPrice } from '../../utils'
import './styles.css'

const CheckoutSideMenu = () => {
    
  const context = useContext(ShoppingCartContext)
  console.log(context.productToShow)

  const handleDelete = (id) => {
    const filteredProducts = context.cartProducts.filter(product => product.id != id)
    context.setCartProducts(filteredProducts)
  }

  const handleCheckout = () => {
    const orderToAdd = {
      date: '01.02.23',
      products: context.cartProducts,
      totalProducts: context.cartProducts.length,
      totalPrice: totalPrice(context.cartProducts)
    }

    context.setOrder([...context.order, orderToAdd])
    context.setCartProducts([])
    context.setCount(0)
  }

  return (
    <aside 
        className={`${context.isCheckoutSideMenuOpen ? 'flex' : 'hidden'} checkout-side-menu flex-col fixed right-0  border border-black rounded-lg bg-white `}>
        <div className='flex justify-between items-center p-6'>
            <h2 className='font-medium text-xl'>My Order</h2>
            <div 
            onClick={() => context.closeCheckoutSideMenu()}
            className='h-6 w-6 text-black-500 cursor-pointer'>
                <XMarkIcon ></XMarkIcon>
            </div>
        </div>
        <div className='px-6 overflow-y-scroll flex-1'>
        {
          context.cartProducts.map(product => (
            <OrderCard 
            key={product.id}
            id={product.id}
            title={product.title}
            imageURL={product.image} 
            price={product.price}
            handleDelete={handleDelete}  />
          ))
        }
        </div>
        <div className='px-6'>
          <p className='flex justify-between items-center mb-2'>
            <span className='font-light '>Total:</span>
            <span className='font-medium text-2xl'>${totalPrice(context.cartProducts)}</span>
          </p>
          <Link to='my-orders/last'>
            <button className='w-full bg-black py-3 text-white rounded-lg mb-6' onClick={() => handleCheckout()}>Checkout</button>
          </Link>
          
        </div>
    </aside>
  )
}

export default CheckoutSideMenu