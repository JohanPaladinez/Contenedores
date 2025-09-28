#Despliegue con Docker Compose

##//Arquitectura:

        Proyecto/
        ├─ Convergentes/                      # Backend (Node/Express/Mongoose)
        │  ├─ Dockerfile
        │  └─ src/
        │    └─ db.js
        ├─ Convergentes-FAPPSC/               # Frontend (Vite/React)
        │  ├─ Dockerfile
        │  ├─ src/
        │    └─ api/
        │       └─ axios.js                  # <- Configuración del cliente Axios
        │ 
        └─ docker-compose.yml                 # Orquestación de 3 servicios


##//Despliegue rapido:
##Clonar repositorios

      cd /Proyecto
      https://github.com/JohanPaladinez/Convergentes.git
      https://github.com/JohanPaladinez/Convergentes-FAPPSC


//Archivos_Clave:

##docker-compose.yml

      version: "3.9"
      
      services:
        mongo:
          image: mongo:6
          container_name: mongo_container
          restart: always
          environment:
            MONGO_INITDB_ROOT_USERNAME: admin
            MONGO_INITDB_ROOT_PASSWORD: password123
          ports:
            - "27017:27017"
          networks: [app_network]
      
        backend:
          build: ./Convergentes
          container_name: backend_container
          restart: always
          command: ["node", "src/index.js"]
          working_dir: /usr/src/app
          volumes:
            - ./Convergentes:/usr/src/app
          environment:
            - PORT=3000
            - MONGO_URI=mongodb://admin:password123@mongo:27017/appdb?authSource=admin
          depends_on: [mongo]
          ports:
            - "3000:3000"
          networks: [app_network]
      
        frontend:
          build: ./Convergentes-FAPPSC
          container_name: frontend_container
          restart: always
          command: ["npm", "run", "dev", "--", "--host"]
          working_dir: /usr/src/app
          volumes:
            - ./Convergentes-FAPPSC:/usr/src/app
          depends_on: [backend]
          ports:
            - "5173:5173"
          networks: [app_network]
      
      networks:
        app_network:
          driver: bridge


##Convergentes/Dockerfile(Backend)

    FROM node:18
    WORKDIR /usr/src/app
    COPY package*.json ./
    RUN npm install
    COPY . .
    EXPOSE 3000
    CMD ["node", "src/index.js"]


#Convergentes-FAPPSC/Dockerfile (Frontend)

    FROM node:18
    WORKDIR /usr/src/app
    COPY package*.json ./
    RUN npm install
    COPY . .
    EXPOSE 5173
    CMD ["npm", "run", "dev", "--", "--host"]



#Convergentes/src/db.js

    import mongoose from "mongoose";
    
    const DB_USER = "admin"; // Usuario de MongoDB
    const DB_PASSWORD = "password123"; // Contraseña del usuario
    const DB_HOST = "172.21.162.162"; // O IP del servidor MongoDB
    const DB_PORT = "27017"; // Puerto en el que corre MongoDB
    const DB_NAME = "appdb"; // Nombre de la base de datos
    
    const mongoURI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_N>export const connectDB = async () => {
        try {
            await mongoose.connect(mongoURI);
            console.log("DB is connected");
            console.log(mongoURI);
        } catch (error) {
            console.log(error);
        }
    
    }




##Convergentes-FAPPSC/src/api/axios.js

    import axios from "axios";
    
    const instace = axios.create({
      baseURL: "http://172.21.162.162:3000/api",
      withCredentials: true,
    });
    
    export default instace;


#Convergentes/src/controllers/auth.controller.js

    import User from "../models/user.model.js";
    import bcrypt from "bcryptjs";
    import jwt from "jsonwebtoken";
    import { TOKEN_SECRET } from "../config.js";
    import { createAccessToken } from "../libs/jwt.js";
    
    export const register = async (req, res) => {
      const { username, email, password } = req.body;
      try {
        const userFound = await User.findOne({ email });

    if (userFound) return res.status(400).json(["The email is already in use"]);

    // hashing the password
    const passwordHash = await bcrypt.hash(password, 10);

    // creating the user
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });

    // saving the user in the database
    const userSaved = await newUser.save();

    // create access token
    const token = await createAccessToken({
      id: userSaved._id,
    });

    res.cookie("token", token);

    res.json({
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
    });
      } catch (error) {
    res.status(500).json({ message: error.message });
      }
    };
    
    export const login = async (req, res) => {
      try {
        const { email, password } = req.body;
        const userFound = await User.findOne({ email });

    if (!userFound)
      return res.status(400).json({
        message: ["The email does not exist"],
      });

    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(400).json({
        message: ["The password is incorrect"],
      });
    }

    const token = await createAccessToken({
      id: userFound._id,
      username: userFound.username,
    });

    res.cookie("token", token);

    res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      token,
    });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    };


//Despliegue rapido
##Construir imágenes

    docker-compose build

##Levantar servicios

    docker-compose up -d

##Verificar

    docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'


##//Obtener IP del Contenedor:

        hostname -I
        # o
        ip -4 addr show | grep -E 'inet .* (enp|wlp|eth|br)'




//Pruebas rapidas

      docker logs -f mongo_container
      docker logs -f backend_container
      docker logs -f frontend_container


//Conexion a Mongo

    docker exec -it mongo_container mongosh -u admin -p password123 --        authenticationDatabase admin


#Por ultimo ir al navegador y con la direccion ip del contenedor y verificar
#que realmente funcionaba registrando un nuevo usuario y ingresando a su perfil


