import Axios  from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
// import avatar from '../../images/avatar.jpg'

export default function ItemDetails() {

    let {id , media_type} = useParams();
    // console.log(id , media_type);
    const [itemDetails, setitemDetails] = useState({});
    const [similar, setSimilar] = useState([]);

    async function getItemDetails(id, media_type) {
      let {data} = await Axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=c053a20c4b2f67715f731bb17243e188&language=en-US`
      )
      setitemDetails(data)
    }
    async function getSimilar() {
      let {data} = await Axios.get(`https://api.themoviedb.org/3/${media_type}/${id}/similar?api_key=c053a20c4b2f67715f731bb17243e188&language=en-US`)
      let result = data.results;
      setSimilar(result)
    }
    useEffect(() => {
      getItemDetails(id, media_type);
      getSimilar(id, media_type)
    })
    
  return (
    <>
    {itemDetails !== null ?
    <div className="row my-5 py-5 ">
    <div className="col-md-3">
    {itemDetails.poster_path ?  <img src={"https://image.tmdb.org/t/p/w500/" + itemDetails.poster_path} className="w-100" alt=""/>
         : <img src={"https://image.tmdb.org/t/p/w500/" + itemDetails.profile_path} className="w-100" alt=""/>}
        {/* {!itemDetails.poster_path && !itemDetails.profile_path ? <img className="w-100" src={avatar} alt=""/> : '' } */}
    </div>
    <div  className="col-md-9 p-3">
      <h2>{itemDetails.title} {itemDetails.name}</h2>
      <p className="text-muted"> {itemDetails.tagline}</p>

      {itemDetails.genres?.map((el, index)=> <span key={index} className='btn btn-primary me-3 my-3'>{el.name}</span> )}        

      <h6 className='my-3 text-white'>Vote: {itemDetails.vote_average && <span className='p-2 text-muted '> {itemDetails.vote_average?.toFixed(1)} </span>}</h6>
      <h6 className='my-3 text-white'>Vote_count: {itemDetails.vote_count && <span className='p-2 text-muted '> {itemDetails.vote_count?.toFixed(1)} </span>}</h6>
      <h6 className='my-3 text-white'>Release_date: {itemDetails.release_date && <span className='p-2 text-muted '> {itemDetails.release_date} </span>}</h6>
      <h6 className='my-3 text-white'>Popularity: {itemDetails.popularity && <span className='p-2 text-muted '> {itemDetails.popularity?.toFixed(1)} </span>}</h6>
      <p className="text-muted">{itemDetails.overview}</p>
    </div>
  </div> : '' }
      

      <div className="row my-4">

        <div className="col-md-4 d-flex align-items-center">
            <div>
                <div className="brd w-25 mb-3"></div>
               <h2 className="h1">Similar {media_type} </h2>
                
                <div className="brd w-100 mt-3"></div>
            </div>
        </div>

        {similar.slice(0,14).map((item, index)=>
          <div key={index} className="col-md-2">
            <Link to={'/itemdetails/'+ item.id +'/' + media_type}>
              <div className="movie position-relative">
                {item.poster_path ?  <img src={"https://image.tmdb.org/t/p/w500/" + item.poster_path} className="w-100" alt=""/>
                : <img src={"https://image.tmdb.org/t/p/w500/" + item.profile_path} className="w-100" alt=""/>}
    
                {/* {!item.poster_path && !item.profile_path ? <img className="w-100" src={avatar} alt=""/> : '' } */}
    
                <h3 className="h6 my-2"> {item.title} {item.name} </h3>
                 {item.vote_average && (
                  <div className="vote p-2 text-white position-absolute top-0 end-0">
                    {item.vote_average?.toFixed(1)}
                  </div>
                )}
              </div>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
