# School Location API

This is a backend API built with **Node.js**, **Express**, and **MySQL** that allows you to manage school data, including adding new schools and listing schools based on proximity to a user's location using the Haversine formula.

## Features

- **Add School**: Add a new school to the database.
- **List Schools**: Retrieve a list of schools sorted by proximity to the user's location.

## Tech Stack

- **Node.js**: JavaScript runtime for building scalable applications.
- **Express**: Web framework for Node.js to handle routing and middleware.
- **MySQL**: Relational database for storing school data.
- **Haversine Formula**: Used to calculate the distance between two geographical points (latitude and longitude).
- **dotenv**: To manage environment variables.
- **cookie-parser**: For parsing cookies.

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/JatinDhamija816/Educase-assign
cd Educase-assign
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a .env file

```bash
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=school_db
DB_PORT=3306
```

### 4. Run MySQL

Make sure MySQL is running and the database school_db exists. If not, create the database using:

```bash
CREATE DATABASE school_db;
```

### 5. Start the server

```bash
npm start
```

The server will start on http://localhost:5000.

## API Endpoints

### 1. Add a School

- **URL**: /api/v1/schools
- **Method**: POST
- **Request Body**:

```bash
{
  "name": "Arys Girls School",
  "address": "GT Road, Panipat",
  "latitude": 37.7749,
  "longitude": -122.4194
}
```

- **Response**:

```bash
{
  "success": true,
  "statusCode": 201,
  "message": "School added successfully.",
  "data": {
    "id": 1,
    "name": "Arys Girls School",
    "address": "GT Road, Panipat",
    "latitude": 37.7749,
    "longitude": -122.4194
  },
}
```

### List Schoold by Proximity

- **URL**: /api/v1/schools
- **Method**: GET
- **Quesry Parameters**:
  - latitude: The user's latitude (required).
  - longitude: The user's longitude (required).
    Example

```bash
http://localhost:5000/api/v1/schools?latitude=37.7749&longitude=-122.4194
```

- **Response**

```bash
{
  "success": true,
  "statusCode": 200,
  "message": "Schools fetched and sorted by proximity.",
  "data": [
    {
      "id": 1,
      "name": "Greenwood High School",
      "address": "123 Park Street, Springfield",
      "latitude": 37.7749,
      "longitude": -122.4194,
      "distanceInMeters": 0
    }
  ]
}

```
