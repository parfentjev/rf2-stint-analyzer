import { FC, useEffect, useState } from 'react'
import { Driver, Race } from '../analyzer/models'
import LapsRenderer from './LapsRenderer'
import TireUsageChart from './TireUsageChart'

interface DriverRendererProps {
    driver: Driver
    race: Race
    forceShowChart: boolean
}

const DriverRenderer: FC<DriverRendererProps> = (props) => {
    const [showCharts, setShowCharts] = useState(false)

    useEffect(() => {
        setShowCharts(props.forceShowChart)
    }, [props.forceShowChart])

    const driverOnClickHandler = () => {
        setShowCharts((s) => !s)
    }

    return (
        <div className="driver-row">
            <p className="driver-name" onClick={driverOnClickHandler}>
                <strong>P{props.driver.position}</strong> {props.driver.name}{' '}
                {!props.driver.laps && '— no data'}
            </p>
            {props.driver.laps && (
                <>
                    <LapsRenderer
                        driver={props.driver}
                        raceLaps={props.race.laps}
                    />
                    {showCharts && (
                        <TireUsageChart
                            laps={props.driver.laps}
                            raceLaps={props.race.laps}
                        />
                    )}
                </>
            )}
        </div>
    )
}

export default DriverRenderer
