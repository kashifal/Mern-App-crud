var jwt = require('jsonwebtoken');
const JWT_SECRET = "cookies";
const bcrypt = require('bcrypt');

// jwt token
module.exports = {
  createJWT: (user) => {
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
    return token;
  },
  
  protected: (req, res, next) => { // Add 'next' as a parameter
    const bearer = req.headers.authorization;

    if (!bearer) {
      res.status(401);
      res.json({
        message: 'Not Protected'
      });
      return;
    }

    const [, token] = bearer.split(' ');
    if (!token) {
      res.status(401)
      res.json({ message: 'not valid' });
      return;
    }

    try {
      const user = jwt.verify(token, JWT_SECRET);
      req.user = user; 
      next(); // Call the 'next' function
    } catch (e) {
      console.log(e);
    }
  },

  comparePasswords: () => (password, hash) => {
    return bcrypt.compare(password, hash);
  },

  hashPassword: (password) => {
    return bcrypt.hash(password, 5);
  }
};
