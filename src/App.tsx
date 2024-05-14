import { useCallback, useState } from 'react'
import { RaceResults } from './analyzer/models'
import UploadForm from './components/UploadForm'
import RaceResultsRenderer from './components/RaceResultsRenderer'
import ColorMappingEditor from './components/ColorMappingEditor'
import { AppContextProvider } from './storage/app-context'

function App() {
    const [results, setResults] = useState<RaceResults>()

    const handleResults = useCallback((results: RaceResults) => {
        setResults(results)
    }, [])

    return (
        <>
            <UploadForm onResultsChange={handleResults} />
            <AppContextProvider>
                <ColorMappingEditor />
                {results && <RaceResultsRenderer results={results} />}
            </AppContextProvider>
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
