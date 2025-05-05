"use client"
import React from 'react'
import { ProductSchema } from '../../../schema'
import { toast } from 'react-toastify'

const AddProductForm = ({children}: {children: React.ReactNode}) => {
    async function handleSubmit (formData: FormData) {
        const data = {
            name: formData.get("name"),
            price: formData.get("price"),
            caregoryID: formData.get("categoryId")
        }
        const result = ProductSchema.safeParse(data);
        
        if(!result.success) {
            result.error.issues.forEach(issue => {
                toast.error(issue.message)
            })
        }
    }
  return (
    <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md max-w-3xl mx-auto'>
        <form 
            className='space-y-5'
            action={handleSubmit}
        >
            {children}
            <input 
                type="submit" 
                className='bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer'
                value='Registrar Producto'
                />
        </form>
    </div>
  )
}

export default AddProductForm
