import { FC } from 'react'
import { Driver } from '../analyzer/models'

class Stint {
    constructor(
        public begin: number,
        public end: number,
        public compound: string,
        public final: boolean
    ) {}
}

const LapsRenderer: FC<{ driver: Driver; raceLaps: number }> = ({
    driver,
    raceLaps,
}) => {
    const laps = driver.laps

    var stints: Stint[] = []
    var stintBegin = 1

    for (let i = 0; i < laps.length; i++) {
        if (laps[i].pit === '1') {
            stints = [
                ...stints,
                new Stint(
                    stintBegin,
                    laps[i].number,
                    laps[i].frontCompound,
                    false
                ),
            ]

            stintBegin = laps[i].number + 1
        } else if (laps.length - 1 === i) {
            stints = [
                ...stints,
                new Stint(
                    stintBegin,
                    laps[i].number,
                    laps[i].frontCompound,
                    true
                ),
            ]
        }
    }

    return (
        <div className="progress-bar" style={{ width: `100%` }}>
            {stints.map((s) => {
                const stintLength = s.end - s.begin + 1
                var color = ''

                switch (s.compound) {
                    case 'Soft':
                        color = 'section-white'
                        break
                    case 'Medium':
                        color = 'section-yellow'
                        break
                    case 'Hard':
                        color = 'section-green'
                        break
                    case 'Wet':
                        color = 'section-blue'
                        break
                }

                return (
                    <div
                        key={`${s.begin}-${s.end}`}
                        className={`progress-section ${color} ${
                            !s.final && 'section-divider'
                        }`}
                        style={{
                            width: `${(stintLength / raceLaps) * 100}%`,
                        }}
                    >
                        {stintLength}
                    </div>
                )
            })}
        </div>
    )
}

export default LapsRenderer
