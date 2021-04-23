const { Router } = require('express');
const router = Router();

const todo = require('./../controllers/todo.controllers');

router.post('/', todo.create);
router.get('/', todo.findAll);
router.get('/:id', todo.findOneByID);
router.put('/:id', todo.updateOneByID);
router.delete('/:id', todo.deleteOneByID);

module.exports = router;