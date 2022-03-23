// This component going to the Home page 
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

function Veggie() {

  const [veggie, setVeggie] = useState([]); // the data type here is array 

  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {

    const check = localStorage.getItem('veggie'); // we checking if the veggie variable is saved in local storage 

    if (check) {
      setVeggie(JSON.parse(check)) // here, we are pasring the JSON data (check variable) from string to array 
    } else {
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`)
      const data = await api.json();
      localStorage.setItem(veggie, JSON.stringify(data.recipes)); // here, 
      setVeggie(data.recipes);
      console.log(data.recipes);
    };
  }

  return (
    <div>
      <Wrapper>
        <h4> Our Vegetarian Picks </h4>
        <Splide options={{
          perPage: 3,
          arrows: false,
          pagination: false,
          drag: 'free',
          gap: '5rem',
        }}>
          {veggie.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <p> {recipe.title} </p>
                  <img src={recipe.image} alt={recipe.title} />
                  <Gradient />
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

export default Veggie