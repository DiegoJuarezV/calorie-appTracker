import { useEffect, useReducer } from "react";
import Form from "./Form";
import { activityReducer, initialState } from "../reducers/activity-reducer";
import ActivityList from "./ActivityList";
import Header from "./Header";
import CalorieTracker from "./CalorieTracker";

const Home = () => {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem("activities", JSON.stringify(state.activities))
  }, [state.activities])

  return (
    <>
      <Header
        state={state}
        dispatch={dispatch} 
      />
      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form
            dispatch={dispatch}
            state={state} 
          />
        </div>
      </section>

      <section className="bg-gray-700 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker
            state={state} 
          />
        </div>
      </section>

      <section className="p-10 bg-lime-50">
        <ActivityList
          state={state}
          dispatch={dispatch}
        />
      </section>
    </>
  )
}

export default Home;