


const mongodb = require("mongodb")

const bcrypt = require("bcryptjs")
const jwt=require("jsonwebtoken")
const dbUrl="mongodb+srv://majorProject:BbENiSmqHd6FTXE0@cluster0-ccc3k.mongodb.net/"

//how to push code from vs to git after changes
const passwordhash=require("password-hash")



mongodb.connect(dbUrl, (err, serverConn) => {
    //
    console.log("server connected")
    dbConn = serverConn.db("project")
    console.log("database connected")

})

addCourse=(req,res,next)=>{
    const courseRec=req.body
    
    dbConn.collection("course").findOne({course:courseRec.course},(err,rec)=>{
        if(rec){
            res.json({msg:'course already exists',sucess:false})
        }else{
            dbConn.collection("course").insertOne(courseRec,(err,rec)=>{
                if(rec.insertedCount>0){
                    res.json({data:rec.ops,msg:'successfully inserted',success:true})
                }else{
                    res.json({msg:'something went wrong',data:[],success:false})
                }
                   
               
            })
        }
      
    })
  


}
deleteCourse=(req,res,next)=>{
    // var courseRec=req.params.course
    const courseRec=req.body
        console.log(courseRec,"details")
        
     dbConn.collection('course').deleteOne({_id:mongodb.ObjectID(courseRec._id)},(err,rec)=>{
         console.log(courseRec._id,"jfvgbgv")
         if(rec.deletedCount>0){
             
             res.json({msg:'successfully deleted',data:rec.ops,success:true})
         }else{
             res.json({msg:'something went wrong',success:false,data:null})
         }
     })
    
 }

 getAllCourses=(req,res)=>{
     dbConn.collection('course').find().toArray((err,rec)=>{
         if(rec){
             res.json({msg:'succesfully found record',data:rec,success:true})
         }else{
             res.json({msg:'something went wrong',data:null,success:false})
         }
     })
 }

 updateCourse=(req,res)=>{
     const courseRec=req.body
   
 //   dbConn.collection('course').findOne({_id:courseRec._id}).then((result)=>{
    
 //         console.log(result,"from record")
     
 //     })
   
      a1={_id:courseRec._id}
     a2={course:courseRec.course}

      dbConn.collection('course').updateOne(a1,{$set:a2},(err,rec)=>{
          console.log(rec)
          if(rec.result.nModified > 0){
              res.json({data:rec,msg:"successfully updated",success:true})
          }else{
              res.json({data:null,msg:"something went wrong",success:false})
          }
      })

 }

 addCategory=(req,res,next)=>{
     const catRec=req.body
     dbConn.collection("category").findOne({category:catRec.category},(err,rec)=>{
         if(rec){
             res.json({msg:'category already exists',data:null,success:true})
         }else{
             dbConn.collection("category").insertOne(catRec,(err,rec)=>{
                 if(rec.insertedCount>0){
                     res.json({data:rec.ops,msg:'successfully inserted',success:true})
                 }else{
                     res.json({data:null,msg:'something went wrong',success:false})
                 }
             })
         }
     })
     
 }
 deleteCategory=(req,res)=>{
     const catRec=req.body
     dbConn.collection('category').deleteOne({category:catRec.category},(err,rec)=>{
         if(rec.deletedCount>0){
             res.json({data:rec.ops,msg:'successfully deleted',success:true})
         }else{
             res.json({data:null,success:false,msg:"something went wrong"})
         }
     })
 }

 getAllCategories=(req,res)=>{
     dbConn.collection('category').find().toArray((err,rec)=>{
         if(rec){
             res.json({msg:'successfuly found record',data:rec,success:true})
         }else{
             res.json({msg:'record not found',data:null,success:false})
         }
     })
 }

 addBranch=(req,res,next)=>{
     const branchRec=req.body

     dbConn.collection('branch').findOne({branch:branchRec.branch},(err,rec)=>{
         if(rec){
             res.json({data:null,msg:"branch has been taken",success:false})
         }else{
             dbConn.collection('branch').insertOne(branchRec,(err,rec)=>{
                 if(rec.insertedCount>0){
                     res.json({data:rec.ops,msg:'successfully added',success:true})
                 }else{
                     res.json({msg:'something went wrong',data:null,success:false})
                 }
                 
             })
         }
     })
    
 }
 deleteBranch=(req,res)=>{
     const branchRec=req.body
     dbConn.collection('branch').deleteOne({branch:branchRec.branch},(err,rec)=>{
         if(rec.deletedCount>0){
             res.json({msg:'successfully deleted',data:rec.ops,success:true})
         }else{
             res.json({msg:"something went wrong",data:null,success:false})
         }
     })
 }

 getAllBranches=(req,res)=>{
     dbConn.collection('branch').find().toArray((err,rec)=>{
         if(rec){
             res.json({data:rec,success:true,msg:'successsfully fond record'})
         }else{
             res.json({data:null,msg:'records not found',sucess:false})
         }
     })
 }

 adminReg=(req,res)=>{
     const adminRec=req.body

     dbConn.collection('admin').findOne({email:adminRec.email},(err,rec)=>{
         if(rec){
             res.json({data:null,msg:'user already exists',success:true})
         }else{
            bcrypt.hash(adminRec.password, 5).then(newPass => {
                 console.log(newPass)
                adminRec.password = newPass;
              // console.log(empRec)

             dbConn.collection('admin').insertOne(adminRec,(err,rec)=>{
                 if(rec.insertedCount>0){
                     res.json({data:rec.ops,msg:"successfully Registerd",success:true})
                 }else{
                     res.json({data:null,msg:"something went wrong",success:false})
                 }
             })
          
         }
     )}

    }
     )}
 

 adminLogin=(req,res,next)=>{
     const adminRec=req.body
    // console.log(adminRec)
     if (adminRec.email.length > 0 && adminRec.password.length > 0) {
     dbConn.collection('admin').findOne({email:adminRec.email},(err,rec)=>{
        bcrypt.compare(adminRec.password, rec.password, (err, sts) => {
            console.log(sts)
         if(sts){           
            var token=jwt.sign({email:adminRec.email},"this_is_admin_token")
             rec.password="*****"
             res.json({data:[rec],msg:"successfully logged in",success:true,token:token})
         }else{
             res.json({data:null,msg:"something went wrong",success:false})
         }
        })
     })

    }
 }
 adminDetails=(req,res)=>{
    
     dbConn.collection('admin').find().toArray((err,rec)=>{
         if(rec){
                    res.json({data:[rec],msg:"sucessfully found record",success:true})
         }else{
             res.json({data:null,msg:"something went wrong",success:false})
         }
         
     })
 }


 
 studentReg=(req,res)=>{
    const stdRec=req.body

    dbConn.collection('stdreg').findOne({email:stdRec.email},(err,rec)=>{
        if(rec){
            res.json({data:null,msg:'user already exists',success:true})
        }else{
           bcrypt.hash(stdRec.password, 5).then(newPass => {
                console.log(newPass)
               stdRec.password = newPass;
             // console.log(empRec)

            dbConn.collection('stdreg').insertOne(stdRec,(err,rec)=>{
                if(rec.insertedCount>0){
                    res.json({data:rec.ops,msg:"successfully Registerd",success:true})
                }else{
                    res.json({data:null,msg:"something went wrong",success:false})
                }
            })
         
        }
    )}

   }
    )}


    

