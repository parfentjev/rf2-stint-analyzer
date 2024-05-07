import { FC, useRef } from 'react'
import { RaceResults } from '../analyzer/models'
import DriverRenderer from './DriverRenderer'
import html2canvas from 'html2canvas'

const RaceResultsRenderer: FC<{ results: RaceResults }> = ({ results }) => {
    const resultsRef = useRef<HTMLDivElement>(null)

    const saveHandler = () => {
        if (!resultsRef.current) {
            return
        }

        html2canvas(resultsRef.current).then((canvas) => {
            const a = document.createElement('a')
            a.href = canvas
                .toDataURL('image/jpeg', 1.0)
                .replace('image/jpeg', 'image/octet-stream')
            a.download = 'race-stints.jpg'
            a.click()
        })
    }

    return (
        <>
            <div className="results" ref={resultsRef}>
                <h1>
                    {results.venue} {results.date}
                </h1>
                <h2>{results.race.laps} laps</h2>
                {results.race.drivers
                    .sort((a, b) => a.position - b.position)
                    .map((d) => (
                        <DriverRenderer
                            key={d.name}
                            driver={d}
                            race={results.race}
                        />
                    ))}
            </div>
            <div className="text-center">
                <input
                    id="save"
                    type="button"
                    value="Save"
                    className="hidden"
                    onClick={saveHandler}
                />
                <label htmlFor="save" className="action-label">
                    Save
                </label>
            </div>
        </>
    )
}

export default RaceResultsRenderer
