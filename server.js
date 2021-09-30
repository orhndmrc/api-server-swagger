require('dotenv').config();
const fs = require('fs')
const userList = require('./user.json')
const express = require("express");
const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
import bodyParser from 'body-parser';
import {findUserById } from "./userFunction";
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json())
//const userList = getUserList(); // assume for now this is your database

// GET Call for all users
app.get("/users", (req, res) => {
  return res.status(200).send({
    success: "true",
    message: "users",
    users: userList,
  });
});
app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const userFound=findUserById(id,userList)

  if(id!=parseInt(id)){
    return res.status(400).send({
      success: 'false',
      message: 'user not valid',
    });
  }

  if (!userFound) {
    return res.status(404).send({
      success: 'false',
      message: 'user not found',
    });
  }
  return res.status(200).send({
    success: "OK",
    message: "User found",
    user: userFound,
  });
});

app.get("/", (req, res) => {
  return res.status(200).send({
    success: "true",
    message: "users",
    users: userList,
  });
});

//  POST call - Means you are adding new user into database 

app.post("/addUser", (req, res) => {

  if (!req.body.name) {
    return res.status(400).send({
      success: "false",
      message: "name is required",
    });
  } else if (!req.body.companies) {
    return res.status(400).send({
      success: "false",
      message: "companies is required",
    });
  }
  const user = {
    id: userList.length + 1,
    isPublic: req.body.isPublic,
    name:  req.body.name,
    companies: req.body.companies,
    books:  req.body.books
  };
  userList.push(user);
  // fs.writeFile('./user.json', JSON.stringify(userList),err=>{
  //   if(err){
  //     console.log(err)
  //   }
  
  // })
  return res.status(201).send({
    success: "true",
    message: "user added successfully",
    user,
  });
});

//  PUt call - Means you are updating new user into database 

app.put("/updateUser/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  const userFound=findUserById(id)

  if (!userFound) {
    return res.status(404).send({
      success: 'false',
      message: 'user not found',
    });
  }

  const updatedUser= {
      id: id,
      isPublic: req.body.isPublic || userFound.body.isPublic,
      name:req.body.name || userFound.body.name,
      companies: req.body.companies || userFound.body.companies,
      books: req.body.books || userFound.body.books
   
  };

  if (!updatedUser.name) {
    return res.status(400).send({
      success: "false",
      message: "name is required",
    });
  } else if (!updatedUser.companies) {
    return res.status(400).send({
      success: "false",
      message: "companies is required",
    });
  }

  for (let i = 0; i < userList.length; i++) {
      if (userList[i].id === id) {
          userList[i] = updatedUser;
          return res.status(201).send({
            success: 'true',
            message: 'user updated successfully',
            updatedUser
          
          });
      }
  }
  return  res.status(404).send({
            success: 'true',
            message: 'error in update'
           
     });
})

//  Delete call - Means you are deleting new user from database 

app.delete("/deleteUser/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  for(let i = 0; i < userList.length; i++){
      if(userList[i].id === id){
           userList.splice(i,1);
           return res.status(201).send({
            success: 'true',
            message: 'user deleted successfully'
          });
      }
  }
  return res.status(404).send({
              success: 'true',
              message: 'error in delete'   
    });
})
app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.warn(`App listening on http://localhost:${PORT}`);
});

