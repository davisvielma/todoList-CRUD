const { Router } = require('express');
const router = Router();

const { create, findAll, findOneByID, updateOneByID, deleteOneByID, changeDone } = require('./../controllers/todo.controllers');

router.post('/', create);
router.get('/', findAll);
router.get('/:id', findOneByID);
router.put('/done/:id', changeDone);
router.put('/:id', updateOneByID);
router.delete('/:id', deleteOneByID);

module.exports = router;