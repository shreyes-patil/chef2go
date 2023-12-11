import React from 'react';
import { Card, CardContent, Typography, CardMedia, Grid, Button, TextField } from '@mui/material';
import { getAllRecipes } from '../../services/recipe';
import SearchBar from '../../components/SearchBar/SearchBar';
import RecipeGrid from '../../components/RecipeGrid/RecipeGrid';
interface Recipe {
  id: number;
  name: string;
  chef: string
  imageUrl: string;
}

type TopRecipesProps = Recipe[];

const RecipeSearch: React.FC = () => {
  const [apiData, setApiData] = React.useState<TopRecipesProps | null>(null);
  async function demo() {
    console.log("here")
    let x: any = await getAllRecipes();
    console.log(`x value: ${JSON.stringify(x)}`);

    setApiData(x?.data);
  }
  React.useEffect(() => {
    if (!apiData) {
      demo()
    }
  }, [apiData]);

  console.log("updated api data", apiData);

  return (
    <div className="container mx-auto my-8">
      {/* Rectangular Full-Width Image Section */}
      <div className="relative">
        <img
          src="https://bigtreefarms.com/wp-content/uploads/2022/07/BTF_RecipeHeader-1-scaled.jpg"// Replace with your actual image URL
          alt="Full Width Image"
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-black">
          <h2 className="text-6xl font-bold mb-46 mr-56">Explore Our Recipes</h2>
          <br></br>
        </div>
      </div>

      <SearchBar onSearch={(e) => console.log('search')} />

      {/* All Recipes Section */}
      <h1 className="text-3xl font-bold mb-4 mt-8" style={{ color: 'black' }}>All Recipes</h1>
      {/* <RecipeGrid /> */}
      <Grid container spacing={3}>
        {apiData?.map((Recipe: Recipe) => (
          <Grid item xs={12} sm={6} md={4} key={Recipe.id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={Recipe?.imageUrl}
                className="object-cover"
              />
              <CardContent>
                <Typography variant="h6">{Recipe.name}</Typography>
                <Typography variant="h6">{Recipe.chef}</Typography>
                {/* View Recipe Button */}
                <Button variant="contained" color="primary" className="mt-4">
                  View Recipe
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default RecipeSearch;

