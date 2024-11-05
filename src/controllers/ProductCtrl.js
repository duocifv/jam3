import ProductModel  from "@/models/ProductModel";

class ProductCtrl  {
  async list(slug) {
    const products = await ProductModel.getProducts(slug);
    return products;
  }
  async categories () {
    const categories = await ProductModel.getProductCategories();
    return categories;
  }
}

const results = new ProductCtrl();
export default results;
