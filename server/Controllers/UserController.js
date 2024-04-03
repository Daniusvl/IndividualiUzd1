import pool from "../Database/db.js"

class UserController{
    async get_all(req, res){
        const user = await pool.query("SELECT * FROM users");
        res.status(200).json(user.rows);
    }

    async get(req, res){
        const id = req.params.id;
        const user = await pool.query("SELECT * FROM users WHERE id=$1", [id]);
        res.status(200).json(user.rows[0]);
    }

    async create(req, res){
        const {name, email, password, phone_number, address} = req.body;

        let errors = [];

        if(!name || typeof name != 'string'){
            errors.push({name:"invalid name value"});
        }
        let splited_email1 = email.split("@")[0];
        let splited_email2 = email.split("@")[1];
        let splited_email3 = email.split(".")[1];
        if(!email || typeof email != 'string' || !email.includes("@") || !email.includes(".") || splited_email1.length == 0 || splited_email2.length == 0 || splited_email3.length == 0){
            errors.push({email:"invalid email value"});
        }

        if(!password || typeof password != 'string' || password.length < 5){
            errors.push({password:"invalid password value"});
        }

        if(!phone_number || typeof phone_number != 'string' || !phone_number.startsWith("+370")){
            errors.push({phone_number:"invalid phone number value"});
        }

        if(!address || typeof address != 'string'){
            errors.push({address:"invalid address value"});
        }

        if(errors.length > 0){
            res.status(401).json(errors);
            return;
        }

        const role = "customer";
        const user = await pool.query("INSERT INTO users (name, email, password, phone_number, address, role) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
        [name, email, password, phone_number, address, role]);
        res.status(200).json(user.rows[0]);
    }

    async update(req, res){
        const {id, name, email, password, phone_number, address, role} = req.body;
        const user = await pool.query("UPDATE users SET name=$2, email=$3, password=$4, phone_number=$5, address=$6, role=$7 WHERE id=$1 RETURNING *",
        [id, name, email, password, phone_number, address, role]);
        res.status(200).json(user.rows[0]);
    }

    async delete(req, res){
        const id = req.params.id;
        await pool.query("DELETE FROM users WHERE id=$1", [id]);
        res.status(200).json();
    }
}

export default new UserController();