const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB Atlas
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Conectado a MongoDB Atlas");
    } catch (err) {
        console.error("Error conectando a MongoDB:", err);
        process.exit(1);
    }
};

connectDB();

// Importar rutas
const authRoutes = require('./routes/authRoutes');

// Usar rutas
app.use('/api', authRoutes);

// Ruta principal
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 