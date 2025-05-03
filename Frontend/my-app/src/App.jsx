// // import React, { useState } from 'react';
// // import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// // import Navbar from './components/Navbar';
// // import Home from './Pages/Home'
// // import Login from './Components/Login';
// // import CreatePostPage from './pages/CreatePostPage';
// // import Login from './Components/Login';

// // const App = () => {
// //   const [token, setToken] = useState(localStorage.getItem('token') || '');

// //   return (
// //     <Router>
// //       <Navbar />
// //       <Routes>
// //         <Route path="/" element={<Home token={token} />} />
// //         <Route path="/login" element={<Login setToken={setToken} />} />
// //         <Route path="/create" element={<CreatePostPage token={token} />} />
// //       </Routes>
// //     </Router>
// //   );
// // };

// // export default App;
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Home from './Pages/home';
// import LoginPage from './Pages/LoginPage';
// import CreatePostPage from './Pages/createPostPages';
// import Login from './Components/Login';

// const App = () => {
//   const [token, setToken] = useState(localStorage.getItem('token') || '');

//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Login setToken={setToken} />} />
//         <Route path="/home" element={<Home token={token} />} />
//         <Route path="/create" element={<CreatePostPage token={token} />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Signup from './Components/SignUp';
// import Login from './Components/Login';
// import HeroSection from './Components/HeroSection';

// function App() {
//   const [token, setToken] = useState(null);

//   return (
//     <Router>
//       <Routes>
//         {/* Show Login page at root */}
//         <Route
//           path="/"
//           element={!token ? <Login setToken={setToken} /> : <Navigate to="/heroSection" replace />}
//         />
//         <Route
//           path="/signup"
//           element={!token ? <Signup /> : <Navigate to="/heroSection" replace />}
//         />
//         <Route
//           path="/heroSection"
//           element={token ? <HeroSection /> : <Navigate to="/" replace />}
//         />
//       </Routes>
      
//     </Router>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Components/SignUp';
import Login from './Components/Login';
import HeroSection from './Components/HeroSection';

function App() {
  const [token, setToken] = useState(null); // Token state to track login status

  return (
    <Router>
      <Routes>
        {/* Show Login page at root */}
        <Route
          path="/"
          element={!token ? <Login setToken={setToken} /> : <Navigate to="/heroSection" replace />}
        />
        <Route
          path="/signup"
          element={!token ? <Signup /> : <Navigate to="/heroSection" replace />}
        />
        <Route
          path="/heroSection"
          element={token ? <HeroSection /> : <Navigate to="/" replace />}
        />
      </Routes>
    </Router>
  );
}

export default App;
