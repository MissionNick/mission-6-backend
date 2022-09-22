/* eslint-disable prettier/prettier */
// External Dependencies
import express, { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { collections } from '../services/database.service';
import cors from 'cors';
import * as dotenv from 'dotenv';
import Product from '../models/product';

// Global Config

export const productsRouter = express.Router();
dotenv.config();

const allowedOrigins = ['http://localhost:3000'];
console.log();
const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

productsRouter.use(cors(options));
productsRouter.use(express.json());

// GET

productsRouter.get('/', async (_req: Request, res: Response) => {
  try {
    // Call find with an empty filter object, meaning it returns all documents in the collection. Saves as product array to take advantage of types
    console.log('Hit the product server with a get all');
    const products = (await collections.products?.find({}).toArray()) as Product[];
    // TO DO implement middleware result sort
    res.status(200).send(products);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send(err.message);
    } else {
      res.status(500).send('Unexpected error');
      console.log('Unexpected error', err);
    }
  }
});

productsRouter.get('/:id', async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    console.log(`Hit the product server with a get for product ${id}`);
    const query = { _id: new ObjectId(id) } ;
    const product = await collections.products?.findOne(query) as Product;
    console.log(`Result ${product}`)

    if (product) {
      res.status(200).send(product);
    } else {
      res.status(500).send(product);
    }
  } catch (err) {
    if (err instanceof Error) {
      res
        .status(404)
        .send(`Unable to find matching document with id: ${req.params.id}`);
    } else {
      res
        .status(404)
        .send(`Unable to find matching document with id: ${req.params.id}`);
      console.log('Unexpected error', err);
    }
  }
});

// POST

productsRouter.post('/', async (req: Request, res: Response) => {
  try {
    const newproduct = req.body;
    const result = await collections.products?.insertOne(newproduct);

    result
      ? res
        .status(201)
        .send(
          `Successfully created a new product with id ${result.insertedId}`
        )
      : res.status(500).send('Failed to create a new product.');
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      res.status(400).send(err.message);
    } else {
      console.log('Unexpected error', err);
      res.status(400).send('Unexpected error');
    }
  }
});

// PUT

productsRouter.put('/:id', async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const updatedproduct = req.body;
    const query = { _id: new ObjectId(id) };
    // $set adds or updates all fields
    const result = await collections.products?.updateOne(query, {
      $set: updatedproduct,
    });

    result
      ? res.status(200).send(`Successfully updated product with id ${id}`)
      : res.status(304).send(`product with id: ${id} not updated`);
  } catch (err) {
   
    if (err instanceof Error) {
      console.error(err);
      res.status(400).send(err.message);
    } else {
      console.log('Unexpected error', err);
      res.status(400).send('Unexpected error');
    }
  }
});

// DELETE

productsRouter.delete('/:id', async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const query = { _id: new ObjectId(id) };
    const result = await collections.products?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Successfully removed product with id ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove product with id ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`product with id ${id} does not exist`);
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      res.status(400).send(err.message);
    } else {
      console.error('Unexpected error', err);
      res.status(400).send('Unexpected error');
    }
  }
});
