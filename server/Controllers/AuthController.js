import pool from "../Database/db.js"

class AuthController{

    async login(req, res){

        if(req.session.authenticated){
            res.status(200).json(req.session);
            return;
        }

        const {email, password} = req.body;
        const response = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
        if(response.rowCount == 0){
            res.status(401).json({error: "Incorrect username or password"});
            return;
        }
        const user = response.rows[0];
        if(user.password != password){
            res.status(401).json({error: "Incorrect username or password"});
            return;
        }
       
        req.session.authenticated = true;
        req.session.email = user.email;
        res.status(200).json(req.session.id);
    }

    async logout(req, res){
        req.session.destroy();

        res.status(200).json();
    }

}

export default new AuthController();