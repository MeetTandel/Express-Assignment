const express = require('express')
const fs = require("fs");
const router = express.Router();

const path = `${__dirname}/data`;
console.log(path);

router.get("/", function (req, res) {
    res.send("Character secondary path");
  });

//get request
router.get("/studentList", function (req, res){
    fs.readFile(`${path}/studentList.json`, function (err, data) {
        if (err) {
            console.log("Error in reading file", err);
        }
        else {
            const studentList = JSON.parse(data);
            console.log("data read from file", studentList);
            res.send(studentList);
        }
    })
})

//get request 
router.get("/getDetails", function (req, res) {
    fs.readFile(`${path}/student.json`, function (err, data) {
        if (err) {
            console.log("Error in reading file", err);
        }
        else {
            const dataFromFile = JSON.parse(data);
            console.log("data read from file", dataFromFile);
            res.send(dataFromFile);
        }
    })
})

//post request
router.post("/add", function (req, res) {
    const studentDetails = req.body;
    console.log("Data from client side ", studentDetails);
    fs.writeFile(
        `${path}/student.json`,
        JSON.stringify(studentDetails),
        function (err) {
            if (err) {
                console.log("Error in writing file", err);
            }
            else {
                console.log("File written successfully");
                res.send({ "result": "Success" })
            }
        })
})

module.exports = router;