import { useCallback } from 'react'
import { RaceResults } from './analyzer/models'
import UploadForm from './components/UploadForm'

function App() {
    const handleResults = useCallback((results: RaceResults) => {
        console.log(results.venue)
    }, [])

    return (
        <>
            <UploadForm onResultsChange={handleResults} />
        </>
    )
}

export default App
