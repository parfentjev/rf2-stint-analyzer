import { FC } from 'react'
import { Lap } from '../analyzer/models'
import {
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'

interface TireUsageChartProps {
    laps: Lap[]
    raceLaps: number
}

type DataPoint = {
    number: number
    averageWear: number
}

const TireUsageChart: FC<TireUsageChartProps> = (props) => {
    var dataPoints: DataPoint[] = props.laps

    if (dataPoints.length < props.raceLaps) {
        const dummyLaps: DataPoint[] = Array.from(
            Array(props.raceLaps - dataPoints.length + 1).keys(),
            (i) => {
                return {
                    number: props.laps.length + i,
                    averageWear: 0,
                }
            }
        )

        dataPoints = [...props.laps, ...dummyLaps]
    }

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dataPoints}>
                <CartesianGrid strokeDasharray="3 3" stroke="white" />
                <XAxis dataKey="number" stroke="white" interval={1} />
                <YAxis dataKey="averageWear" stroke="white" domain={[0, 1]} />
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'var(--color2)',
                        borderColor: 'var(--color3)',
                        border: 'none',
                        borderRadius: '5px',
                        color: 'white',
                    }}
                    itemStyle={{ color: '#ffffff' }}
                />
                <Legend />
                <Line
                    type="monotone"
                    dataKey="averageWear"
                    stroke="rgb(255, 213, 0)"
                    dot={false}
                    name="tire wear"
                    strokeWidth={3}
                />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default TireUsageChart
