import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>
  ) {}

  async createProduct(data: any) {
    // 1. Create new object
    const newProduct = new this.productModel(data);
    // 2. Save to Mongo
    const savedProduct = await newProduct.save();
    
    // 3. Convert _id to string for gRPC
    return {
      id: savedProduct._id.toString(),
      name: savedProduct.name,
      description: savedProduct.description,
      price: savedProduct.price,
      category: savedProduct.category
    };
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    
    // gRPC expects { products: [...] }
    return {
      products: products.map((p) => ({
        id: p._id.toString(),
        name: p.name,
        description: p.description,
        price: p.price,
        category: p.category
      })),
    };
  }
}