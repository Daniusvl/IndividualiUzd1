CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    phone_number VARCHAR(15),
    address TEXT,
    role VARCHAR(255) NOT NULL DEFAULT 'user'
);

CREATE TYPE categories AS ENUM('appetizer', 'main course', 'dessert');

CREATE TABLE Menu (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    description TEXT,
    price DECIMAL(10,2),
    category categories
);

CREATE TABLE Orders (
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES Users(id),
    menu_item_id INT REFERENCES Menu(id),
    quantity INT
);