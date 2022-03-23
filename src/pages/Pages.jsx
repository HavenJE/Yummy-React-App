// This Pages file renders out the Home.jsx here - this is to avoid loading up the App.js file 
// Our Routes are put here 

import Home from "./Home"
import { Route, Routes, useLocation } from 'react-router-dom';
import Cuisine from "./Cuisine";
import Searched from "./Searched";
import Recipe from "./Recipe";
import { AnimatePresence } from 'framer-motion';

function Pages() {

    // This is for opacity of animation - the cards phase in, then phase out, then phase in 
    const location = useLocation(); 

    return (
        <AnimatePresence exitBeforeInter>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home />} />
                <Route path="/cuisine/:type" element={<Cuisine />} />
                <Route path="/searched/:search" element={<Searched />} />
                <Route path="/recipe/:name" element={<Recipe />} />
            </Routes>
        </AnimatePresence>
    )
}

export default Pages