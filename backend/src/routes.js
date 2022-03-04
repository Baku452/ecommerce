import express from "express"
import mongoose from "mongoose"
import Product from "./models/product.js"
import Order from "./models/order.js"
import mercadopago from "mercadopago"

import { paymentFunction } from "./payment/payment.controller.js"

const router = express.Router()

router.get("/products", async (req, res, next) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (e) {
    next(e)
  }
})

router.post("/products", async (req, res, next) => {
  try {
    const { name, description, price, image } = req.body
    const product = await Product.create({ name, description, price, image })
    res.json(product)
  } catch (e) {
    next(e)
  }
})

router.post("/orders", async (req, res) => {
  const { products } = req.body
  for (let i = 0; i < products.length; i++) {
    const product = await Product.findById(new mongoose.Types.ObjectId(products[i])).lean()
    products[i] = product
  }
  const order = await Order.create({ products })
  res.json(order)
})

router.post("/payment", async (req, res) => {
  // Create a preference object
  let preference = {
    items: [
      {
        title: "My Item",
        unit_price: 100,
        quantity: 1,
      },
    ],
  }

  mercadopago.preferences
    .create(preference)
    .then(function (response) {
      // This value replaces the String "<%= global.id %>" in your HTML
      global.id = response.body.id
    })
    .catch(function (error) {
      console.log(error)
    })
})

export default router
