

const create = (req, res) => {
    res.send('todo post');
}

const findAll = (req, res) => {
    res.send('todo get all');
}

const findOneByID = (req, res) => {
    res.send('todo get one');
}

const updateOneByID = (req, res) => {
    res.send('todo put');
}

const deleteOneByID = (req, res) => {
    res.send('todo delete');
}

module.exports = {
    create,
    findAll,
    findOneByID,
    updateOneByID,
    deleteOneByID
}