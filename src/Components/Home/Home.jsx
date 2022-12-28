import  Axios  from "axios";
import React, { useEffect, useState } from "react";
import MediaItem from "../MediaItem/MediaItem";

export default function Home() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingTv, setTrendingTv] = useState([]);
  const [trendingPerson, setTrendingPerson] = useState([]);

  async function getTrending(mediaType, func) {
    let { data } = await Axios.get(
      `https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=c053a20c4b2f67715f731bb17243e188`);
    console.log(data.results);
    func(data.results);
  }

  useEffect(() => {
    getTrending("movie", setTrendingMovies);
    getTrending("tv", setTrendingTv);
    getTrending("person", setTrendingPerson);
  }, []);

  return (
    <>
      <div className="row py-5">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="brd w-25 mb-3"></div>
            <h2 className="h6">
              Trending Movies <br /> To Watch Right Now
            </h2>
            <p className="text-muted py-3">Most watched Movies by Days</p>
            <div className="brd w-100 mt-3"></div>
          </div>
        </div>
        {trendingMovies.slice(0, 16).map((item, index) => (
          <MediaItem key={index} item={item} />
        ))}
      </div>

      <div className="row py-5">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="brd w-25 mb-3"></div>
            <h2 className="h6"> Trending Tv Shows <br/> To Watch Right Now </h2>
            <p className="text-muted py-3">Most watched Tv Shows by Days</p>
            <div className="brd w-100 mt-3"></div>
          </div>
        </div>
        {trendingTv.slice(0, 16).map((item, index) => (
          <MediaItem key={index} item={item} />
        ))}
      </div>

      <div className="row py-5">
        <div className="col-md-4 d-flex align-items-center">
          <div>
            <div className="brd w-25 mb-3"></div>
            <h2 className="h6"> Trending Actors <br /> To Watch Right Now </h2>
            <p className="text-muted py-3">Most Trending Actors</p>
            <div className="brd w-100 mt-3"></div>
          </div>
        </div>
        {trendingPerson
          .filter((person) => person.profile_path !== null)
          .slice(0, 16)
          .map((item, index) => (
            <MediaItem key={index} item={item} />
          ))}
      </div>
    </>
  );
}
