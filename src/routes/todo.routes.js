const { Router } = require('express');
const router = Router();

const { create, findAll, findOneByID, updateOneByID, deleteOneByID } = require('./../controllers/todo.controllers');

router.post('/', create);
router.get('/', findAll);
router.get('/:id', findOneByID);
router.put('/:id', updateOneByID);
router.delete('/:id', deleteOneByID);

module.exports = router;