import { FC, useState } from 'react'
import { Driver, Race } from '../analyzer/models'
import LapsRenderer from './LapsRenderer'
import TireUsageChart from './TireUsageChart'

interface DriverRendererProps {
    driver: Driver
    race: Race
}

const DriverRenderer: FC<DriverRendererProps> = ({ driver, race }) => {
    const [showCharts, setShowCharts] = useState(false)

    const driverOnClickHandler = () => {
        setShowCharts((s) => !s)
    }

    return (
        <div className="driver-row">
            <p className="driver-name" onClick={driverOnClickHandler}>
                P{driver.position} {driver.name} {!driver.laps && '— no data'}
            </p>
            {driver.laps && (
                <>
                    <LapsRenderer driver={driver} raceLaps={race.laps} />
                    {showCharts && (
                        <TireUsageChart
                            laps={driver.laps}
                            raceLaps={race.laps}
                        />
                    )}
                </>
            )}
        </div>
    )
}

export default DriverRenderer
