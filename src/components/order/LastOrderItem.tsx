import React from 'react'
import { OrderWithProducts } from '../../../lib/types'
type LastOrderItemProps = {
    order: OrderWithProducts
}

const LastOrderItem = ({order}: LastOrderItemProps) => {
  return (
    <div className='bg-white shadow p-5 space-y-0 rounded-lg'>
      <p className='text-lg font-bold text-slate-600'>
        Cliente: {order.name}
      </p>
      <ul className='divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500' role='list'>
        {order.orderProducts.map(product => (
            <li
                key={product.id}
                className='flex py-6 text-lg'
            >
                <p className='font-bold'>
                    <span>
                    ({product.quantity}) {''}
                    </span>
                    {product.product.name}
                </p>
            </li>
        ))}
      </ul>
    </div>
  )
}

export default LastOrderItem
