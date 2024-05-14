import { FC, useRef, useState } from 'react'
import { RaceResults } from '../analyzer/models'
import DriverRenderer from './DriverRenderer'
import html2canvas from 'html2canvas'
import JsonEditor from './JsonEditor'
import { useAppContext } from '../storage/app-context'

const RaceResultsRenderer: FC<{ results: RaceResults }> = ({ results }) => {
    const resultsRef = useRef<HTMLDivElement>(null)

    const { compoundColors } = useAppContext()
    const [raceResults, setRaceResults] = useState(results)
    const [showEditor, setShowEditor] = useState(false)

    const saveHandler = () => {
        if (!resultsRef.current) {
            return
        }

        html2canvas(resultsRef.current, {
            backgroundColor: 'rgb(30, 30, 30)',
        }).then((canvas) => {
            const a = document.createElement('a')
            a.href = canvas
                .toDataURL('image/jpeg', 1.0)
                .replace('image/jpeg', 'image/octet-stream')
            a.download = 'race-stints.jpg'
            a.click()
        })
    }

    const editorHandler = () => {
        setShowEditor(!showEditor)
    }

    const refreshHandler = (newResults: RaceResults) => {
        setRaceResults(newResults)
    }

    return (
        <>
            <div className="results" ref={resultsRef}>
                <h1>
                    {raceResults.venue}, {raceResults.race.laps} laps
                </h1>
                {raceResults.race.drivers
                    .sort((a, b) => a.position - b.position)
                    .map((d) => (
                        <DriverRenderer
                            key={d.name}
                            driver={d}
                            race={raceResults.race}
                        />
                    ))}
                <div className="tire-colors">
                    {compoundColors.map((i) => (
                        <>
                            <span
                                className="tire-colors-example"
                                style={{ backgroundColor: i.color }}
                            ></span>
                            {i.name}
                        </>
                    ))}
                </div>
            </div>
            <div className="text-center">
                <input
                    id="save"
                    type="button"
                    className="hidden"
                    onClick={saveHandler}
                />
                <label htmlFor="save" className="action-label">
                    Save
                </label>
                <input
                    id="editor"
                    type="button"
                    className="hidden"
                    onClick={editorHandler}
                />
                <label htmlFor="editor" className="action-label">
                    Editor
                </label>
                {showEditor && (
                    <JsonEditor data={raceResults} onRefresh={refreshHandler} />
                )}
            </div>
        </>
    )
}

export default RaceResultsRenderer
