import React from "react";
import { Outlet, useNavigate} from "react-router-dom";
import NavBar from "../NavBar/NavBar";

export default function Layout({userData, setUserData}) {

  let navigate = useNavigate();
  function logOut() {
    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('/login') 
  }
  return (
    <>
      <NavBar userData={userData} logOut={logOut}/>
      <div className="container">
        <Outlet> </Outlet>
      </div>
    </>
  );
}
