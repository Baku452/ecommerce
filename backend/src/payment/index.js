const { Router } = require("express")

const { makePayment } = require("./payment.controller")

const router = Router()

router.post("/payment", makePayment)

module.exports = router
