import { useMemo } from "react";
import { ActivityAction, ActivityState } from "../reducers/activity-reducer";

type HeaderProps = {
  state: ActivityState
  dispatch: React.Dispatch<ActivityAction>
}

const Header = ({ state, dispatch } : HeaderProps) => {
  const restartApp = useMemo(() => state.activities.length, [state.activities])

  const handleRestart = () => {
    dispatch({ type: 'RESTART_APP' })
  }

  return (
    <header className="bg-lime-600 py-3">
      <section className="max-w-4xl mx-auto flex justify-between items-center">
        <h1 className="text-center text-2xl font-bold text-white uppercase">
          Contador de calorias
        </h1>

        <button 
          className="bg-gray-800 hover:bg-gray-600 p-2 font-bold uppercase 
          text-white cursor-pointer rounded-lg text-sm disabled:opacity-10"
          disabled={!restartApp}
          onClick={handleRestart}
        >
          Reiniciar App
        </button>
      </section>
    </header> 
  )
}

export default Header;