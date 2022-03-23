// This Pages file renders out the Home.jsx here - this is to avoid loading up the App.js file 
// Our Routes are put here 

import Home from "./Home"
import { Route, Routes } from 'react-router-dom';
import Cuisine from "./Cuisine";
import Searched from "./Searched";
import Recipe from "./Recipe";


function Pages() {
    return (
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cuisine/:type" element={<Cuisine />} />
                <Route path="/searched/:search" element={<Searched/>}/>
                <Route path="/recipe/:name" element={<Recipe/>}/>
            </Routes>
    )
}

export default Pages