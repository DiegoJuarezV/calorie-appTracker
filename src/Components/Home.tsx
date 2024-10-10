import { useReducer } from "react";
import Form from "./Form";
import { activityReducer, initialState } from "../reducers/activity-reducer";
import ActivityList from "./ActivityList";

const Home = () => {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  return (
    <>
      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form
            dispatch={dispatch}
            state={state} 
          />
        </div>
      </section>

      <section className="p-10 mx-auto max-w-4xl">
        <ActivityList
          state={state}
          dispatch={dispatch}
        />
      </section>
    </>
  )
}

export default Home;