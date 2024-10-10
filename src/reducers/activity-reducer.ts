import { Activity } from "../types"

export type ActivityState = {
  activities: Activity[]
  activeId: Activity['id']
}

export type ActivityAction = 
  { type: "SAVE_ACTIVITY", payload: { newActivity: Activity }} |
  { type: "SET_ACTIVEID", payload: { id: Activity['id'] }}

export const initialState: ActivityState = {
  activities: [],
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
    case "SET_ACTIVEID":
      return { ...state, activeId: action.payload.id } 
  }
}