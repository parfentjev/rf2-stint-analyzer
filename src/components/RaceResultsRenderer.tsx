import { FC, useRef, useState } from 'react'
import { RaceResults } from '../analyzer/models'
import DriverRenderer from './DriverRenderer'
import html2canvas from 'html2canvas'
import JsonEditor from './JsonEditor'
import { useAppContext } from '../storage/app-context'
import InputElement from './InputElement'

interface RaceResultsRendererProps {
    results: RaceResults
}

const RaceResultsRenderer: FC<RaceResultsRendererProps> = (props) => {
    const resultsRef = useRef<HTMLDivElement>(null)

    const { compoundColors } = useAppContext()
    const [raceResults, setRaceResults] = useState(props.results)
    const [showEditor, setShowEditor] = useState(false)
    const [forceShowCharts, setForceShowCharts] = useState(false)

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
        setShowEditor((s) => !s)
    }

    const refreshHandler = (newResults: RaceResults) => {
        setRaceResults(newResults)
    }

    const driversChartsHandler = () => {
        setForceShowCharts((s) => !s)
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
                            forceShowChart={forceShowCharts}
                        />
                    ))}
                <div className="tire-colors">
                    {compoundColors.map((i) => (
                        <div key={i.name}>
                            <span
                                className="tire-colors-example"
                                style={{ backgroundColor: i.color }}
                            ></span>
                            {i.name}
                        </div>
                    ))}
                </div>
            </div>
            <div className="text-center">
                <InputElement
                    id="save"
                    labelText="Save"
                    htmlProps={{ onClick: saveHandler }}
                />
                <InputElement
                    id="charts"
                    labelText="Toggle Charts"
                    htmlProps={{ onClick: driversChartsHandler }}
                />
                <InputElement
                    id="editor"
                    labelText="Editor"
                    htmlProps={{ onClick: editorHandler }}
                />
                {showEditor && (
                    <JsonEditor data={raceResults} onRefresh={refreshHandler} />
                )}
            </div>
        </>
    )
}

export default RaceResultsRenderer
