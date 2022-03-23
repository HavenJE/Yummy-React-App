import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import React from 'react'

function Recipe() {

  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");

  // This function gives us info about each recipe 
  const fetchDetails = async () => {
    const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`);
    const detailData = await data.json(); // this will save the fetched data 
    setDetails(detailData); // we keep it like that since its an object, if it was an array, we do (detailData.results)
    console.log(detailData);
  };

  useEffect(() => {
    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.name]);

  return (
    <DetailWrapper>
      <div>
        <h2> {details.title} </h2>
        <img src={details.image} alt="" srcset="" />

      </div>

      <Info>
        <Button
          className={activeTab === 'instructions' ? 'active' : ''}
          onClick={() => setActiveTab('instructions')}>
          Instructions
        </Button>

        <Button
          className={activeTab === 'Ingredients' ? 'active' : ''}
          onClick={() => setActiveTab('Ingredients')}>
          Ingredients
        </Button>

        {activeTab === 'instructions' && (
          <div>
            <h4>
              dangerouslySetInnerHTML={{ __html: details.summary }}
              dangerouslySetInnerHTML={{ __html: details.instructions }}
            </h4>
          </div>
        )}; 

        {activeTab === 'instructions' && (
          <ul>
            {details.extendedIngredients.map((ingredient) =>
              <li key={ingredient.id}> {ingredient.original} </li>
            )}
          </ul>
        )}

      </Info>
    </DetailWrapper>
  )
}

const DetailWrapper = styled.div`
  margin-top: 10rem; 
  margin-bottom: 5rem; 
  display: flex; 
  .active{
    background: linear-gradient(35deg, #494949, #313131); 
    color: white; 
  }

  h2 {
    margin-bottom: 2rem; 
  }
  
  li {
    font-size: 1.2rem; 
    line-height: 2.5rem; 
  }

  ul {
    margin-top: 2rem; 
  }
`;

const Button = styled.button`
  padding: 1rem 2rem; 
  color: #313131; 
  background: white; 
  border: 2px solid black; 
  margin-right: 2rem; 
  font-weight: 600; 
`
const Info = styled.div`
  margin-left: 10rem; 
`
export default Recipe

// <h3>
// dangerouslySetInnerHTML={{__html: details.summary}}
// dangerouslySetInnerHTML={{__html: details.instructions}}
// </h3>