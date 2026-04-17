# Profile Intelligence API

A backend service that accepts a name, enriches it using multiple external APIs, processes the data, and stores it in a MongoDB database. The API exposes endpoints to create, retrieve, filter, and delete profiles.

**Base URL**
https://profile-service-three.vercel.app

**Example Endpoint**
https://profile-service-three.vercel.app/api/profiles


## Features

* Multi-API integration (Genderize, Agify, Nationalize)
* Data enrichment and classification
* MongoDB data persistence (MongoDB Atlas)
* Idempotent profile creation (prevents duplicates)
* Filtering support (gender, country, age group)
* UUID v7 for unique IDs
* ISO 8601 UTC timestamps
* Structured error handling
* CORS enabled for external access

## External APIs Used

* https://api.genderize.io → Predicts gender
* https://api.agify.io → Predicts age
* https://api.nationalize.io → Predicts nationality

---

## Data Processing Logic

### Age Classification

| Age Range | Age Group |
| --------- | --------- |
| 0–12      | child     |
| 13–19     | teenager  |
| 20–59     | adult     |
| 60+       | senior    |


### Nationality Selection

* Select the country with the **highest probability** from the Nationalize API response.


### To Run The Project Locally
- Clone the project
- install dependencies
  -- Express
  -- Mongoose
  -- Axios
  -- Dotenv
  -- Cors
  -- UUID
- set up environment variables
  -- DB_URI = your-MongoDB-Atlas-connection-string
  -- PORT = 3000
- start the server
  -- node index.js
- test the API
  -- http://localhost:3000/api/profiles



