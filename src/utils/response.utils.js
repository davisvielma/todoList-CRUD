const serviceResponse = (success, contentResponse, todoResponse = []) => {
    return {
        success,
        content: contentResponse,
        todo: todoResponse
    }
}

const controllerResponse = (success, status, contentResponse, todo = []) => {
    return {
        success,
        status,
        message: contentResponse,
        data: {
            todo
        }
    }
}

module.exports = {
    serviceResponse,
    controllerResponse
}