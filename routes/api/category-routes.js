const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categories = await Category.findAll({
    include: [{model: Product}]
  });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err)
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const catId = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    });
    !catId ? res.status(404).json({message: 'ID not found!'}) :
    res.status(200).json(catId);
  } catch (err) {
    res.status(500).json(err)
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  try {
    const addCat = await Category.create(req.body);
    res.status(200).json(addCat)
  } catch (err) {
    res.status(400).json(err)
  }
  // create a new category
});

router.put('/:id', async (req, res) => {
  try {
    const upCat = await Category.update(req.body, {
      where: {id: req.params.id}
    })
    !upCat ? res.status(404).json({message: 'ID not found!'}) :
    res.status(200).json(upCat)
  } catch (err) {
    res.status(500).json(err)
  }
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const delCat = await Category.destroy({
      where: {id: req.params.id}
    })
    !delCat ? res.status(404).json({message: 'ID not found!'}) :
    res.status(200).json(delCat)
  } catch (err) {
    res.status(500).json(err)
  }
  // delete a category by its `id` value
});

module.exports = router;
