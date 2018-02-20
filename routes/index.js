	var express = require('express');
	var router = express.Router();
	var bodyParser = require('body-parser');
	var profiles = require('../profiles');
	var fs = require('fs');
	router.use(bodyParser.json());
	router.use(bodyParser.urlencoded({extended:false}));
	const mongoose = require('mongoose')
	mongoose.connect('mongodb://localhost:27017/profiles')
	var cors = require('cors')
	router.use(cors());



	const UserInfo = mongoose.model('UserInfo', {fullName: String, email: String, 
		company: String, username: String, password: String})
	/* GET home page. */
	// router.get('/', function(req, res, next) {
	//   res.render('index', { title: 'Express' });
	// });
	router.get('/', function(req, res, next) {
		res.render('index');
	});

	router.get('/profiles', function(req, res, next) {
		res.json({
			users: profiles.users
		});
	},	function(error, req, res, next) {
		response.status(400).json({
			errors:error
		});
	});

	router.post('/profiles', function(req,res,next){
		next();
		// if(req.body.companyId) {
		// 	next();
		// } else {
		// 	next('Company Id is not provided!');
		// }
	},	function(req, res, next) {
		var newProfile = req.body;
	
		const userInfo = new UserInfo(newProfile)
		userInfo.save().then(() => console.log('saved'));
	}
	,	function(error, req, res, next) {
		response.status(4000).json({
			error: error
		});
	});

	router.post('/blogs', function(req, res, next) {
		var newBlog = req.body;
		const Blog = mongoose.model('Blog', {title: String,author:String,createdDate:String, image:String,
			content:String, comments: [String], likes: Number
			  			})
		const blog = new Blog(newBlog)
		blog.save().then(() => console.log('blog saved'));
	});

	router.get('/blogs', function(req, res, next) {
		const Blog = mongoose.model('Blog', {title: String,author:String,createdDate:String, image:String,
			content:String, comments: [String], likes: Number
			  			})
		Blog.find({}, function(err, blogs) {
			blogs.forEach(function(user) {
				console.log('user: ' + user)
			});
		});
		
		res.json('success')
		//console.log('blog: ' + mongoose.collection('blogs').findone())
		// var blog = Blog.findById("5a8ade562ca4646bd2bfc9ce", function(error, blog) {
		// 	console.log('blog: ' + blog)
		// })
	})

	router.post('/login', function(req, res, next) {
		console.log(req.body.userName)
		UserInfo.find(function(err, users) {
			if(err) {
				res.status(400).json({message:'oops somhtinf is wrong'})
			}
			const ifUser = users.filter(user => {
				return user.username == req.body.userName
			});
			if(ifUser[0]){
				if(req.body.password == ifUser[0].password){
				res.status(200).json(ifUser[0])

				}else{
				res.status(403).json({message:'password wrong'})

				}
			}else{
				res.status(403).json({message:'user not found'})

			}
		});
	});

	// var profileId;
	// router.put('/profiles', function(req, res, next) {
	// 	try {
	// 		profileId = parseInt(req.body.id);
	// 		if (isNaN(profileId)) {
	// 			next('Id must be a number!');
	// 		} else {
	// 			next();
	// 		}
	// 	} catch(e) {
	// 		next('Id must be a number!');
	// 	}
	// },	function(req, res, next){
	// 	profiles.users.forEach( function(element, index) {
	// 		if (profileId == element.id) {
	// 			profiles.users[profileId] = req.body;
	// 			fs.writeFile('profiles.json', JSON.stringify(profiles), 'utf-8', function(err){
	// 				if(err) {
	// 					return console.log(err);
	// 				}
	// 				res.json({
	// 					msg: "Profile updated successfully!",
	// 					profile: element
	// 				});
	// 			});
	// 		}
	// 	});

	// },   function(error, req, res, next) {
	// 	response.status(4000).json({
	// 		error: error
	// 	});

	// });

	// router.delete('/profiles', function(req, res, next) {
	// 	try {
	// 		profileId = parseInt(req.body.id);
	// 		if (isNaN(profileId)) {
	// 			next('Id must be a number!');
	// 		} else {
	// 			next();
	// 		}
	// 	} catch(e) {
	// 		next('Id must be a number!');
	// 	}
	// },	function(req, res, next){
	// 		profiles.users.splice(profileId, 1);
	// 		fs.writeFile('profiles.json', JSON.stringify(profiles), 'utf-8', function(err) {
	// 			if(err) {
	// 				return console.log(err);
	// 			}
	// 			res.json({
	// 				msg:"Profile deleted successfully!",
	// 				profile: req.body
	// 			});
	// 		});
	// },	function(error, req, res, next) {
	// 	response.status(4000).json({
	// 		error: error
	// 	});
	// });

	module.exports = router;
