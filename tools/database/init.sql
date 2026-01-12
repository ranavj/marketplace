-- Microservices Databases creation
CREATE DATABASE "auth-db";
CREATE DATABASE "catalog-db";
CREATE DATABASE "order-db";
CREATE DATABASE "payment-db";

-- Grant privileges (Optional locally, but good practice)
GRANT ALL PRIVILEGES ON DATABASE "auth-db" TO admin;
GRANT ALL PRIVILEGES ON DATABASE "catalog-db" TO admin;
GRANT ALL PRIVILEGES ON DATABASE "order-db" TO admin;
GRANT ALL PRIVILEGES ON DATABASE "payment-db" TO admin;