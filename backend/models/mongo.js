var mongoose = require('mongoose');
// mongodb connection

async function init() {
    try {
        //await mongoose.connect('mongodb+srv://LibraryUser:LibraryUser@cluster0-ccih7.mongodb.net/ChatApp?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true});
        await mongoose.connect('mongodb+srv://neeru:neeru@cluster0-6qdoa.mongodb.net/Udemy?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true});
        console.log('connected to mongodb');
    } catch (error) {
        console.log("error in mongodb connnection");
        console.log(error);
    }
}

init();