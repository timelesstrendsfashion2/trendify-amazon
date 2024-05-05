"use server"

import { UTApi } from "uploadthing/server"

import { db } from "@/lib/db"
import { ProductInput } from "@/lib/validations/product"
import { PRODUCT_CATEGORY } from "@prisma/client"

export async function createProduct(data: ProductInput) {
  try {
    const product = await db.product.create({
      data: {
        ...data,
        images: {
          createMany: {
            data: data.images,
          },
        },
      },
      include: {
        images: true,
      },
    })

    return { product, error: null }
  } catch (error) {
    return {
      error: "Error creating product, please try again later",
      product: null,
    }
  }
}

export async function updateProduct(id: string, data: ProductInput) {
  try {
    const { images, ...productData } = data

    const product = await db.product.update({
      where: {
        id,
      },
      data: productData,
      include: {
        images: true,
      },
    })

    const imagesToCreate = data.images
      .filter((i) => !product.images.find((p) => p.key === i.key))
      .map((i) => ({ ...i, productId: product.id }))

    const imagesToDelete = product.images.filter(
      (i) => !data.images.find((p) => p.key === i.key)
    )

    if (imagesToCreate.length > 0) {
      await db.productImage.createMany({
        data: imagesToCreate,
      })
    }

    if (imagesToDelete.length > 0) {
      const utApi = new UTApi()

      await db.productImage.deleteMany({
        where: {
          id: {
            in: imagesToDelete.map((i) => i.id),
          },
        },
      })

      await utApi.deleteFiles(imagesToDelete.map((i) => i.key))
    }

    return { product, error: null }
  } catch (error) {
    return {
      error: "Error updating product, please try again later",
      product: null,
    }
  }
}

export async function addClick(id: string) {
  try {
    await db.product.update({
      where: {
        id,
      },
      data: {
        clicks: {
          increment: 1,
        },
      },
    })
  } catch (error) {
    return { error: "Error updating product, please try again later" }
  }
}

export async function searchProducts(
  query?: string,
  category?: PRODUCT_CATEGORY
) {
  try {
    if (!query && !category) {
      return []
    }

    const queryClause = [
      {
        title: {
          contains: query,
          mode: "insensitive" as const,
        },
      },
      {
        description: {
          contains: query,
          mode: "insensitive" as const,
        },
      },
      {
        tags: {
          has: query,
        },
      },
    ] as const

    if (query && category) {
      const products = await db.product.findMany({
        where: {
          isArchieved: false,
          category,
          OR: [...queryClause],
        },
        include: {
          images: true,
        },
      })

      return products
    } else if (query) {
      const products = await db.product.findMany({
        where: {
          isArchieved: false,
          OR: [...queryClause],
        },
        include: {
          images: true,
        },
      })

      return products
    } else if (category) {
      const products = await db.product.findMany({
        where: {
          isArchieved: false,
          category,
        },
        include: {
          images: true,
        },
      })

      return products
    }

    return []
  } catch (error) {
    return []
  }
}

export async function deleteProduct(id: string) {
  try {
    const utApi = new UTApi()

    const images = await db.productImage.findMany({
      where: {
        productId: id,
      },
    })

    await utApi.deleteFiles(images.map((i) => i.key))

    await db.product.delete({
      where: {
        id,
      },
    })
  } catch (error) {
    return { error: "Error deleting product, please try again later" }
  }
}