updateStd = (req, res) => {
    const stdRec = req.body
    a1 = {email:stdRec.email }
    a2 = { name:stdRec.name,education:stdRec.education, }
        console.log(stdRec)
    dbConn.collection("stdreg").updateOne(a1, {$set: a2}, (err, rec) => {
        if (rec.result.nModified > 0) {
            res.json({ message: "succesfully updated", success: true, data:[rec] })
        } else {
            res.json({ message: "something went wrong", success: false, data: [] })
        }
       
    })

}


    getAllStudents=(req,res)=>{
        dbConn.collection('stdreg').find().toArray((err,rec)=>{
            if(rec){
                res.json({data:rec,success:true,msg:'successsfully fond record'})
            }else{
                res.json({data:null,msg:'records not found',sucess:false})
            }
        })
    }


// insertemp = (req, res, next) => {
//     const empRec = req.body

//     dbConn.collection("empcollection").findOne({ eid: empRec.eid }, (err, rec) => {
//         if (rec) {
//             res.json({ message: "employee already exist", data: [] })
//         } else {
//             bcrypt.hash(empRec.password, 5).then(newPass => {
//                 // console.log(newPass)
//                 empRec.password = newPass;
//               //  console.log(empRec)

//                 dbConn.collection("empcollection").insertOne(empRec, (err, rec) => {
//                     if (rec.insertedCount > 0) {
//                         var token=jwt.sign({email:empRec.email},"this_is_our_token")
                      
