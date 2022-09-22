import {ObjectId} from 'mongodb';

export default class Product {
  constructor(
    public quantiy: number,
    public product_description: string,
    public model_no: string,
    public product_type: string,
    public stock_price: number,
    public current_price: number,
    public spec_title: string,
    public main_feat: string,
    public minor_feat: string,
    public spec_expand: string,
    public screen_size: string,
    public processor: string,
    public memory: string,
    public storage: string,
    public battery: string,
    public speakers: string,
    public camera: string,
    public imgURL: string,
    public id?: ObjectId
  ) {}
}
