const Hapi = require("@hapi/hapi");
const Model = require("./model");
const routes = require("./routes");
const InputError = require("./exceptions/inputError");
const LargeInput = require("./exceptions/largeInput");

require('dotenv').config()

const init = async () => {
    const server = Hapi.server({
        port: process.env.PORT,
        host: '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
            }
        }
    });


    //load model
    await Model.getInstance().loadModel();

    server.route(routes)


    //extension onPreResponse:
    server.ext('onPreResponse', function(request, h) {
        const response = request.response;

        if(response instanceof InputError || response instanceof LargeInput){
            const newResponse = h.response({
                status:'fail',
                message: response.message
            })
            newResponse.code(response.statusCode);
            return newResponse;
        }

        if(response.isBoom){
            const newResponse = h.response({
                status: 'fail',
                message: response.message
            })
            newResponse.code(response.output.statusCode);
            return newResponse;
        }

        return h.continue
    })


    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();