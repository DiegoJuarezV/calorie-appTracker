import { Activity } from "../types"

const activitiesLs = JSON.parse(localStorage.getItem("activities") || '[]');

export type ActivityState = {
  activities: Activity[]
  activeId: Activity['id']
}

export type ActivityAction = 
  { type: "SAVE_ACTIVITY", payload: { newActivity: Activity }} |
  { type: "SET_ACTIVEID", payload: { id: Activity['id'] }} |
  { type: "DELETE_ACTIVITY", payload: { id: Activity['id'] }} |
  { type: "RESTART_APP" }

export const initialState: ActivityState = {
  activities: activitiesLs,
  activeId: ''
}

let updatedActivities: Activity[] = [];

export const activityReducer = (state: ActivityState, action: ActivityAction) => {
  switch (action.type) {
    case "SAVE_ACTIVITY":
      if (state.activeId) {
        updatedActivities = state.activities.map(activity => activity.id === state.activeId ? action.payload.newActivity : activity)
      } else {
        updatedActivities = [ ...state.activities, action.payload.newActivity ]
      }
      return { ...state, activities: updatedActivities, activeId: ''}
    case "DELETE_ACTIVITY": {
      const filteredActivities = state.activities.filter((activity) => activity.id !== action.payload.id)
      return { ...state, activities: filteredActivities, activeId: '' }
    }
    case "SET_ACTIVEID":
      return { ...state, activeId: action.payload.id } 
    case "RESTART_APP":
      return { activities: [], activeId: '' }
  }
}