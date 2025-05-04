import Heading from "@/components/ui/Heading"
import { prisma } from "../../../../prisma/lib/prisma"
import ProductTable from "@/components/products/ProductTable"
import ProductsPagination from "@/components/products/ProductsPagination"
import { redirect } from "next/navigation"
import Link from "next/link"
import ProductsSearchForm from "@/components/products/ProductsSearchForm"

async function productCount() {
  return await prisma.product.count()
}

async function getProducts (page: number = 1, pageSize: number) {
  const skip = (page -1) * pageSize
  const products = await prisma.product.findMany({
    skip: skip,
    take: pageSize,
    include: {
      category: true
    }
  })
  return products
}

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>

const ProductsPage = async ({searchParams}: {searchParams: {page: string}}) => {
  const page = +searchParams.page || 1
  const pageSize = 10;

  if(page < 0) {
    redirect("/admin/products")
  }

  const productsData = getProducts(page, pageSize);
  const totalProductsData = productCount()
  const [products, totalProducts] = await Promise.all([productsData, totalProductsData]);
  const totalPages = Math.ceil(totalProducts / pageSize)

  if(page > totalPages) {
    redirect("/admin/products")
  }
  return (
    <>
      <Heading>
        Administrar productos
      </Heading>
      <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
        <Link
          href={`/admin/products/new`}
          className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 text-center font-bold cursor-pointer"
        >
          Crear Producto
        </Link>
        <ProductsSearchForm />
      </div>
      <ProductTable products={products}/>
      <ProductsPagination page={page} totalPages={totalPages}/>
    </>
  )
}

export default ProductsPage
