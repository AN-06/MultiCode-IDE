var express = require('express');
const { signUp, createProj, saveProj } = require('../controllers/userController');
const { login } = require('../controllers/userController');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/signUp",signUp); //signUp is in controller func
router.post("/login",login); 
router.post("/createProj",createProj);
router.post("/saveProj",saveProj); 

module.exports = router;
