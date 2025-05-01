'use client'
import { useMemo } from 'react';
import { useStore } from '../../../lib/store'
import ProductDetails from './ProductDetails';
import { formatCurrency } from '../../../lib/utils';
import { createOrderAction } from '../../../actions/create-order-action';
import { OrderSchema } from '../../../schema';
import { toast } from 'react-toastify';

const OrderSummary = () => {
  const {order, clearOrder} = useStore((state) => state);
  const total = useMemo(() => order.reduce((total, item) => total + (item.quantity * item.price), 0),[order])

  const handleCreateOrder = async (formData: FormData) => {
    const data = {
      name: formData.get('name'),
      total,
      order
    }

    const result = OrderSchema.safeParse(data)

    if(!result.success) {
      result.error.issues.forEach((err) => {
        toast.error(err.message)
      })
    }
    const response = await createOrderAction(data);
    if (response?.errors) {
      response.errors.forEach(err => {
        toast.error(err.message)
      })
    } else {
      toast.success('Pedido realizado correctamente')
      clearOrder();
    }
    
  }
  return (
    <aside className='lg:h-screen lg:overflow-y-scroll md:w-64 lg:w-96 p-5'>
      <h1 className='text-4xl text-center font-black'>Mi pedido</h1>

      {order.length === 0 ? <p className='text-center my-10'>Carro vacío</p> : (
        <div className='mt-5'>
          {order.map(item => (
            <ProductDetails 
              key={item.id}
              item={item}
            />
          ))}
          <p className='text-2xl mt-20 text-center'>
            Total a pagar: {''}
            <span className='font-bold'>{formatCurrency(total)}</span>
          </p>

          <form 
            className='w-full mt-10 space-y-5'
            action={handleCreateOrder}
          >
            <input 
              type="text"
              placeholder='Tu nombre'
              className='bg-white border border-gray-100 p-2 w-full'
              name='name'
            />
            <input 
              type="submit"
              className='py-2 rounded uppercase text-white bg-black w-full text-center cursor-pointer font-bold'
              value="Confirmar Pedido" 
            />
          </form>
        </div>
      )}
    </aside>
  )
}

export default OrderSummary
