import React from "react";
import Inventory from "./components/Inventory";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
  <div className="container p-4">
      <div className="row">
        <Inventory />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;


