import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid'
import { categories } from "../data/categories";
import { Activity } from "../types";
import { ActivityAction, ActivityState } from "../reducers/activity-reducer";

type FormProps = {
  dispatch: React.Dispatch<ActivityAction>
  state: ActivityState
}

const initialState : Activity = {
  id: uuidv4(),
  category: 1,
  activity: "",
  calories: 0
}

const Form = ({ dispatch, state } : FormProps) => {
  const [customer, setCustomer] = useState<Activity>(initialState);
  
  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter((activityFilter) => activityFilter.id === state.activeId)[0];
      setCustomer(selectedActivity);
    }
  }, [state.activeId, state.activities])

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    const isNumericField = ["category", "calories"].includes(name); 
    setCustomer({ ...customer, [name]: isNumericField ? Number(value) : value });
  }

  const isActivityValid = () => {
    const { activity, calories } = customer;
    return activity.trim() !== '' && calories > 0;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch({ type: "SAVE_ACTIVITY", payload: { newActivity: customer }})
    setCustomer({ ...initialState, id: uuidv4() });
  }

  return (
    <form className="space-y-5 bg-white shadow p-10 rounded-lg" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">Categoria:</label>
        <select 
          className="border border-slate-300 p-2 rounded-lg w-full bg-white" 
          id="category" 
          value={customer.category}
          name="category"
          onChange={handleChange}
        >
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
          <label htmlFor="activity" className="font-bold">Actividad:</label>
          <input 
            type="text" 
            id="activity" 
            value={customer.activity}
            name="activity"
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Ej. Comida, Jugo de naranja, Ejercicio, Caminata..."
            onChange={handleChange}
          />
      </div>

      <div className="grid grid-cols-1 gap-3">
          <label htmlFor="calories" className="font-bold">Calorias:</label>
          <input 
            type="number" 
            id="calories" 
            value={customer.calories}
            name="calories"
            className="border border-slate-300 p-2 rounded-lg"
            placeholder="Calorias... ej. 300 Cal"
            onChange={handleChange}
          />
      </div>

      <input 
        type="submit"
        className="bg-gray-900 hover:bg-gray-600 w-full p-2 font-bold uppercase text-white cursor-pointer 
          disabled:opacity-10"
        value={customer.category === 1 ? "Guardar comida" : "Guardar ejercicio"}
        disabled={!isActivityValid()} 
      />
    </form>
  )
}

export default Form;