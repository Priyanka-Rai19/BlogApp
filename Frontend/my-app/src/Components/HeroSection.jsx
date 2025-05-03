

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import BlogList from "./BlogList";

const slides = [
  {
    id: 1,
    category: "Adventure",
    title: "Richird Norton photorealistic rendering as real photos",
    date: "1 Jan 2023",
    desc: "Progressively incentivize cooperative systems through technically sound functionalities.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    id: 2,
    category: "Travel",
    title: "Exploring the world from above",
    date: "15 Feb 2023",
    desc: "Unlock the beauty of aerial photography and storytelling from the sky.",
    image: "https://media.istockphoto.com/id/1473666403/photo/deep-forest-waterfall-in-thailand-erawan-waterfall-national-park-kanjanaburi-thailand.jpg?s=612x612&w=0&k=20&c=weBEF1fecZcspR3wqZz79ZmH4fnauLTqy9A4xEb8xi4=",
  },
  {
    id: 3,
    category: "Nature",
    title: "Capturing the untouched wild landscapes",
    date: "22 Mar 2023",
    desc: "Discover nature's untouched wonders in perfect harmony with photography.",
    image: "https://images.unsplash.com/photo-1443890923422-7819ed4101c0",
  },
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [showLogin, setShowLogin] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSignInClick = () => {
    setShowLogin(true);  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5008/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError("Login failed. Please check your credentials.");
        return;
      }

      localStorage.setItem("token", data.token); 
      setShowLogin(false);
      navigate("/hero");
    } catch (err) {
      setError("Login failed due to a server error.");
    }
  };

  return (
    <>
      <div className="slider-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide ${index === current ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="overlay" />
            <header className="hero-header">
              <div className="logo">LOGO</div>
              <button className="sign-in" onClick={handleSignInClick}>
                Sign In
              </button>
            </header>
            <div className="hero-content">
              <p className="category">{slide.category}</p>
              <h1>{slide.title}</h1>
              <p className="description">
                {slide.date} — {slide.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <BlogList />

      {showLogin && (
        <div className="login-modal-overlay">
          <div className="login-modal-container">
            <div className="login-modal-left">
              <img
                src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
                alt="Login Visual"
              />
            </div>
            <div className="login-modal-right">
              <h2>Welcome Back 👋</h2>
              <p>Shape Your Thoughts. Sign in to share and explore insightful blogs.</p>
              <form onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit">Sign In</button>
                {error && <p className="error">{error}</p>}
              </form>
              <p className="signup-text">
                Don't have an account? <a href="/signup">Sign Up</a>
              </p>
              <button className="close-login-modal" onClick={() => setShowLogin(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;
