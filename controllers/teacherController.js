const Teacher=require('../models/teacherModel');

exports.getAllTeachers = async(req, res) => {
  const teachers=await Teacher.find();
  try{
    res.status(200).json({
    status:"success",
    data:teachers
    })
  }catch(err){
  res.status(404).json({
      status: 'error',
      message: `Error ${err}`
    });
  }
};
exports.getTeacher = async (req, res) => {
  const teacher=await Teacher.findById(req.params.id);
  try{
    res.status(200).json({
    status:"success",
    data:teacher
    })
  }catch(err){
    res.status(404).json({
      status: 'error',
      message: `Error ${err}`
    });
  }
};
exports.createTeacher = async(req, res) => {
  const newTeacher=await Teacher.create(req.body);
  try{
    res.status(200).json({
    status:"success",
    message:"teacher data deleted succesfully",
    data:newTeacher
    })
  }catch(err){
    res.status(404).json({
      status: 'error',
      message: `Error ${err}`
    });
  }
};
exports.updateTeacher = async (req, res) => {
  const updatedTeacher=await Teacher.findByIdAndUpdate(req.params.id,req.body);
  try{
    res.status(200).json({
    status:"success",
    data:updatedTeacher
    })
  }catch(err){
    res.status(404).json({
      status: 'error',
      message: `Error ${err}`
    });
  }
};
exports.deleteTeacher = async(req, res) => {
  await Teacher.findByIdAndDelete(req.params.id);
  try{
    res.status(200).json({
    status:"success",
    message:"teacher data deleted succesfully..."
    })
  }catch(err){
    res.status(404).json({
      status: 'error',
      message: `Error ${err}`
    });
  }
};
