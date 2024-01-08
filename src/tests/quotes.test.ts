import express from 'express'
import request from 'supertest'
import { Request, Response } from 'express'


const app = express();
app.use(express.json());

app.post("/quote", async (req: Request, res: Response) => {

    const data = req.body

    if (typeof (data.recipient.address.zipcode) === "string") {
        return res.status(400).json({
            "error": true,
            "detail": "json: Não é possivel ler o campo zipcode"
        })
    }
    else if (data.recipient) {
        return res.status(200).json(
            {
                "carrier": [
                    {
                        "name": "CORREIOS",
                        "service": "PAC",
                        "deadline": 11,
                        "price": 50.59
                    },
                    {
                        "name": "CORREIOS",
                        "service": "SEDEX",
                        "deadline": 7,
                        "price": 124.24
                    }
                ]
            }
        )
    }
    else {
        return res.status(400).json(
            {
                "error": true,
                "mensage": "Você deve enviar a mensagem(body) corretamente.",
                "model": {
                    "recipient": {
                        "address": {
                            "zipcode": 1311000
                        }
                    },
                    "volumes": [
                        {
                            "category": "7",
                            "amount": 1,
                            "unitary_weight": 5,
                            "price": 349,
                            "sku": "abc-teste-123",
                            "unitary_price": 10,
                            "height": 0.2,
                            "width": 0.2,
                            "length": 0.2
                        },
                        {
                            "category": "7",
                            "amount": 2,
                            "unitary_weight": 4,
                            "price": 556,
                            "sku": "abc-teste-527",
                            "unitary_price": 10,
                            "height": 0.4,
                            "width": 0.6,
                            "length": 0.15
                        }
                    ]
                }
            }
        )
    }



})

describe("Quote Route", () => {

    it("Sem corpo(body)", () => {
        request(app)
            .post("/quote")
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(400)
    })


    it("Com Corpo(body)", (done) => {

        const payload = {
            "recipient": {
                "address": {
                    "zipcode": 89999999
                }
            },
            "volumes": [
                {
                    "category": "7",
                    "amount": 1,
                    "unitary_weight": 5,
                    "price": 349,
                    "sku": "abc-teste-123",
                    "unitary_price": 10.0,
                    "height": 0.2,
                    "width": 0.2,
                    "length": 0.2
                },
                {
                    "category": "7",
                    "amount": 2,
                    "unitary_weight": 4,
                    "price": 556,
                    "sku": "abc-teste-527",
                    "unitary_price": 10.0,
                    "height": 0.4,
                    "width": 0.6,
                    "length": 0.15
                }
            ]
        }

        request(app)
            .post("/quote")
            .send(payload)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(200, done)
    })


    it("Com tipos incorretos - Ex.: recipient.address.zipcode (esperando número) ", (done) => {

        const payload = {
            "recipient": {
                "address": {
                    "zipcode": "89999999"
                }
            },
            "volumes": [
                {
                    "category": "7",
                    "amount": 1,
                    "unitary_weight": 5,
                    "price": 349,
                    "sku": "abc-teste-123",
                    "unitary_price": 10.0,
                    "height": 0.2,
                    "width": 0.2,
                    "length": 0.2
                },
                {
                    "category": "7",
                    "amount": 2,
                    "unitary_weight": 4,
                    "price": 556,
                    "sku": "abc-teste-527",
                    "unitary_price": 10.0,
                    "height": 0.4,
                    "width": 0.6,
                    "length": 0.15
                }
            ]
        }

        request(app)
            .post("/quote")
            .send(payload)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .expect(400, done)
    })

})
