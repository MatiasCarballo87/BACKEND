import express from 'express';

export const logoutRouter = express.Router();

logoutRouter.get('/', (req, res) => {
  req.session.destroy(err => {
    if (err) {
        return res.status(400).json({ status: "error", msg: "failure logout", payload: {} }); 
    }
    return res.redirect('/login');
  });
});