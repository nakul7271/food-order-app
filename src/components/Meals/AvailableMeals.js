import React, {useEffect, useState} from "react";
import Card from "../UI/Card";
import Classes from "./AvailableMeals.module.css";
import MealItem from "./MealItem/MealItem";



const AvailableMeals = () => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

  useEffect(() => {
    const fetchMeals = async () => { 

      const response = await fetch('https://my-first-project-react-h-a50f4-default-rtdb.firebaseio.com/meals.json');

      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      
      const responseData = await response.json();

      const loadedMeals = [];
    
      for (const key in responseData) {
        loadedMeals.push({
          key: key,
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };
  
    fetchMeals().catch((error) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
   
  }, [])

  if (isLoading) {
    return <section className={Classes.mealsLoading}>
      <p>Loading...</p>
    </section>
  }
  if (httpError) {
    return <section className={Classes.mealsError}>
      <p>{httpError}</p>
    </section>
  }

  const mealsList = meals.map((meal) => {
    return (
      <MealItem
        id={meal.id}
        key={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );   
  });

  return (
    <Card className={Classes.meals}>
      <ul>{mealsList}</ul>
    </Card>
  );
};

export default AvailableMeals;
