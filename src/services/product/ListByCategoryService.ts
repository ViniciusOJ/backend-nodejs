import prismaClient from "../../prisma";

interface ProductRequest {
  category_id: string;
}

class ListByCategoryService {
  async execute({ category_id }: ProductRequest) {
    const categoryExist = await prismaClient.category.findFirst({
      where: {
        id: category_id,
      },
    });

    if (!categoryExist) {
      throw new Error("Category not found");
    }

    const findByCategory = await prismaClient.product.findMany({
      where: {
        category_id: category_id,
      },
    });

    return findByCategory;
  }
}

export { ListByCategoryService };
