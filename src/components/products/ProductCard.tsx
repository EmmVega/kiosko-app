import { Product } from "@prisma/client"
import { formatCurrency } from "../../../lib/utils"
import Image from "next/image"
import AddToProductButton from "./AddToProductButton"

type ProductCardProps = {
    product: Product
}

const ProductCard = ({product}: ProductCardProps) => {
  return (
    <div className="border bg-white">
        <Image 
            src={`/products/${product.image}.jpg`}
            width={400}
            height={500}
            alt={`Imagen platillo ${product.name}`}
        />
        <div className="p-5">
            <h3 className="text-2xl font-bold">{product.name}</h3>
            <p className="mt-5 font-black text-4xl text-amber-500">{formatCurrency(product.price)}</p>
           <AddToProductButton product={product}/>
        </div>
    </div>
  )
}

export default ProductCard
