import { useState } from "react";
import { categories } from "../data/categories";
import { Activity } from "../types";

const Form = () => {
  const [customer, setCustomer] = useState<Activity>({
    category: 1,
    activity: "",
    calories: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    const isNumericField = ["category", "calories"].includes(name); 
    setCustomer({ ...customer, [name]: isNumericField ? Number(value) : value });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("guardando información...");
  }

  const isActivityValid = () => {
    const { activity, calories } = customer;
    return activity.trim() !== '' && calories > 0;
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
        value="Guardar comida o ejercicio"
        disabled={!isActivityValid()} 
      />
    </form>
  )
}

export default Form;