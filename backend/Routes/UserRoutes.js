const router = require("express").Router(); // Import router object
const { check, validationResult } = require("express-validator"); // Import validator to validate data
const bcrypt = require("bcryptjs"); // Import bcrypt library to help hash password
const fetchuser = require("../Middleware/jwt"); // Import middleware for fetchuser
const jwt = require("jsonwebtoken"); // Import jsonwebtoken
const { connection1 } = require("../Config/sqldb");

//   User Login Api
router.post(
  "/login",
  [
    check("email").isEmail(),
    check("password", "Password must be atleast 5 char"),
  ],
  async (req, res) => {
    let { email, password, isSuperAdmin } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors });
    }
    try {
      connection1.query(
        "select * from erp_user where user_email= ? ",
        [email],
        async (error, results, fields) => {
          if (error) {
           res.status(400).json({ error: "Wrong credencials !" });
          }
          if(!results[0]){
            return res.status(400).json({ error: "No email found !" });
          }
          const passwordCompare = await bcrypt.compare(
            password,
            results[0].user_password
          );
          if (!passwordCompare) {
           return res.status(400).json({ error: "wrong credencials !" });
          }
         
          let user ={
              username : results[0].user_name,
              email: results[0].user_email
          } 
  
          let authtoken = jwt.sign(user, process.env.jwt_secret);
          success = true;
          res.json({ success,user,authtoken });
        } 
      );
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occured");
    }
  }
);


//Router 3: Get Loggedin User detail
// router.post("/getuser", fetchuser, async (req, res) => {
//     try {
//         userid = req.user.id;
//         const user = await User.findById(userid).select("-password");
//         res.send(user);
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal server error occured");
//     }
// });
module.exports = router;
