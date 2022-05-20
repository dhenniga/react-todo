import useSWR from "swr"
import { converter } from '../app.service'

const fetcher = (...args) =>
  fetch(...args)
    .then(res =>
      res.json()
    )

export const useConfig = () => {
  const { data, error } = useSWR(
    "https://www.fluidmotion.ie/taskboard/api/get-config.php",
    fetcher,
    {
      refreshInterval: 1000
    }
  )
  if (error) return console.log(error)
  return { ...data }
}

export const useTasks = () => {
  const { data, error } = useSWR(
    "https://www.fluidmotion.ie/taskboard/api/get-tasks.php",
    fetcher,
    { refreshInterval: 1000 }
  )
  if (error) return console.log(error)
  const tasks = data && converter(data)
  return { tasks }
}
