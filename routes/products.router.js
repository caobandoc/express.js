const express = require('express');
const faker = require('faker');

const router = express.Router();

router.get('/', (req, res) => {
  const products = [];
  const {size} = req.query;
  const limit = size || 10;
  for(let i = 0; i < limit; i++){
    products.push({
      name: faker.commerce.productName(),
      price: parseInt(faker.commerce.price(), 10),
      image: faker.image.imageUrl()
    })
  }
  res.json(products);
});

// los endpoints especificos deben ir al inicio
router.get('/filter', (req, res) => {
  res.send('Yo soy un filtro');
});

// los endpoints dinamicos deben ir despues de los especificos
//http://localhost:3000/products/12
router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id: id,
    name: 'Producto 1',
    price: 1000
    });
});

router.post('/', (req, res) => {
  const body = req.body;
  res.json({
    message:'created',
    data: body
  });
});

module.exports = router;
