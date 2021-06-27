const router = require('express').Router();
const { Category, Product } = require('../../models');

router.get('/', (req, res) => {
  Category.findAll({
      attributes: ['id', 'category_name'],
      include: [{
              model: Product,
              attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
          }]
  }).then((category) => res.json(category))
    .catch((err) => res.status(500).json(err));
});

router.get('/:id', (req, res) => {
  Category.findOne({
      where: {id: req.params.id},
      attributes: ['id', 'category_name'],
      include: [{
              model: Product,
              attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
          }]
  }).then((category) => res.json(category))
    .catch((err) => res.status(400).json(err));
});

router.post('/', (req, res) => {
  Category.create({
      category_name: req.body.category_name
  }).then((category) => res.status(200).json(category))
    .catch((err) => res.status(400).json(err));
});

router.put('/:id', (req, res) => {
  Category.update(req.body, {
      where: {id: req.params.id}
  }).then((category) => res.status(200).json(category))
    .catch((err) => res.status(400).json(err));
});

router.delete('/:id', (req, res) => {
  Category.destroy({
      where: {id: req.params.id}
  }).then((category) => res.status(200).json(category))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
