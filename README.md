# Meteor demo - Setup and Local Run Guide

This project runs a Meteor + React application in Docker and uses MySQL as the data source.

## Prerequisites

Make sure you have installed:

- Docker
- Docker Compose

## Environment / Database Credentials

Current database settings:

- Database: `db_demo`
- User: `meteor`
- Password: `meteor`
- Root password: `root`

## How to Start the Project. At the project folder run commands:

1. For a clean first run:

```
docker compose down -v
```

2. Then start the project:

```
docker compose up --build -d
```

3. To launch app - open browser:

```
http://localhost:3000/
```

4. To proceed development:

```
meteor npm i
```

## How to test app via create/edit items at database

1. Connect to Database

```
docker exec -it meteor-mysql mysql -uroot -proot db_demo
```

2. After connecting to MySQL:

```
SHOW TABLES;
```

You should see tables similar to:
 - customers
 - positions
 - translations

3. How to Change Position for an Existing Customer:

```
UPDATE customers
SET position_id = 2
WHERE id = 1;
```

You should see change at meteor app

4. How to Add a New Customer:

```
INSERT INTO customers (full_name, position_id)
VALUES ('John Doe', 1);
```