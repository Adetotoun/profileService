# Profile Intelligence API

A backend service that accepts a name, enriches it using multiple external APIs, processes the data, and stores it in a MongoDB database. The API exposes endpoints to create, retrieve, filter, and delete profiles.

**Base URL**
https://genderize-api-integration.vercel.app

**Example Endpoint**
https://genderize-api-integration.vercel.app/api/profiles?name=John


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


### Error Codes

| Status Code | Meaning                                |
| ----------- | -------------------------------------- |
| 400         | Missing or empty name                  |
| 422         | Invalid input type                     |
| 404         | Profile not found                      |
| 502         | External API returned invalid response |
| 500         | Internal server error                  |




