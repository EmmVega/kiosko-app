'use client'
import { Product } from "@prisma/client"
import { useStore } from "../../../lib/store"

type AddProductButtonProps = {
    product: Product
}

const AddToProductButton = ({product}: AddProductButtonProps) => {
    const { addToCard } = useStore((state) => state);

  return (
    <button
        onClick={() => addToCard(product)}
        type="button"
        className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
   >
       Agregar
   </button>
  )
}

export default AddToProductButton
