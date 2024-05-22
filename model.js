const tf = require('@tensorflow/tfjs-node');

class Model{
    #model;
    static #instance

    getModel(){
        return this.#model;
    }

    async loadModel(){
        this.#model = await tf.loadGraphModel(process.env.MODEL_URL);
    }

    static getInstance(){
        if(this.#instance){
            return this.#instance;
        }
        return this.#instance = new Model();
    }
}

module.exports = Model;