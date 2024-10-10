import { categories } from "../data/categories";
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import { ActivityAction, ActivityState } from "../reducers/activity-reducer";

type ActivityListProps = {
  state: ActivityState
  dispatch: React.Dispatch<ActivityAction>
}

const ActivityList = ({ state, dispatch } : ActivityListProps) => {
  const getCategoryName = (categoryId: number) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : '';
  }
  /*const categoryName = useMemo(() => (category: Activity['category']) => categories.map(cat => cat.id == category ? cat.name : '') 
  , [])*/

  const handleBtn = (id: string) => {
    dispatch({ type: 'SET_ACTIVEID', payload: { id } })
  }
 
  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center">Comida y actividades</h2>
      {state.activities.map((activity) => (
        <div key={activity.id} className="px-5 py-10 bg-white mt-5 flex justify-between">
          <div className="space-y-2 relative">
            <p className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold 
              ${activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'}`}>
              {getCategoryName(+activity.category)}
            </p>
            <p className="text-2xl font-bold pt-5">{activity.activity}</p>
            <p className="font-black text-4xl text-lime-500">{activity.calories} Calorias</p>
          </div>

          <div className="flex gap-5 items-center">
            <button onClick={() => handleBtn(activity.id)}>
              <PencilSquareIcon className="h-8 w-8 text-gray-800"/>
            </button>
          </div>
        </div>
      ))}
    </>
  )
}

export default ActivityList;