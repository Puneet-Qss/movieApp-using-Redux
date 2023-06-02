import React, { useState } from "react";
import { Link } from "react-router-dom";
import user from "../../Images/user.png";
import "./header.scss";
import { useDispatch } from "react-redux";
import {  fetchAsyncMovies, fetchAsyncShows } from "../../features/movies/moviesSlice";

function Header() {
  const [term, setTerm] = useState("");
  const dispatch = useDispatch();

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(fetchAsyncMovies(term));
    dispatch(fetchAsyncShows(term))
setTerm("")
    console.log("term", term);
  };

  const handleChange = (event) => {
    setTerm(event.target.value);
  };

  return (
    <div className="header">
      <div className="logo">
        <Link to="/"> Movie App </Link>
      </div>
      <div className="search-bar">
        <form onSubmit={submitHandler}>
          <input
            type="text"
            placeholder="Search for Movies & shows"
            value={term}
            onChange={handleChange}
          />
          <button type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
      <div className="user-image">
        <img src={user} alt="userImage" />
      </div>
    </div>
  );
}

export default Header;
