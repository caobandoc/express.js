const express = require('express');
//para crear datos rapidos
const faker = require('faker');
const app = express();
const port = 3000;


app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

app.get('/products', (req, res) => {
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
app.get('/products/filter', (req, res) => {
  res.send('Yo soy un filtro');
});

// los endpoints dinamicos deben ir despues de los especificos
//http://localhost:3000/products/12
app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id: id,
    name: 'Producto 1',
    price: 1000
    });
});

app.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  if (limit && offset) {
    res.json({
      limit,
      offset
    });
  }else{
    res.send('No hay parametros');
  }

});

app.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId: categoryId,
    productId: productId,
    name: 'Producto 1',
    price: 1000
    });
});


app.listen(port, () => {
  console.log(`Mi puerto es: http://localhost:${port}`);
});
