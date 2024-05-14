import { FC } from 'react'
import { Driver, Race } from '../analyzer/models'
import LapsRenderer from './LapsRenderer'

interface DriverRendererProps {
    driver: Driver
    race: Race
}

const DriverRenderer: FC<DriverRendererProps> = ({ driver, race }) => {
    return (
        <div className="driver-row">
            <p>
                P{driver.position} {driver.name} {!driver.laps && '— no data'}
            </p>
            {driver.laps && (
                <LapsRenderer driver={driver} raceLaps={race.laps} />
            )}
        </div>
    )
}

export default DriverRenderer
