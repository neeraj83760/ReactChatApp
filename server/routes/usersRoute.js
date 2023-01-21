const User = require('../models/userModel');

const router = require("express").Router();

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const authMiddleware = require('../middlewares/authMiddleware');

// Now we will write our first end point called user registration

router.post("/register", async (req, res) => {

    try {

        // Check if user is already registered
        const user = await User.findOne({email: req.body.email});
        
        if(user){

        return  res.send({
          success : false,
          message : 'User already registered!!'        
   
          })
        }

        // Create a new User

       const hashedPassword = await bcrypt.hash(req.body.password , 10)
       req.body.password = hashedPassword;
       const newUser = new User(req.body);
       await newUser.save();

       res.send({
       success:true,
       message: 'User created successfully' 

       })

        
    } catch(error) {
      res.send({

        message: error.message,
        success : false
      });  
    }
})


// User Login

router.post("/login", async (req, res)  => {

  try { 

    // Check if user exists

    const user = await User.findOne({email: req.body.email});

    if(!user){

      return res.send({
         success:false,
         message: 'User not Exists',

      })
    }

    // Check if password is correct 
    // In this case we will get the plain password from the frontend but u need to compare it with encrypted
    // password

    const validPassword = await bcrypt.compare(

      req.body.password,
      user.password
    )

    if (!validPassword){

      return res.send({

        success: false,
        message: "Invalid Password",
      });
    }
   
  // Create and assign a Token 
  // last parmater is when the token will expire in and how long it should be vaild 

  const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, {expiresIn: "1d",})
  res.send({
  success: true,
  message: "User Logged in Sucessfully",
  data : token

  });

    
  } catch (error) {

    res.send({

      message: error.message,
      success:false,
    })
    
  }

});

// Get current user : In this we have to validate the token 
// In every protected route you have to validate the token so we can't have the 
// validation in a single file it should be global that's the reason we need to create 
// a new folder called middleware inside the server folder 

router.get("/get-current-user",authMiddleware, async (req, res) => {


try {

  const user = await User.findOne({_id: req.body.userId});
  res.send({
   
    success: true,
    message: 'User Fetched successfully!!',
    data: user,

  });

  
} catch (error) {

  res.send({
    
    message: error.message,
    success: false,

  })
  
}

})

// Get all user except current user

router.get("/get-all-users", authMiddleware, async (req, res) => {

try {
  
const allUsers = await User.find({_id: {$ne: req.body.userId}});
res.send({

  success:true,
  message: "Users Fetched successfully!!",
  data: allUsers,

});

} catch (error) {

  res.send({

    message:error.message,
    success:false,
  });
}


})


module.exports = router;

