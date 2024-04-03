import pool from "../Database/db.js"

class OrderController{
    async get_all(req, res){
        const user_id = req.params.user_id;
        const order = await pool.query("SELECT * FROM Orders WHERE customer_id=$1", [user_id]);
        res.status(200).json(order.rows);
    }

    async get(req, res){
        const {user_id, order_id} =  req.params;
        console.log(typeof order_id);
        const order = await pool.query("SELECT * FROM Orders WHERE id=$1 AND customer_id=$2", [order_id, user_id]);
        res.status(200).json(order.rows[0]);
    }

    async create(req, res){
        if(!req.store.sessions[req.session.id]){
            res.status(401).json("Unauthorized access");
            return;
        }
        const email = req.session.email;
        const response = await pool.query("SELECT * FROM users WHERE email=$1", [email]);
        const authenticatedUser = response.rows[0];

        const {menu_item_id, quantity} = req.body;
        const customer_id = authenticatedUser.id;
        
        const order = await pool.query("INSERT INTO Orders (customer_id, menu_item_id, quantity) VALUES($1, $2, $3) RETURNING *",
        [customer_id, menu_item_id, quantity]);
        res.status(200).json(order.rows[0]);
    }

    async delete(req, res){
        const {user_id, order_id} =  req.params;
        await pool.query("DELETE FROM Orders WHERE id=$1 AND customer_id=$2", [order_id, user_id]);
        res.status(200).json();
    }
}

export default new OrderController();