//                         res.json({ message: "succesfully inserted", success: true, data: rec.ops ,token:token})
//                     } else {
//                         +
//                             res.json({ message: "something went wrong", success: false, data: [] })
//                     }

//                 })
//             })
//         }
//     })


// }

// //    deleteEmp=(req,res,next)=>{
// //      var a=req.params.name

// //             dbConn.collection("empcollection").deleteMany({name:a},(err,rec)=>{
// //                 if(rec.deletedCount>0){
// //                     res.json({message:"successfully delted",success:true,data:rec})
// //                 }else{
// //                     res.json({message:"something went wrong",success:false,data:[]})
// //                 }

// //             })
// //    }



// deleteEmp = (req, res, next) => {
//     var empEid = req.params.eid

//     dbConn.collection("empcollection").deleteMany({ eid: empEid }, (err, rec) => {
//         if (rec.deletedCount > 0) {
//             res.json({ message: "successfully delted", success: true, data: rec })
//         } else {
//             res.json({ message: "something went wrong", success: false, data: [] })
//         }

//     })
// }

// getEmployeeByJob = (req, res, next) => {
//     var job = req.params.role
//     dbConn.collection("empcollection").find({ role: job }).toArray((err, rec) => {
//         if (rec) {
//             res.json({ data: rec, message: "suucessfully found record", success: true })
//         } else {
//             res.json({ message: "record does not exist", success: false, data: [] })
//         }

//     })

// }

// stdLogin = (req, res, next) => {
//     const empRec = req.body
//     console.log(empRec)
//     if (empRec.email.length > 0 && empRec.password.length > 0) {
//         dbConn.collection("empcollection").findOne({ email: empRec.email }, (err, rec) => {
//            // console.log(rec.password)
//             bcrypt.compare(empRec.password, rec.password, (err, sts) => {
//                 // console.log(sts)      
//                 if (sts) {
//                    var token=jwt.sign({email:empRec.email},"this_is_our_token")
//                   // console.log(jwt)
//                     rec.password = "******"
//                     res.json({ message: "successfully logged in", data: [rec], success: true ,token:token})
//                 } else {
//                     res.json({ message: "user does not exist", data: [], success: false })
//                 }
//             })
//         })
//     }
// }


// updatePassword = (req, res, next) => {
//     let reqBody = req.body
//     if (reqBody.newPassword == reqBody.confirmPassword) {
           
//         dbConn.collection("empcollection").findOne({ email: reqBody.email }, (err, rec) => {
           
//           if(  bcrypt.compare(password,reqBody.oldPassword)){
//             const   hashedPassword=bcrypt.hash(reqBody.newPassword)
//             let changedPassword={
//               newPassword:hashedPassword
//             }
//             const dev={
//                 $set:changedPassword
//             }
//             const updatePassword=empcollection.updateOne({email:reqBody.email},dev)
//             if(updatePassword){
//                 res.json({
//                     messge:"password udated successfully"
//                 })

//                 }
//                 else{
//                             res.json({
//                                 mesg:"failed to update"
//                             })
//             }
           
//           }
//           else{
//               res.json({
//                   code:"400",
//                   msg:"password does not match"
//               })
//           }


//         })
//     }
//     else {
//         res.json({
//             code: "4000",
//             msg: "confirm password does not match"
//         })


//     }
 
// }



module.exports = {

    addCourse,
    updateCourse,
    addCategory,
    addBranch,
    deleteCourse,
    deleteCategory,
    deleteBranch,
    getAllCourses,
    getAllCategories,
    getAllBranches,
    adminReg,
    adminLogin,
    adminDetails,
    studentReg,
    getAllStudents,
    updateStd
    
}
