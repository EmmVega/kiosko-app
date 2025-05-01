'use server'

import { OrderSchema } from "../schema"

export const createOrderAction = async (data: unknown) => {
    const result = OrderSchema.safeParse(data)
    
    if(!result.success) {
        return {
            errors: result.error.issues
        }
    }
}

