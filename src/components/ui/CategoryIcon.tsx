import { Category } from '@prisma/client'
import React from 'react'

type CategoryIconProps = {
    category: Category
}

const CategoryIcon = ({category}: CategoryIconProps) => {
  return (
    <div>
      {category.name}
    </div>
  )
}

export default CategoryIcon
