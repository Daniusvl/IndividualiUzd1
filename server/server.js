import express from "express";  
import session from "express-session";
import 'dotenv/config'

import usersRouter from "./Routes/UsersRouter.js";
import menusRouter from "./Routes/MenusRouter.js";
import ordersRouter from "./Routes/OrdersRouter.js";
import authRouter from "./Routes/AuthRouter.js";

let PORT = process.env.PORT || 5000

const server = express();

const store = new session.MemoryStore();

server.use(session({
    secret: process.env.SECRET,
    cookie: {maxAge: 1000 * 60 * 60},
    saveUninitialized: false,
    store
}));
server.use(express.json());

server.use((req, res, next) => {
    req.store = store;
    next();
});

server.use('/api', usersRouter);
server.use('/api', menusRouter);
server.use('/api', ordersRouter);
server.use("/", authRouter);

server.get('/', (req, res)=>{

    res.json("ok");
});

server.listen(PORT, () => {
    console.log("Server started on port: " + PORT.toString())
});