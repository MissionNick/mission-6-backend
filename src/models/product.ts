import {ObjectId} from 'mongodb';

export default class Product {
  constructor(
    public product_name: string,
    public quantiy: number,
    public product_description: string,
    public id?: ObjectId
  ) {}
}
