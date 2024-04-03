import pool from "../Database/db.js"

class MenuController{
    async get_all(req, res){
        const menu = await pool.query("SELECT * FROM Menu");
        res.status(200).json(menu.rows);
    }

    async get(req, res){
        const id = req.params.id;
        const menu = await pool.query("SELECT * FROM Menu WHERE id=$1", [id]);
        res.status(200).json(menu.rows[0]);
    }

    async create(req, res){
        const {name, description, price, category} = req.body;
        const menu = await pool.query("INSERT INTO Menu (name, description, price, category) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, description, price, category]);
        res.status(200).json(menu.rows[0]);
    }

    async update(req, res){
        const {id, name, description, price, category} = req.body;
        const menu = await pool.query("UPDATE Menu SET name=$2, description=$3, price=$4, category=$5 WHERE id=$1 RETURNING *",
        [id, name, description, price, category]);
        res.status(200).json(menu.rows[0]);
    }

    async delete(req, res){
        const id = req.params.id;
        await pool.query("DELETE FROM Menu WHERE id=$1", [id]);
        res.status(200).json();
    }
}

export default new MenuController();