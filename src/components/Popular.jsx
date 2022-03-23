// This component going to the Home page 
// In here, we fetch the API 

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Link } from 'react-router-dom';

function Popular() {

  const [popular, setPopular] = useState([]); // the data type here is array 

  useEffect(() => {
    getPolular();
  }, []);

  const getPolular = async () => {

    const check = localStorage.getItem('popular'); // we checking if the popular variable is saved in local storage 

    if (check) {
      setPopular(JSON.parse(check)) // here, we are pasring the JSON data (check variable) from string to array 
    } else {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=12`)
      const data = await api.json();
      localStorage.setItem(popular, JSON.stringify(data.recipes)); // here, 
      setPopular(data.recipes);
      console.log(data.recipes);
    };
  }
  return (
    <div>
      <Wrapper>
        <h4> Popular Picks </h4>
        <br/>
        <Splide options={{
          perPage: 4,
          arrows: false,
          pagination: false,
          drag: 'free',
          gap: '5rem',
        }}>
          {popular.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <Link to={'/recipe/' + recipe.id}>
                    <p> {recipe.title} </p>
                    <img src={recipe.image} alt={recipe.title} />
                    <Gradient />
                  </Link>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
margin: 4rem 0rem; 
`;

const Card = styled.div`
min-height: 25rem;
border-radius: 2rem; 
overflow: hidden; 
position: relative; 

img {
  border-radius: 2rem; 
  position: absolute;
  height: 100%;
  width: 100%; 
  left: 0; 
  object-fit: cover; 
}

p {
  position: absolute; 
  z-index: 10; 
  height: 40%; 
  width: 100%; 
  left: 50%; 
  bottom: 50%; 

  display: flex; 
  transform: translate(-50%, 0%); 
  color: white; 
  font-weight: 600; 
  font-size: 1rem; 

  justify-content: center; 
  align-items: center; 
  text-align: center; 

}
`;

const Gradient = styled.div`
z-index: 3; 
position: absolute; 
width: 100%; 
height: 100%; 
background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5)); 
`

export default Popular

// The useEffect will run the getPopular function as soon as its mounted
// In the [popular, setPopular] = useState, the popular is a variable, the setPopular is the function that modifies the variable.
// while the useState defines the data type, in the above case is an array.
// The perPage: 4, is going to show a Slide of 4 pages
// In line 14, we are checking to see if our popular is saved in the local storage, if it is saved? then, we are taking it
// back and parse it from string to array as coded in line 16, else, then we are setting it in line 26, and fetching it in
// line 24. 


