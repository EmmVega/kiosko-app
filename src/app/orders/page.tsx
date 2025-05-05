import Logo from '@/components/ui/Logo'
import React from 'react'
import { prisma } from '../../../prisma/lib/prisma'
import LastOrderItem from '@/components/order/LastOrderItem'

const getLastReadyOrders = async () => {
    const lastReadyOrders = prisma.order.findMany({
        where: {
            orderReadyAt: {
                not: null
            }
        },
        orderBy: {
            orderReadyAt: "desc"
        },
        include: {
            orderProducts: {
                include: {
                    product: true
                }
            }
        }
    })
    return lastReadyOrders;
}

const Orders = async () => {
  const readyOrders = await getLastReadyOrders();
    
  return (
    <>
        <h1 className='text-center mt-20 text-6xl font-black'>Ordenes listas</h1>
        <Logo/>
        {readyOrders.length ? (
            <div className='grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10'>
                {readyOrders.map(order => (
                    <LastOrderItem order={order} key={order.id}/>
                ))}
            </div>
        ) : (
            <p className='text-center my-10'>No hay ordenes listas</p>
        )}
    </>
  )
}

export default Orders
