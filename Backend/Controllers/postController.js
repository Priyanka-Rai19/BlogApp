
const { db } = require('../Models/dbConnect');

const createPost = (req, res) => {
  const { title, content, tag, link } = req.body; 
  const userId = req.user.id; 

  if (!userId) {
    return res.status(400).json({ message: 'User not authenticated' });
  }

  
  const image_url = req.file ? `http://localhost:5008/uploads/${req.file.filename}` : null;


  db.query('SELECT username FROM users WHERE id = ?', [userId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching user', error: err });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const author = results[0].username; 

    
    db.query(
      `INSERT INTO postsss (user_id, author, title, content, tag, post_date, link, image_url, created_at)
       VALUES (?, ?, ?, ?, ?, NOW(), ?, ?, NOW())`,
      [userId, author, title, content, tag, link, image_url], 
      (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error creating post', error: err });
        }

        
        res.status(201).json({ message: 'Post created successfully', postId: result.insertId });
      }
    );
  });
};


const getPosts = (req, res) => {
  const userId = req.user.id;

  
  db.query(
    'SELECT * FROM postsss WHERE user_id = ? ORDER BY createdAt DESC',
    [userId],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'Error fetching posts', error: err });
      }

      
      res.status(200).json(results);
    }
  );
};

module.exports = { createPost, getPosts };
