import { useCallback, useState } from 'react'
import { RaceResults } from './analyzer/models'
import UploadForm from './components/UploadForm'
import RaceResultsRenderer from './components/RaceResultsRenderer'

function App() {
    const [results, setResults] = useState<RaceResults>()

    const handleResults = useCallback((results: RaceResults) => {
        setResults(results)
    }, [])

    return (
        <>
            <UploadForm onResultsChange={handleResults} />
            {results && <RaceResultsRenderer results={results} />}
            <footer>
                <a
                    href="https://github.com/parfentjev/rf2-stint-analyzer"
                    target="_blank"
                    rel="noreferrer"
                >
                    github
                </a>
            </footer>
        </>
    )
}

export default App
