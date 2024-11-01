"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const productRouter = (0, express_1.Router)();
let products = [];
// Get by id
productRouter.get("/:id", (req, res) => {
    const { id } = req.params;
    const foundProduct = products.find((product) => product.id === id);
    if (foundProduct) {
        res.status(200).json(foundProduct);
    }
    else {
        res.status(404).send("Product not found!");
    }
});
// Get all products
productRouter.get("/", (req, res) => {
    res.status(200).json(products);
});
// Add
productRouter.post("/", (req, res) => {
    const newProduct = {
        id: (0, uuid_1.v4)(),
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        product_price: req.body.product_price,
    };
    products = [...products, newProduct];
    res.status(201).send("Product added successfully...");
});
// Edit
productRouter.put("/:id", (req, res) => {
    var _a, _b, _c, _d;
    console.log("put");
    const { id } = req.params;
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
        const updateProduct = Object.assign(Object.assign({}, products[productIndex]), { id: (_a = req.body.id) !== null && _a !== void 0 ? _a : products[productIndex].id, product_name: (_b = req.body.product_name) !== null && _b !== void 0 ? _b : products[productIndex].product_name, product_description: (_c = req.body.product_description) !== null && _c !== void 0 ? _c : products[productIndex].product_description, product_price: (_d = req.body.product_price) !== null && _d !== void 0 ? _d : products[productIndex].product_price });
        products[productIndex] = updateProduct;
        res.status(201).json(updateProduct);
    }
    else {
        res.status(404).send("Product not found!");
    }
});
// Delete
productRouter.delete("/:id", (req, res) => {
    console.log("削除");
    const { id } = req.params;
    const productIndex = products.findIndex((product) => product.id === id);
    if (productIndex !== -1) {
        products = products.filter((product) => product.id !== id);
        console.log(products);
        res.status(204).send();
    }
    else {
        res.status(404).send("Product not found!");
    }
});
exports.default = productRouter;
