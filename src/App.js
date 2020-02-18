import React,{useEffect, useState} from 'react';
import Recipe from './Recipe';
import './App.css';
import { SearchFilter } from './search-filter.component';


const App = () => {

  //API ID & Key
  const APP_ID = 'c02f2381';
  const APP_KEY = '0ba1c7c8830d5aea87b9144aadb2a70a';

  //Set state for recipes results, use [] because there's multiple data being returned to this
  const [recipes, setRecipes] = useState([]);
  //Set state for the search, use '' because search is a string
  const [search, setSearch] = useState('');
  //Set state for the search
  const[query, setQuery] = useState('chicken');

  //Trigger function to get the recipe
  useEffect(() => {
    getRecipes();
  }, [query]);

  //Get the recipes from the API
  const getRecipes = async () => {
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
    console.log(data.hits.length);
  }

  //When user clicks search button, this function will run, use 'e' because this function is an event
  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
  }

  const filterLogic = e => {
    e.target.classList.toggle('active-filter');
    const li = e.target;
    if (li.classList.contains('active-filter')) {
      setQuery(li.innerText);
    } else {
      setQuery('');
    }
  };

  return (
      <form onSubmit={getSearch} className="recipe-body">
        <div className="search-form">
            <div className="header-title">Easy Recipes</div>
            <input className="search-bar" placeholder="Search a dish here.." type="text" value={search} onChange={updateSearch} />
            <button className="search-button" type="submit">Search</button>

            <div className="search-filter">
              <p className="search-filter-header">Quick Filters</p>
              <SearchFilter filterLogic={filterLogic} />
            </div>
          
            <div className="footer-credits">
              <p>Made by: <span>Carlo Santos</span></p>
            </div>
        </div>
        <div className="recipes-container">
        {recipes.map(recipe =>(
            <Recipe 
            key={recipe.recipe.uri}
            title={recipe.recipe.label} 
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
            serving={recipe.recipe.yield}
            timetocook={recipe.recipe.totalTime}
            madeby={recipe.recipe.source}
            madebylink={recipe.recipe.url}
            healthlabels={recipe.recipe.healthLabels}
            dietlabels={recipe.recipe.dietLabels}
            cautions={recipe.recipe.cautions}
            nutrients={recipe.recipe.totalNutrients}
            />
        ))}
        </div>
      </form>
  )
}

export default App;
