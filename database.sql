CREATE DATABASE products_db;
CREATE TABLE products( code SERIAL PRIMARY KEY NOT NULL,NAME  TEXT NOT NULL);
CREATE TABLE suppliers(code SERIAL PRIMARY KEY NOT NULL,NAME TEXT  NOT NULL);
CREATE TABLE product_prices ( id SERIAL PRIMARY KEY, product_code INT NOT NULL REFERENCES products(code), supplier_code INT NOT NULL REFERENCES suppliers(code), price INT NOT NULL, currency VARCHAR(3) NOT NULL, start_date DATE NOT NULL, end_date DATE NOT NULL );

INSERT INTO products (name) VALUES ('Happy Life Rust Remover'), ('Happy Life Metal Polish'), ('8N Care Car Wash Shampoo'),('8N Care Tire Shine'),('8N Care Wax');


INSERT INTO suppliers (name) VALUES('Supplier 1'),('Supplier 2'),('Supplier 3');