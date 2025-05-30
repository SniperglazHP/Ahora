const mongoose = require('mongoose');

// Verificar si el modelo ya existe
const User = mongoose.models.User || mongoose.model('User', new mongoose.Schema({
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    }
},
{ 
    collection: 'user_Register', // Nombre de la colección en MongoDB
  }
));

module.exports = User; 