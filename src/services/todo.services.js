const todoModel = require('./../models/Todo');
const { serviceResponse } = require('../utils/response.utils');

const verifyCreateFields = ({ title, description }) => {
    if (!title || !description) {
        return serviceResponse(false, { error: 'All fields are required' });
    }

    return serviceResponse(true, { message: 'Fields fine' });
}

const create = async ({ title, description }) => {
    try {
        const todo = new todoModel({
            title,
            description
        });

        const todoSaved = await todo.save();

        if (!todoSaved) {
            return serviceResponse(false, { error: 'Todo not created' });
        }

        return serviceResponse(true, { message: 'Todo Created' });
    } catch (error) {
        throw error;
    }
}

const findAll = async () => {
    try {
        const todos = await todoModel.find().exec();
        return serviceResponse(true, { message: 'Todos all found' }, todos);
    } catch (error) {
        throw error;
    }
}

const findOneByID = async (id) => {
    try {
        const todo = await todoModel.findById(id).exec();

        if (!todo) {
            return serviceResponse(false, { error: 'Todo not found' });
        }

        return serviceResponse(true, { message: 'Todo Found' }, [todo]);
    } catch (error) {
        throw error;
    }
}

module.exports = {
    verifyCreateFields,
    create,
    findAll,
    findOneByID
}