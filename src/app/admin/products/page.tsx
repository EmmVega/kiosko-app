import Heading from "@/components/ui/Heading"
import { prisma } from "../../../../prisma/lib/prisma"
import ProductTable from "@/components/products/ProductTable"

async function getProducts () {
  const products = await prisma.product.findMany({
    include: {
      category: true
    }
  })
  return products
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>

const ProductsPage = async () => {
  const products = await getProducts();
  return (
    <>
      <Heading>
        Administrar productos
      </Heading>
      <ProductTable products={products}/>
    </>
  )
}

export default ProductsPage
