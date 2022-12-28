import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect, useState} from "react";
import "./App.css";
import Home from "./Components/Home/Home";
import Layout from "./Components/Layout/Layout";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import People from "./Components/People/People";
import Profile from "./Components/Profile/Profile";
import Movies from "./Components/Movies/Movies";
import Tv from "./Components/Tv/Tv";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ItemDetails from "./Components/ItemDetails/ItemDetails";
import jwtDecode from "jwt-decode";
import NotFound from "./Components/NotFound/NotFound";

function App() {

  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      saveUserData()
    }}, [])
  

  const [userData, setUserData] = useState(null);
  
  function saveUserData(){
   let encodedToken = localStorage.getItem('userToken');
   let decodedToken = jwtDecode(encodedToken);

   setUserData(decodedToken);
  }

  

  let router = createBrowserRouter([
    {path: "/", element: <Layout userData={userData} setUserData={setUserData}/>,
    children: [
        { path: "/", element: <ProtectedRoute saveUserData={saveUserData} userData={userData}> <Home userData={userData}/> </ProtectedRoute> },
        { path: "home", element: <ProtectedRoute saveUserData={saveUserData} userData={userData}> <Home userData={userData}/> </ProtectedRoute> },
        { path: "movies", element: <ProtectedRoute saveUserData={saveUserData} userData={userData}> <Movies userData={userData}/> </ProtectedRoute>},
        { path: "people", element: <ProtectedRoute saveUserData={saveUserData} userData={userData}> <People userData={userData}/> </ProtectedRoute>},
        { path: "profile", element: <ProtectedRoute saveUserData={saveUserData} userData={userData}> <Profile userData={userData}/> </ProtectedRoute>},
        { path: "tv", element: <ProtectedRoute saveUserData={saveUserData} userData={userData}> <Tv userData={userData}/> </ProtectedRoute>},
        { path: "itemdetails/:id/:media_type", element: <ProtectedRoute saveUserData={saveUserData} userData={userData}> <ItemDetails userData={userData}/> </ProtectedRoute> },
        { path: "login", element: <Login saveUserData={saveUserData}/> },
        { path: "register", element: <Register/> },
        { path: "*", element: <ProtectedRoute saveUserData={saveUserData} userData={userData}> <NotFound userData={userData}/> </ProtectedRoute>},
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
