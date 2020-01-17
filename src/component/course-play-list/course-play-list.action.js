import { UPDATE_HISTORY } from "./course-play-list.const";

export const updateHistoryAction = secondToUpdate => ({
  type: UPDATE_HISTORY,
  secondToUpdate,
})

export const initHistoryAction = value => ({
  type: 'INIT',
  value,
})
