import { ChevronRightIcon } from '@heroicons/react/24/solid'

const OrdersCard = props => {
    const { totalPrice, totalProducts } = props

    return (
        <div className="flex justify-between items-center mb-3 border border-grey rounded-lg w-80 p-4">
            <p className='flex justify-between w-full items-center'>
                <div className='flex flex-col'>
                    <span className='font-light'>📅01.02.23</span>
                    <span className='font-light'>🛒{totalProducts} articles</span>
                </div>
                <div className='flex items-center'>
                <span className='font-medium text-2xl'>${totalPrice}</span>
                <ChevronRightIcon className='h-6 w-6 text-black-500 cursor-pointer ml-2'></ChevronRightIcon>
                </div>
                
            </p>
        </div>
    )
}

export default OrdersCard