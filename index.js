const express = require("express");
const path = require("path");
const port = 8000;

//for connecting to databasee
const db=require('./config/mongoose');
const Contact=require('./models/contact');

const app = express();

app.set("view engine", "ejs"); //view engine
app.set("views", path.join(__dirname, "views")); //view path and directory+file
app.use(express.urlencoded());//added a parser(middleware)

app.use(express.static('assets'));//finds out a folder named assets,provide functionalities like css,js to style our app

// //middleware1 example
/*app.use(function(req,res,next){
  req.myName='Priyanka';
  //console.log("Middleware1 executed");
  next();
});*/

//middleware2 example
/*app.use(function(req,res,next){
  console.log("My name from MW2",req.myName);
  //console.log("Middleware2 executed");
  next();
});*/

var contactList=[
  {
    name:"Priyanka",
    phone:"9874563210",
  },
  {
    name:"Pinka",
    phone:"0321654789",
  },
  {
    name:"Pinku",
    phone:"4563210789"
  }

]
app.get("/", function (req, res) {
  //res.send('<h1>Cool,It is running</h1>');
  //console.log("From the get route controller",req.myName); 

  Contact.find({},function(err,contacts)//{} signifies query acc to which data is displayed,here it shows all data
  {
    if(err){
      console.log('Error in fetching contacts from db');
      return;
    }

    return res.render("home", { 
      title: "My Contact List", 
      contact_list:contacts
      //contact_list:contactList //this is the context which is passed in the home
    }); //rendering file
  });
});

app.get('/practice',function(req,res)
{
  return res.render('practice',{
    title:"Lets practice EJS"
  });
});

app.post('/create-contact',function(req,res){
  //return res.redirect('/practice');
  /*contactList.push(
    {
      name:req.body.name,
      phone:req.body.phone
    }
  );
  //contactList.push(req.body);*/
  
  Contact.create({
    name:req.body.name,
    phone:req.body.phone
  },function(err,newContact)
  {
    if(err){console.log('error in creating a contact!');
    return;}

    console.log('*******',newContact);
    return res.redirect('back');
  });
  //return res.redirect('back');
});

app.get('/delete-contact/',function(req,res)
{
  //console.log(req.params);
  //let phone=req.params.phone;//this is params 
 /* 
 console.log(req.query);
  let phone=req.query.phone;//query params

  let contactIndex=contactList.findIndex(contact=>contact.phone == phone);
  if(contactIndex!=-1)
  {
    contactList.splice(contactIndex,1);
  }
  return res.redirect('back');
  */
  
  //get the id from query in the ul
  let id=req.query.id;

  //find the contact in database using id and delete
  Contact.findByIdAndDelete(id,function(err){
    if(err)
    {
      console.log('Error in deleting an object');
      return;
    }  
  });
  return res.redirect('back');
});

app.listen(port, function (err) {
  if (err) {
    console.log("Error is running the server", err);
  }
  console.log("Express server is running on port:", port);
});
