
const mongoose = require('mongoose');
require('dotenv').config();

const dbConnection = async () => {
    try {

        await mongoose.connect(process.env.DB_CNN );
        console.log('Concectado a la nube');
    }
    catch {
        try {
            
            await mongoose.connect(process.env.MONGODB_URI );
            console.log('Concectado localmente');
        }
        catch  (error){
            console.log(error);
            throw new Error('Error al iniciar la base de datos');
        }
    }
    //    await mongoose.connect(process.env.MONGODB_URI);
    //    console.log(process.env.MONGODB_URI);
   // await mongoose.connect(process.env.DB_CNN);
    console.log('DB Online');

    }
module.exports = {
    dbConnection
}