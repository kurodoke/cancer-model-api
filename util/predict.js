const InputError = require('../exceptions/inputError')
const Model = require('../model');

const tf = require('@tensorflow/tfjs-node');

async function predict(image){
    try{
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat()
        
        const model = Model.getInstance().getModel();

        const prediction = model.predict(tensor);
        
        const classes = ['Cancer', 'Non-cancer'];

        const classResult = tf.argMax(prediction, 1).dataSync()[0];
        
        const label = classes[classResult];

        let suggestion;

        if(label === 'Cancer'){
            suggestion = "Segera periksa ke dokter!"
        } 
    
        if(label === 'Non-cancer'){
            suggestion = "Jaga-jaga, mohon periksa ke dokter"
        }
    
        return { label, suggestion };

    } catch(err){
        throw new InputError(`Terjadi kesalahan dalam melakukan prediksi`)
    }
}

module.exports = predict;