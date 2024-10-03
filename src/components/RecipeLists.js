import React, { useEffect, useState } from 'react';
import { fetchData } from '../service';
 // Adjust the path accordingly


const RecipeLists = ({ query }) => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            setError(null); // Reset error state

            const response = await fetchData(query);

            // Check if response is valid
            if (response && response.hits) {
                setRecipes(response.hits);
            } else {
                setError('No recipes found or an error occurred.');
            }
            setLoading(false);
        };

        fetchRecipes();
    }, [query]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {recipes.length > 0 ? (
                recipes.map((recipe, index) => (
                    <div key={index}>
                        <h2>{recipe.recipe.label}</h2>
                        {/* Other recipe details */}
                    </div>
                ))
            ) : (
                <div>No recipes available.</div>
            )}
        </div>
    );
};

export default RecipeLists;
