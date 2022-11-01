const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
  const tags = await Tag.findAll({
    include: [{model: Product}]
  })
    res.status(200).json(tags)
  } catch (err) {
    res.status(500).json(err)
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id',async (req, res) => {
  try {
    const tagId = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    })
    !tagId ? res.status(404).json({message: 'ID not found!'}) :
    res.status(200).json(tagId)
  } catch (err) {
    res.status(500).json(err)
  }
  // find a single tag by its `id`
  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body)
    res.status(200).json(newTag)
  } catch (err) {
    res.status(500).json(err)
  }
  // create a new tag
});

router.put('/:id', async (req, res) => {
  try {
    const upTag = await Tag.update(req.body, {
      where: {id: req.params.id}
    })
    !upTag ? res.status(404).json({message: 'ID not found!'}) :
    res.status(200).json(upTag)
  } catch (err) {
    res.status(500).json(err)
  }
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const delTag = await Tag.destroy({
      where: {id: req.params.id}
    })
    !delTag ? res.status(404).json({message: 'ID not found!'}) :
    res.status(200).json(delTag)
  } catch (err) {
    res.status(500).json(err)
  }
  // delete on tag by its `id` value
});

module.exports = router;
