module.exports = {
    port: process.env.PORT || 3000,
    databaseUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/todoList'
};