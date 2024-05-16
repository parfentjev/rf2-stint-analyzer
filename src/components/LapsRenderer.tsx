import { FC } from 'react'
import { Driver } from '../analyzer/models'
import { useAppContext } from '../storage/app-context'
import { averageTireWear } from '../analyzer/analyzer'

class Stint {
    constructor(
        public begin: number,
        public end: number,
        public compound: string,
        public final: boolean,
        public averageTireWear: number
    ) {}
}

const LapsRenderer: FC<{ driver: Driver; raceLaps: number }> = ({
    driver,
    raceLaps,
}) => {
    const context = useAppContext()
    const laps = driver.laps

    var stints: Stint[] = []
    var stintBegin = 1

    for (let i = 0; i < laps.length; i++) {
        const pitted = laps[i].pit === '1'
        const finalStint = laps.length - 1 === i

        if (pitted || finalStint) {
            stints = [
                ...stints,
                new Stint(
                    stintBegin,
                    laps[i].number,
                    laps[i].frontCompound,
                    finalStint,
                    averageTireWear(laps.slice(stintBegin, i)).combined
                ),
            ]

            stintBegin = laps[i].number + 1
        }
    }

    return (
        <div className="progress-bar" style={{ width: `100%` }}>
            {stints.map((s) => {
                const stintLength = s.end - s.begin + 1
                const color =
                    context.compoundColors.find(
                        (i) => i.name.toUpperCase() === s.compound.toUpperCase()
                    )?.color || ''

                return (
                    <div
                        key={`${s.begin}-${s.end}`}
                        className={`progress-section ${
                            !s.final && 'section-divider'
                        }`}
                        style={{
                            width: `${(stintLength / raceLaps) * 100}%`,
                            backgroundColor: color,
                        }}
                        title={`Avg. wear: ${s.averageTireWear}`}
                    >
                        {stintLength}
                    </div>
                )
            })}
        </div>
    )
}

export default LapsRenderer
