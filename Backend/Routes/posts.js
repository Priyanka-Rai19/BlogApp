
const express = require('express');
const router = express.Router();
const upload = require('../upload');
const { createPost, getPosts } = require('../Controllers/postController');
const { authenticate } = require('../Middleware/authMiddleware'); 


router.post('/', authenticate, upload.single('image'), createPost);


router.get('/', authenticate, getPosts);

module.exports = router;
