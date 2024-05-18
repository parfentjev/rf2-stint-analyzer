import { FC } from 'react'
import { Driver } from '../analyzer/models'
import { useAppContext } from '../storage/app-context'

interface LapsRendererProps {
    driver: Driver
    raceLaps: number
}

type Stint = {
    begin: number
    end: number
    compound: string
    final: boolean
}

const LapsRenderer: FC<LapsRendererProps> = (props) => {
    const context = useAppContext()
    const laps = props.driver.laps

    var stints: Stint[] = []
    var stintBegin = 1

    for (let i = 0; i < laps.length; i++) {
        const pitted = laps[i].pit === '1'
        const finalStint = laps.length - 1 === i

        if (pitted || finalStint) {
            stints = [
                ...stints,
                {
                    begin: stintBegin,
                    end: laps[i].number,
                    // assuming front and rear compounds are equal
                    // which is normallly the case
                    compound: laps[i].frontCompound,
                    final: finalStint,
                },
            ]

            stintBegin = laps[i].number + 1
        }
    }

    return (
        <>
            <div className="progress-bar" style={{ width: `100%` }}>
                {stints.map((s) => {
                    const stintLength = s.end - s.begin + 1
                    const color =
                        context.compoundColors.find(
                            (i) =>
                                i.name.toUpperCase() ===
                                s.compound.toUpperCase()
                        )?.color || ''

                    return (
                        <div
                            key={`${s.begin}-${s.end}`}
                            className={`progress-section ${
                                !s.final && 'section-divider'
                            }`}
                            style={{
                                width: `${
                                    (stintLength / props.raceLaps) * 100
                                }%`,
                                backgroundColor: color,
                            }}
                        >
                            {stintLength}
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default LapsRenderer
