import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MediaItem from "../MediaItem/MediaItem";

export default function Movies() {

let pageNum = new Array(10).fill("x").map((el, i)=> i+1)

  const [movies, setMovies] = useState([]);

  async function getMovies(pageNum = 1) {
    let { data } = await Axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=c053a20c4b2f67715f731bb17243e188&language=en-US&page=${pageNum}`
    );
    setMovies(data.results);
  }

  function changePageNum(page) {
    getMovies(page)
  }

  useEffect(() => {
    getMovies();
  }, []);

 async function search(e) {
    let value = e.target.value;

    if (value !== '') {    
      let {data} = await Axios.get(`https://api.themoviedb.org/3/search/movie?api_key=c053a20c4b2f67715f731bb17243e188&language=en-US&query=${value}&page=1&include_adult=false`);
      setMovies(data.results);
    }else{
      getMovies();
    }

  }

  return (
    <>
    <input type="text" onChange={search} className="form-control bg-transparent mx-auto w-50 text-white my-4" placeholder="Search..."/>
     
      <div className="row g-3 py-5">
        {movies.map((item, index) => (
          <MediaItem key={index} item={item} />
        ))}
      </div>

      <nav aria-label="Page navigation example" className="d-flex justify-content-center">
        <ul className="pagination justify-content-center">
        {pageNum.map((el)=> <li key={el} className="page-item" onClick={()=> changePageNum(el)}> <Link className="page-link"> {el} </Link> </li>)}
        </ul>
      </nav>
    </>
  );
}
