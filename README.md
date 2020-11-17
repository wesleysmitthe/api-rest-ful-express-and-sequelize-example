## Example of **rest full api** using express and Sequelize v6 

this project is an example of **rest full api** using:  

* node.js 
* express.js
* sequelize.js
* mysql

* ---

## Requirements

* mysql
* Node V8+
* ---

## Quick start

**Obs**:  You need to have mysql installed, the `rest_api_sequelize_example` database created and the `user` table created.

* Clone the repo: git clone ${urlRepo}  
* Install the dependencies: `npm install`  
* Execute in dev mode: `npm run start:dev`  

* ---

## How to test

* **get** 
    - **getList** : Use **postman** to send a get request to `localhost:3000/api/v1/user` the return must be `{ count: 0 or users.length, data: [] or users[] }`

    - **getById** : Use **postman** to send a get request to `localhost:3000/api/v1/user/:id` the return must be `{} or user`;

* **post**
    - Use **postman** to send a post request to `localhost:3000/api/v1/user` passing in the body a json object such as bellow. The return must be the object posted. 

``` 

        {
            "username": "user1".
            "password": "pass123",
        }
```

* **put**
    - Use **postman** to send a put request to `localhost:3000/api/v1/user` passing in the body a json object such as bellow. The return must be the object puted. 

``` 

        {
            "id": 1,
            "username": "user1Changed".
            "password": "pass123Changed",
        }
```

* **delete**
    - Use **postman** to send a delete request to `localhost:3000/api/v1/user` passing in the body a json object such as bellow. The return must be the object the status of operation - `{ message: "User deleted" or "User not deleted", deleted: true or false }`. 

``` 

        {
            "id": 1,
            "username": "user1".
            "password": "pass123",
        }
```
