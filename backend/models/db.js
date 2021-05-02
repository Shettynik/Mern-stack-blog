const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI,{
    dbName: process.env.DB_NAME,
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Mongoose connected sucessfully!!')
})
.catch((err)=>{
    console.log('Error: ', err.message)
});