const crypto = require('crypto');
const predict = require('../util/predict');
const {storeData} = require('../util/firestore');

async function getPredict(request, h){
    const { image } = request.payload;

    //predict
    const { label, suggestion } = await predict(image);

    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const data = {
        id: id,
        result: label,
        suggestion: suggestion,
        createdAt: createdAt,
    }

    await storeData(data);

    const response = h.response({
        status: "success",
        message: "Model is predicted successfully",
        data: data,
    });
    response.type("application/json");
    response.code(201);

    return response;
}

module.exports = getPredict;