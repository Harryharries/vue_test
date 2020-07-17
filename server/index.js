const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(require('cors')())
app.use(express.json())

app.get('/',async(req,res) =>{
    res.send('a')
})

//add student
app.post('/api/student',async(req,res)=>{
    const student = await Student.create(req.body)
    res.send(student)
})

//delete student
app.post('/api/student/:id',async(req,res)=>{
    await Student.findByIdAndDelete(req.params.id)
    res.send({
        status:true
    })
})

//modify student
app.get('/api/update/:id',async(req,res)=>{
    const student = await Student.findById(req.params.id)
    res.send(student)
})
// conduct update student information
app.put('/api/confirmUpdate/:id',async(req,res)=>{
    const student = await Student.findByIdAndUpdate(req.params.id,req.body)
    res.send(student)
})

// query by student ID
app.get('/api/findById/:id',async(req,res)=>{
    const student = await Student.findById(req.params.id)
    res.send(student)
})

// query by student name
app.get('/api/findBynName/:name',async(req,res)=>{

    var result = {
        data:[],
        total:''
    }

    var confident = new RegExp(req.query.name)

    var query = Student.find({
        $or:[{"name":confident}]});
    query.count({},function(err,count){
        if(err){
            res.json(err)
        }else{
            result.total = count;
        }

    })
    //page number
    var pageSize = parseInt(req.query.pagzSize)
    var currentPage = parseInt(req.query.currentPage)
    Student.find({},(err,data)=>{
        result.data = data
        res.send(result)
    }).where({$or:[{"name":confident}]}).skip((currentPage-1)*pageSize).limit(pageSize)
})

//all students sublist page
app.all('/api/studentList',async(req,res)=>{

    var result = {
        data:[],
        total:''
    }

    var query = Student.find({});
    query.count({},function(err,count){
        if(err){
            res.json(err)
        }else{
            result.total = count;
        }

    })
    //page number
    var pageSize = parseInt(req.query.pagzSize)
    var currentPage = parseInt(req.query.currentPage)
    Student.find({},(err,data)=>{
        result.data = data
        res.send(result)
    }).skip((currentPage-1)*pageSize).limit(pageSize)

})

mongoose.connect('mongodb://localhost:27017/studentbili',{useNewUrlParser:true,useFindAndModify:true,useCreateIndex:true})

const Student = mongoose.model('Student',new mongoose.Schema({
    snumber:{type:String},
    class:{type:String},
    name:{type:String},
    sex:{type:String},
    clan:{type:String},
    javalan:{type:String},
    dblan:{type:String}
}))



app.listen(3001,()=>{
    console.log('success')
})