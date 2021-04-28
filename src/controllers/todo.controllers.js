const todoServices = require('./../services/todo.services');
const { controllerResponse } = require('../utils/response.utils');
const { verifyID } = require('./../utils/mongo.utils');

const create = async (req, res) => {
    let response = {};

    const emptyFields = todoServices.verifyCreateFields(req.body);
    if (!emptyFields.success) {
        response = controllerResponse(false, 400, emptyFields.content);
        return res.status(400).json(response);
    }

    try {
        const createTodo = await todoServices.create(req.body);
        if (!createTodo.success) {
            response = controllerResponse(false, 409, createTodo.content);
            return res.status(409).json(response);
        }

        response = controllerResponse(true, 201, createTodo.content);
        return res.status(201).json(response);
    } catch (error) {
        response = controllerResponse(false, 500, { error: "Internal Server Error" });
        return res.status(500).json(response);
    }
}

const findAll = async (req, res) => {
    let response = {};

    try {
        const todos = await todoServices.findAll();
        response = controllerResponse(true, 200, todos.content, todos.todo);
        return res.status(200).json(response);
    } catch (error) {
        response = controllerResponse(false, 500, { error: "Internal Server Error" });
        return res.status(500).json(response);
    }
}

const findOneByID = async (req, res) => {
    let response = {};
    const { id } = req.params;

    if (!verifyID(id)) {
        response = controllerResponse(false, 400, { error: "Error in ID" });
        return res.status(400).json(response);
    }

    try {
        const todoExists = await todoServices.findOneByID(id);
        if (!todoExists.success) {
            response = controllerResponse(false, 404, todoExists.content);
            return res.status(404).json(response);
        }

        response = controllerResponse(true, 200, todoExists.content, todoExists.todo);
        return res.status(200).json(response);
    } catch (error) {
        response = controllerResponse(false, 500, { error: "Internal Server Error" });
        return res.status(500).json(response);
    }
}

const changeDone = async (req, res) => {
    let response = {};
    const { id } = req.params;

    if (!verifyID(id)) {
        response = controllerResponse(false, 400, { error: "Error in ID" });
        return res.status(400).json(response);
    }

    try {
        const todoExists = await todoServices.findOneByID(id);
        if (!todoExists.success) {
            response = controllerResponse(false, 404, todoExists.content);
            return res.status(404).json(response);
        }

        const todoChangeDone = await todoServices.changeDone(todoExists.todo);
        if (!todoChangeDone.success) {
            response = controllerResponse(false, 409, todoChangeDone.content);
            return res.status(409).json(response);
        }

        response = controllerResponse(true, 200, todoChangeDone.content);
        return res.status(200).json(response);
    } catch (error) {
        response = controllerResponse(false, 500, { error: "Internal Server Error" });
        return res.status(500).json(response);
    }
}

const updateOneByID = async (req, res) => {
    let response = {};
    const { id } = req.params;

    if (!verifyID(id)) {
        response = controllerResponse(false, 400, { error: "Error in ID" });
        return res.status(400).json(response);
    }

    const fieldVerifed = todoServices.verifyUpdateFields(req.body);
    if (!fieldVerifed.success) {
        response = controllerResponse(false, 400, fieldVerifed.content);
        return res.status(400).json(response);
    }

    try {
        const todoExists = await todoServices.findOneByID(id);
        if (!todoExists.success) {
            response = controllerResponse(false, 404, todoExists.content);
            return res.status(404).json(response);
        }

        const todoUpdated = await todoServices.updateOneByID(todoExists.todo, fieldVerifed.todo);
        if (!todoUpdated.success) {
            response = controllerResponse(false, 409, todoUpdated.content);
            return res.status(409).json(response);
        }

        response = controllerResponse(true, 200, todoUpdated.content);
        return res.status(200).json(response);
    } catch (error) {
        response = controllerResponse(false, 500, { error: "Internal Server Error" });
        return res.status(500).json(response);
    }
}

const deleteOneByID = async (req, res) => {
    let response = {};
    const { id } = req.params;

    if (!verifyID(id)) {
        response = controllerResponse(false, 400, { error: "Error in ID" });
        return res.status(400).json(response);
    }

    try {
        const todoExists = await todoServices.findOneByID(id);
        if (!todoExists.success) {
            response = controllerResponse(false, 404, todoExists.content);
            return res.status(404).json(response);
        }

        const todoDeleted = await todoServices.deleteOneByID(todoExists.todo);
        if (!todoDeleted.success) {
            response = controllerResponse(false, 409, todoDeleted.content);
            return res.status(409).json(response);
        }

        response = controllerResponse(true, 200, todoDeleted.content);
        return res.status(200).json(response);
    } catch (error) {
        response = controllerResponse(false, 500, { error: "Internal Server Error" });
        return res.status(500).json(response);
    }



    res.send('todo delete');
}

module.exports = {
    create,
    findAll,
    findOneByID,
    updateOneByID,
    deleteOneByID,
    changeDone
}