import { FC } from 'react'
import { Driver, Race } from '../analyzer/models'
import LapsRenderer from './LapsRenderer'

const DriverRenderer: FC<{ driver: Driver; race: Race }> = ({
    driver,
    race,
}) => {
    return (
        <>
            {driver.laps && (
                <LapsRenderer driver={driver} raceLaps={race.laps} />
            )}
        </>
    )
}

export default DriverRenderer
