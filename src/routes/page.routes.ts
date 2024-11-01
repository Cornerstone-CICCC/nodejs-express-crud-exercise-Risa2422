import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

const productRouter = Router();

interface Product {
  id: string;
  product_name: string;
  product_description: string;
  product_price: string;
}

let products: Product[] = [];

// Get by id
productRouter.get("/:id", (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const foundProduct = products.find((product) => product.id === id);
  if (foundProduct) {
    res.status(200).json(foundProduct);
  } else {
    res.status(404).send("Product not found!");
  }
});

// Get all products
productRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json(products);
});

// Add
productRouter.post("/", (req: Request<{}, {}, Product>, res: Response) => {
  const newProduct: Product = {
    id: uuidv4(),
    product_name: req.body.product_name,
    product_description: req.body.product_description,
    product_price: req.body.product_price,
  };

  products = [...products, newProduct];
  res.status(201).send("Product added successfully...");
});

// Edit
productRouter.put(
  "/:id",
  (req: Request<{ id: string }, {}, Product>, res: Response) => {
    const { id } = req.params;
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      const updateProduct = {
        ...products[productIndex],
        id: req.body.id ?? products[productIndex].id,
        product_name:
          req.body.product_name ?? products[productIndex].product_name,
        product_description:
          req.body.product_description ??
          products[productIndex].product_description,
        product_price:
          req.body.product_price ?? products[productIndex].product_price,
      };

      products[productIndex] = updateProduct;
      res.status(201).json(updateProduct);
    } else {
      res.status(404).send("Product not found!");
    }
  }
);

// Delete
productRouter.delete(
  "/:id",
  (req: Request<{ id: string }, {}, {}>, res: Response) => {
    const { id } = req.params;
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
      products = products.filter((product) => product.id !== id);
      res.status(204).send();
    } else {
      res.status(404).send("Product not found!");
    }
  }
);

export default productRouter;
