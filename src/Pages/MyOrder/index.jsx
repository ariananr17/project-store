import { useContext } from 'react'
import { ShoppingCartContext } from '../../Context'
import { Link } from 'react-router-dom'
import { ChevronLeftIcon } from '@heroicons/react/24/solid'
import OrderCard from '../../Components/OrderCard'
import Layout from '../../Components/Layout'

function MyOrder() {
  const context = useContext(ShoppingCartContext)
  const currentPath = window.location.pathname 
  let index = currentPath.substring(currentPath.lastIndexOf('/') + 1)
  if (index === 'last') index = context.order?.length -1

  return (
    <Layout>
      <div className='flex w-80 items-center justify-center relative mb-3'>
        <Link to='/my-orders/' className='absolute left-0'>
          <ChevronLeftIcon className='h-6 w-6 text-black-500 cursor-pointer '/>
        </Link>
        <h1>My Order</h1>
      </div>
      
      <div className='px-6 overflow-y-scroll flex-1'>
        {
          context.order?.[index]?.products.map(product => (
            <OrderCard 
            key={product.id}
            id={product.id}
            title={product.title}
            imageURL={product.image} 
            price={product.price}  />
          ))
        }
        </div>
    </Layout>
  )
}

export default MyOrder