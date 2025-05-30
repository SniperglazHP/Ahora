const User = require('../models/User');
const bcrypt = require('bcryptjs');

const authController = {
    async register(req, res) {
        try {
            const { username, password } = req.body;
            
            // Verificar si el usuario ya existe
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ message: "El usuario ya existe" });
            }

            // Encriptar la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Crear nuevo usuario
            const user = new User({
                username,
                password: hashedPassword
            });

            await user.save();
            res.status(201).json({ message: "Usuario creado exitosamente" });
        } catch (error) {
            console.error("Error en registro:", error);
            res.status(500).json({ message: "Error al crear el usuario" });
        }
    },

    async login(req, res) {
        try {
            const { username, password } = req.body;

            // Buscar usuario en la base de datos
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(401).json({ message: "Credenciales inválidas" });
            }

            // Verificar contraseña
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ message: "Credenciales inválidas" });
            }

            res.status(200).json({ 
                message: "Login exitoso",
                user: {
                    username: user.username,
                    id: user._id
                }
            });
        } catch (error) {
            console.error("Error en login:", error);
            res.status(500).json({ message: "Error en el servidor" });
        }
    },


    // Crear, Borrar y Editar usuarios


    async Crear(req, res) {
        try {
            //const { email } = req.body;
            const user = new User(req.body);
        

        
            //lit no regresa nada si no existe el correo
            /*const found = await User.findOne(
              {'email': email}
            )
        
            if (found && found.email == email){
              return res.status(403).send('Email already taken, please use another one');
            }
        */
            await user.save()
        
            res.setHeader('Content-Type', 'application/json');
            return res.send('Registration done! Thanks for registering.' );
          } catch (error) {
            return res.status(500).send(`[register] Something wrong at:  ${error}`);
          }
},

async Borrar(req, res) {
    try {
        const { username } = req.body;
        const usr = await User.deleteOne({ username: username})

        res.setHeader('Content-Type', 'application/json');
        const answer = usr.acknowledged;
        return res.status(200).send(answer);
    
      } catch (error) {
        return res.status(500).send(`[del.coll] Something wrong at:  ${error}`);
      }
},

async Editar(req, res) {
    try {
        const { query, data } = req.body;
  //previni que si esta vacio no se modifique el campo
        Object.keys(data).forEach(key => {
            if (!data[key]) delete data[key];
          });
    
        const user = await User.updateOne(
          {username: query}, {$set: data}
        )
        console.log(data)
    
        const answer = user.acknowledged;
        return res.status(200).send(answer);
        
      } catch (error) {
        return res.status(500).send(`[modify] Something wrong at:  ${error}`);
      }
},

async Listar(req, res) {
    try {
       const users_found = await User.find({})

        res.setHeader('Content-Type', 'application/json');
        return res.status(200).send(users_found);
      } catch (error) {
        return res.status(500).send(`[find_users] Something wrong at:  ${error}`);
      }
},

}



module.exports = authController; 