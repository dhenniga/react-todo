import useSWR from "swr"
import { converter } from '../app.service'

const rootUrl = 'https://www.fluidmotion.ie/taskboard/api/'

const fetcher = (...args) =>
  fetch(...args)
    .then(res =>
      res.json()
    )

export const useConfig = () => {
  const { data, error } = useSWR(
    rootUrl + `get-config.php`,
    fetcher,
    { refreshInterval: 1000 }
  )
  if (error) return console.log(error)
  return { ...data }
}

export const useActiveTasks = () => {
  const { data, error } = useSWR(
    rootUrl + `get-active-tasks.php`,
    fetcher,
    { refreshInterval: 1000 }
  )
  if (error) return console.log(error)
  const activeTasks = data && converter(data)
  return { activeTasks }
}

export const useArchivedTasks = () => {
  const { data, error } = useSWR(
    rootUrl + `get-archived-tasks.php`,
    fetcher
  )
  if (error) return console.log(error)
  const archivedTasks = data && converter(data)
  return { archivedTasks }
}
