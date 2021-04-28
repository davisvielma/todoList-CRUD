const todoModel = require('./../models/Todo');
const { serviceResponse } = require('../utils/response.utils');

const verifyCreateFields = ({ title, description }) => {
    if (!title || !description) {
        return serviceResponse(false, { error: 'All fields are required' });
    }

    return serviceResponse(true, { message: 'Fields fine' });
}

const verifyUpdateFields = ({ title, description }) => {
    if (!title && !description) {
        return serviceResponse(false, { error: 'Error all fields are empty' });
    }

    let todoUpdate = {};
    if (title) todoUpdate.title = title;
    if (description) todoUpdate.description = description;

    return serviceResponse(true, { message: 'Field fine' }, todoUpdate);
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

        return serviceResponse(true, { message: 'Todo Found' }, todo);
    } catch (error) {
        throw error;
    }
}

const changeDone = async ({ _id, done }) => {
    try {
        const doneUpdate = !done;
        const todoChangeDone = await todoModel.updateOne({ _id }, { done: doneUpdate });

        if (!todoChangeDone) {
            return serviceResponse(false, { error: 'Todo not change done' });
        }

        return serviceResponse(true, { message: 'Todo change done' });
    } catch (error) {
        throw error;
    }
}

const updateOneByID = async ({ _id }, contentToUpdate) => {
    try {
        const todoUpdated = await todoModel.updateOne({ _id }, { $set: contentToUpdate });

        if (!todoUpdated) {
            return serviceResponse(false, { error: 'Todo not updated' });
        }

        return serviceResponse(true, { message: 'Todo updated' });
    } catch (error) {
        throw error;
    }
}

const deleteOneByID = async ({ _id }) => {
    try {
        const todoDeleted = await todoModel.deleteOne({ _id });

        if (!todoDeleted) {
            return serviceResponse(false, { error: 'Todo could not be deleted' });
        }

        return serviceResponse(true, { message: 'Todo remove' });
    } catch (error) {
        throw error;
    }
}

module.exports = {
    verifyCreateFields,
    verifyUpdateFields,
    create,
    findAll,
    findOneByID,
    changeDone,
    updateOneByID,
    deleteOneByID
}