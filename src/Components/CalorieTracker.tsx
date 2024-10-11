import { useMemo } from "react";
import { ActivityState } from "../reducers/activity-reducer";
import CalorieDisplay from "./CalorieDisplay";

type CalorieTrackerProps = {
  state: ActivityState
}

const CalorieTracker = ({ state } : CalorieTrackerProps) => {
  const consumedCalories = useMemo(() => state.activities.reduce((
    total, activity) => activity.category === 1 ? total + activity.calories : total, 0
  ), [state.activities])

  const burnedCalories = useMemo(() => state.activities.reduce((
    total, activity) => activity.category === 2 ? total + activity.calories : total, 0
  ), [state.activities])

  const compareToCalories = useMemo(() => consumedCalories - burnedCalories, [consumedCalories, burnedCalories])

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">Resumen de calorias</h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay
          caloriesType={consumedCalories}
          text="Consumidas" 
        />
        <CalorieDisplay
          caloriesType={burnedCalories}
          text="Quemadas" 
        />
        <CalorieDisplay
          caloriesType={compareToCalories}
          text="Diferencia" 
        />
      </div>
    </>
  )
}

export default CalorieTracker;