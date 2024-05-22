const { getData } = require("../util/firestore");

async function getHistories(request, h){
    data = await getData();

    const formatedData = data.map((doc) => {
        return {
            id: doc.id,
            history: doc.data()
        }
    })

    const response = h.response({
        status: "success",
        data: formatedData,
    });
    response.type("application/json");
    response.code(200);

    return response;
}

module.exports = getHistories;