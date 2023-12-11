// Import necessary libraries and types
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, Typography, CardMedia, Grid, Button } from '@mui/material';
import { getAllRecipes } from '../../services/recipe';
import SearchBar from '../../components/SearchBar/SearchBar';
import RecipeGrid from '../../components/RecipeGrid/RecipeGrid';
import { setRecipes } from '../../store/slice/recipe-slice'; // Adjust the path
import Recipe from '../../models/Recipe';
import { AppState } from '../../store';

// interface Recipe {
//   id: number;
//   name: string;
//   chef: string;
//   imageUrl: string;
// }

type TopRecipesProps = Recipe[];

const RecipeSearch: React.FC = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state: AppState) => state.recipes);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const fetchedRecipes = await getAllRecipes();
        dispatch(setRecipes(fetchedRecipes.data));
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, [dispatch]);

  const handleSearch = (query: string) => {
    const filteredRecipes = recipes.recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(query.toLowerCase())
    );
    dispatch(setRecipes(filteredRecipes));
  };

  return (
    <div className="container mx-auto my-8">
      <SearchBar onSearch={handleSearch} />
      <RecipeGrid />
    </div>
  );
};

export default RecipeSearch;


