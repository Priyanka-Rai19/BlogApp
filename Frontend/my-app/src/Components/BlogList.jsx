

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const BlogList = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [selectedTag, setSelectedTag] = useState(null); 
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     if (!token) {
//       setError('Unauthorized. Please log in.');
//       setLoading(false);
//       return;
//     }

//     axios
//       .get('http://localhost:5008/api/posts', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         setBlogs(response.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError('Error fetching blogs: ' + err.message);
//         setLoading(false);
//       });
//   }, [token]);

  
//   const filteredBlogs = selectedTag
//     ? blogs.filter((blog) => blog.tag.toLowerCase() === selectedTag.toLowerCase())
//     : blogs;

//   if (loading) return <p>Loading blogs...</p>;
//   if (error) return <p>{error}</p>;

  
//   const tags = Array.from(new Set(blogs.map((blog) => blog.tag))).filter(Boolean);

//   return (
//     <div className="blog-section">
//       <div className="blog-header">
//         <h2>Blogs</h2>
//         <div className="blog-actions">
//           <input type="text" placeholder="Search..." />
//           <button className="add-btn">+ Add</button>
//         </div>
//       </div>

    

//       <div className="blog-cards">
//         {filteredBlogs.map((blog) => {
//           const tag = blog.tag || 'General'; 
//           return (
//             <div className="blog-card" key={blog.id}>
//               <img
//                 src={blog.image_url || 'default-image-url.jpg'}
//                 alt={blog.title}
//               />
//               <div className="card-content">
//                 <p className="meta">
//                   {blog.author || 'Anonymous'} •{' '}
//                   {new Date(blog.post_date).toLocaleDateString()}
//                 </p>
//                 <h3 className="title">
//                   {blog.title} <span className="arrow">↗</span>
//                 </h3>
//                 <p className="desc">{blog.content}</p>

                
//                 <span className={`tag tag-${tag.toLowerCase().replace(/\s+/g, '-')}`}>
//                   {tag}
//                 </span>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default BlogList;

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './BlogList.css'; // Add this line if you put CSS in a separate file

// const BlogList = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [selectedTag, setSelectedTag] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     author: '',
//     title: '',
//     content: '',
//     tag: '',
//     image_url: '',
//   });

//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     if (!token) {
//       setError('Unauthorized. Please log in.');
//       setLoading(false);
//       return;
//     }

//     axios
//       .get('http://localhost:5008/api/posts', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       .then((response) => {
//         setBlogs(response.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError('Error fetching blogs: ' + err.message);
//         setLoading(false);
//       });
//   }, [token]);

//   const filteredBlogs = selectedTag
//     ? blogs.filter((blog) => blog.tag?.toLowerCase() === selectedTag.toLowerCase())
//     : blogs;

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleAddBlog = () => {
//     axios
//       .post(
//         'http://localhost:5008/api/posts',
//         { ...formData },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       )
//       .then((response) => {
//         setBlogs((prev) => [...prev, response.data]);
//         setShowModal(false);
//         setFormData({
//           author: '',
//           title: '',
//           content: '',
//           tag: '',
//           image_url: '',
//         });
//       })
//       .catch((err) => {
//         alert('Failed to add blog: ' + err.message);
//       });
//   };

//   if (loading) return <p>Loading blogs...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="blog-section">
//       <div className="blog-header">
//         <h2>Blogs</h2>
//         <div className="blog-actions">
//           <input type="text" placeholder="Search..." />
//           <button className="add-btn" onClick={() => setShowModal(true)}>+ Add</button>
//         </div>
//       </div>

//       <div className="blog-cards">
//         {filteredBlogs.map((blog) => (
//           <div className="blog-card" key={blog.id}>
//             <img src={blog.image_url || 'default-image-url.jpg'} alt={blog.title} />
//             <div className="card-content">
//               <p className="meta">
//                 {blog.author || 'Anonymous'} • {new Date(blog.post_date).toLocaleDateString()}
//               </p>
//               <h3 className="title">{blog.title} <span className="arrow">↗</span></h3>
//               <p className="desc">{blog.content}</p>
//               <span className={`tag tag-${(blog.tag || 'general').toLowerCase().replace(/\s+/g, '-')}`}>
//                 {blog.tag || 'General'}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal */}
//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h2>Add New Blog</h2>
//             <input name="author" placeholder="Author" value={formData.author} onChange={handleInputChange} />
//             <input name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} />
//             <textarea name="content" placeholder="Content" value={formData.content} onChange={handleInputChange} />
//             <input name="tag" placeholder="Tag" value={formData.tag} onChange={handleInputChange} />
//             <input name="image_url" placeholder="Image URL" value={formData.image_url} onChange={handleInputChange} />
//             <div className="modal-actions">
//               <button onClick={handleAddBlog}>Submit</button>
//               <button onClick={() => setShowModal(false)}>Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BlogList;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    author: '',
    title: '',
    content: '',
    tag: '',
    image_url: '', // This will store File object
  });
  const [searchQuery, setSearchQuery] = useState(''); // State for search query

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setError('Unauthorized. Please log in.');
      setLoading(false);
      return;
    }

    axios
      .get('http://localhost:5008/api/posts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Error fetching blogs: ' + err.message);
        setLoading(false);
      });
  }, [token]);

  // Handle input changes for form data and search query
  const handleInputChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === 'file') {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // Update the search query state
  };

  const handleAddBlog = () => {
    const data = new FormData();
    data.append('author', formData.author);
    data.append('title', formData.title);
    data.append('content', formData.content);
    data.append('tag', formData.tag);
    data.append('image', formData.image_url); // Backend must use 'image' field

    axios
      .post('http://localhost:5008/api/posts', data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setBlogs((prev) => [...prev, response.data]);
        setShowModal(false);
        setFormData({
          author: '',
          title: '',
          content: '',
          tag: '',
          image_url: '',
        });
      })
      .catch((err) => {
        alert('Failed to add blog: ' + err.message);
      });
  };

  // Filter blogs based on tag and search query
  const filteredBlogs = blogs
    .filter((blog) => {
      if (selectedTag) {
        return blog.tag?.toLowerCase() === selectedTag.toLowerCase();
      }
      return true;
    })
    .filter((blog) => {
      return blog.title.toLowerCase().includes(searchQuery.toLowerCase()); // Filter by title
    });

  if (loading) return <p>Loading blogs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="blog-section">
      <div className="blog-header">
        <h2>Blogs</h2>
        <div className="blog-actions">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchQuery}
            onChange={handleSearchChange} // Handle search input change
          />
          <button className="add-btn" onClick={() => setShowModal(true)}>
            + Add
          </button>
        </div>
      </div>

      <div className="blog-cards">
        {filteredBlogs.map((blog) => (
          <div className="blog-card" key={blog.id}>
            <img
              src={blog.image_url || 'default-image-url.jpg'}
              alt={blog.title}
              style={{ width: '100%', height: '200px', objectFit: 'cover' }}
            />
            <div className="card-content">
              <p className="meta">
                {blog.author || 'Anonymous'} •{' '}
                {new Date(blog.post_date).toLocaleDateString()}
              </p>
              <h3 className="title">
                {blog.title} <span className="arrow">↗</span>
              </h3>
              <p className="desc">{blog.content}</p>
              <span
                className={`tag tag-${(blog.tag || 'general')
                  .toLowerCase()
                  .replace(/\s+/g, '-')}`}
              >
                {blog.tag || 'General'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" style={overlayStyle}>
          <div className="modal" style={modalStyle}>
            <h2>Add New Blog</h2>
            <input
              name="author"
              placeholder="Author"
              value={formData.author}
              onChange={handleInputChange}
            />
            <input
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleInputChange}
            />
            <textarea
              name="content"
              placeholder="Content"
              value={formData.content}
              onChange={handleInputChange}
            />
            <input
              name="tag"
              placeholder="Tag"
              value={formData.tag}
              onChange={handleInputChange}
            />
            <input
              type="file"
              name="image_url"
              accept="image/*"
              onChange={handleInputChange}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button onClick={handleAddBlog}>Submit</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogList;

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100vh',
  width: '100vw',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const modalStyle = {
  background: '#fff',
  padding: '20px',
  borderRadius: '10px',
  width: '400px',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
};
