'use server'

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma/lib/prisma"

export async function completeOrderAction (formData: FormData) {
    const orderId = formData.get('order_id')!
    try {
        await prisma.order.update({
            where: {
                id: +orderId
            },
            data: {
                status: true,
                orderReadyAt: new Date(Date.now())
            }
        })

        revalidatePath('/admin/orders')
    } catch (e) {
        console.log(e);
    }
}