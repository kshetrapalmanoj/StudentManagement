const express = require('express');
const studentController = require('./controllers/student.controller');
// const { Student } = require('./models');

const studentRouter = express.Router();

studentRouter.post('/', studentController.create);//create document
studentRouter.get('/', studentController.getAll);//get all documents
studentRouter.get('/:rollno', studentController.getByRollNo); // /students/2
studentRouter.delete('/deleteroll/:rollno',studentController.deleteByRollNo);///students/deleteroll/2
studentRouter.delete('/deletename/:name',studentController.deleteByName);///students/deletename/Manoj
studentRouter.get('/sortname/:name',studentController.sortByName)//sort by name students/sort/name'
studentRouter.get('/sortnumber/:roll_no',studentController.sortByRollNo)//sort by roll_no students/sort/roll_no'
studentRouter.put('/updaterollno/:rollno', studentController.updateByRollNo);//students/updaterollno/1
studentRouter.put('/updatename/:name', studentController.updateByName);//students/updatename/Manoj

const routes = (app) => {

  app.use('/students', studentRouter);

  app.get('/', (req, res) => {
    return res.send({ message: "Student Service Up!"});
  }) 
}

module.exports = routes;