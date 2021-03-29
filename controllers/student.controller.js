const { Student } = require('../models');
const config = require('../config');
// const express = require('express');


const create = async (req, res) => {//creating documents
  console.log('create stu');

  const {roll_no,classs,name,subject } = req.body;

  let status;
  let message;

  try {
    const stu = new Student({ roll_no,classs,name,subject });
    await stu.save();
    status = 200;
    message = 'Student created successfully';
  } catch (err) {
    console.log('Some error occured', err);
    console.log(err.stack);
    status = 400;
    message = 'Bad request';
  }

  res.status(status).send({ message });
}


const getAll = async (req, res) => {//get all documents
  let status;
  let message;

  const { filterByName } = req.query;
  
  console.log(filterByName);
  try {
    const query = {};
    if (filterByName) {
      query['roll_no'] = filterByName;
    }
    message = await Student.find();
    status = 200;
  } catch(err) {
    console.log('Some error occured', err);
    console.log(err.stack);
    status = 400;
    message = 'Bad request'
  }
  res.status(status).send({ message: message.map((stu) => ({
    roll_no:stu.roll_no,
    classs:stu.classs,
    name:stu.name,
   subject:stu.subject
  })) });
}


const getByRollNo = async (req, res) => {//get by roll_no
  console.log(req.params);
  const { rollno } = req.params;

  let status;
  let message;

  try {
    const stu = await Student.find({ roll_no: rollno});
    status = 200;
    message = stu;
    

  } catch(err) {
    console.log('Some error occured', err);
    console.log(err.stack);
    status = 400;
    message = 'Bad request!!!'
  }

  res.status(status).send({ message });
}


const deleteByRollNo = async (req, res) => {//delete by roll_no
  console.log(req.params);
  const { rollno } = req.params;

  let status;
  let message;

  try {
    const stu = await Student.deleteOne({ roll_no: rollno});
    status = 200;
    message = `Removed document with roll_no:${rollno}`;

  } catch(err) {
    console.log('Some error occured', err);
    console.log(err.stack);
    status = 400;
    message = 'Bad request!!!'
  }

  res.status(status).send({ message });
}

const deleteByName = async (req, res) => {//delete by name
  console.log(req.params);
  const { name } = req.params;

  let status;
  let message;

  try {
    const stu = await Student.deleteOne({ name: name});
    status = 200;
    message = `Removed document with name:${name}`;

  } catch(err) {
    console.log('Some error occured', err);
    console.log(err.stack);
    status = 400;
    message = 'Bad request!!!'
  }

  res.status(status).send({ message });
}


const sortByRollNo = async (req, res) => {//sort by roll_no
  let status;
  let message;

  const { filterByRollNo } = req.query;
  
  console.log(filterByRollNo);
  try {
    const query = {};
    if (filterByRollNo) {
      query['roll_no'] = filterByRollNo;
    }
    message = await Student.find().sort({roll_no:-1});
    status = 200;
  } catch(err) {
    console.log('Some error occured', err);
    console.log(err.stack);
    status = 400;
    message = 'Bad request'
  }
  res.status(status).send({ message: message.map((stu) => ({
    roll_no:stu.roll_no,
    classs:stu.classs,
    name:stu.name,
   subject:stu.subject
  })) });
}


const sortByName = async (req, res) => {//sort by name
  let status;
  let message;

  const { filterByName } = req.query;
  
  console.log(filterByName);
  try {
    const query = {};
    if (filterByName) {
      query['name'] = filterByName;
    }
    message = await Student.find().sort({name:1});
    status = 200;
  } catch(err) {
    console.log('Some error occured', err);
    console.log(err.stack);
    status = 400;
    message = 'Bad request'
  }
  res.status(status).send({ message: message.map((stu) => ({
    roll_no:stu.roll_no,
    classs:stu.classs,
    name:stu.name,
   subject:stu.subject
  })) });
}
const updateByRollNo=async(req,res)=>{//update by roll_no
    const { rollno } = req.params;
    console.log("updating "+req.params)
    let status;
    let message;
    const name=req.body.name;
    const classs=req.body.classs;
    const subject=req.body.subject;
    try {
      const stu = await Student.findOne({roll_no:rollno});
      if(name)
      stu.name=name;
      if(classs)
      stu.classs=classs;
      if(subject)
      stu.subject=subject;
      await stu.save();
      status = 200;
      message = "Updated Student data of roll Number "+rollno;

    } catch(err) {
      console.log('Some error occured', err);
      console.log(err.stack);
      status = 400;
      message = 'Bad request!!!'
    }
  
    res.status(status).send({ message });
  }

  const updateByName=async(req,res)=>{//update by name
    const { name } = req.params;
    console.log("updating "+req.params)
    let status;
    let message;
    const roll_no=req.body.roll_no;
    const classs=req.body.classs;
    const subject=req.body.subject;
    try {
      const stu = await Student.findOne({name:name});
      if(roll_no)
      stu.roll_no=roll_no;
      if(classs)
      stu.classs=classs;
      if(subject)
      stu.subject=subject;
      await stu.save();
      status = 200;
      message = "Updated Student data of Name "+name;

    } catch(err) {
      console.log('Some error occured', err);
      console.log(err.stack);
      status = 400;
      message = 'Bad request!!!'
    }
  
    res.status(status).send({ message });
  }

module.exports = {//export all the above
  create,
    getAll,
    getByRollNo,
     deleteByRollNo,
     deleteByName,
     sortByName,
     sortByRollNo,
      updateByRollNo,
      updateByName
}