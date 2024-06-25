const { User } = require('../model/user'); // Ensure the path is correct
const bcrypt = require('bcrypt')

async function handleUserSignUp(req, res) {
  try {
    const { name, email, role, password } = req.body;
    console.log(req.body);
    const salt = 10;
    const hashpassword = await bcrypt.hash(password, salt)
    await User.create({
      name,
      email,
      role: role || 'Normal', // Default role to 'Normal' if not provided
      password: hashpassword,
    });
    return res.redirect('/signup');
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).send('Error creating user');
  }
}

async function handleUserLogin(req, res) {
    try {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
      if (!user) {
        return res.render('login', { alertMessage: "User not found!!!" });
      }
  
      const comparePassword = await bcrypt.compare(password, user.password);
      if (!comparePassword) {
        return res.render('login', { alertMessage: "Incorrect password!!!" });
      }
  
      return res.redirect('/home');
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ msg: "Internal server error" });
    }
  }


async function handlepasswordReset(req,res){
    try{
        const {email, newPassword} = req.body
        const user = await User.findOne({email})
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
          }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        
        user.password = hashedPassword;
        await user.save();
        return res.render('passwordReset', { alertMessage: "Incorrect password!!!" });
    }
    catch (error) {
        console.error('Error during password change:', error);
        return res.status(500).json({ msg: "Internal server error" });
      }
    }

module.exports = {
  handleUserSignUp,
  handleUserLogin,
  handlepasswordReset,
};