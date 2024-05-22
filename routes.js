const getPredict = require('./handler/getPredict')
const getHistories = require('./handler/getHistories')

const routes = [
    {
        method: "POST",
        path: "/predict",
        handler: getPredict,
        options: {
            payload: {
                allow: 'multipart/form-data',
                multipart: true,
                maxBytes: 1000000
            }
        }
    },
    {
        method: "GET",
        path: "/predict/histories",
        handler: getHistories,
    }
];

module.exports = routes;