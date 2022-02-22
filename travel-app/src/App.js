import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./components/navbar.component";
import ListLocations from "./components/list-locations.component";
import AddLocation from "./components/add-location.component";
import EditLocation from "./components/edit-location.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <Routes>
        <Route path = "/" exact element = {<ListLocations />} ></Route>
        <Route path = "/add" element = {<AddLocation />} ></Route>
        <Route path = "/edit/:id" element = {<EditLocation />} ></Route>
        <Route path = "/user" element = {<CreateUser />} ></Route>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
