const {Firestore} = require("@google-cloud/firestore");

const db = new Firestore({projectId: process.env.GCLOUD_PROJECT });

async function storeData(data) {
    // Membuat Collection root-level
    const collections = db.collection('predictions');

    return collections.doc(data.id).set(data);
}

async function getData(){
    const collections = db.collection('predictions');

    return (await collections.get()).docs;
}

module.exports = {storeData, getData};