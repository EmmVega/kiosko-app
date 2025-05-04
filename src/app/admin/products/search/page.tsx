import Heading from '@/components/ui/Heading'
import React from 'react'
import { prisma } from '../../../../../prisma/lib/prisma';
import ProductTable from '@/components/products/ProductTable';
import ProductsSearchForm from '@/components/products/ProductsSearchForm';

async function searchProducts (searchTerm: string) {
    const products = await prisma.product.findMany({
        where: {
            name: {
                contains: searchTerm,
                mode: 'insensitive'
            }
        },
        include: {
            category: true
        }
    })
    return products;
}

async function SearchPage ({searchParams}: {searchParams: {search: string}})  {
    const {search} = await searchParams;

    const products = await searchProducts(search)
    
  return (
    <>
        <Heading>
            Resultados de búsqueda
        </Heading>
        <div className='flex flex-col lg:flex-row lg:justify-end gap-5'>
            <ProductsSearchForm />
        </div>
        {products.length ? (
            <ProductTable products={products}/>
        ) :
        <p className='text-center text-lg'>No hay productos con esa busqueda</p> 
         }
    </>
  )
}

export default SearchPage
