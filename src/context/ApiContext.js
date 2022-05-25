import { createContext, useMemo, useContext } from 'react';
import { converter } from '../app.service'

export const ApiContext = createContext()

const rootUrl = 'https://www.fluidmotion.ie/taskboard/api/'

export const ApiProvider = props => {

    // const [state, setState] = useState(undefined)

    const config = fetch(rootUrl + `get-config.php`)
        .then(data => {
            console.log(data)
            return { ...data }
        })
        .catch(console.log)

    const tasks = fetch(rootUrl + `get-tasks.php`)
        .then(data => {
            console.log(data)
            return converter(data)
        })
        .catch(console.log)

    const value = useMemo(() => ({
        config,
        tasks
    }), [
        config,
        tasks
    ]
    )

    return <ApiContext.Provider value={value} {...props} />
}

export const useApiContext = () => {
    const context = useContext(ApiContext)

    if (context === undefined) {
        throw new Error('useApiContext must be used within a ApiProvider')
    }

    return context
}

export default ApiContext
