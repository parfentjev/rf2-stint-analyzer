import { Lap } from './models'

export type AverageTireWear = {
    combined: number
    frontLeft: number
    frontRight: number
    rearLeft: number
    rearRight: number
}

export const averageTireWear = (laps: Lap[]): AverageTireWear => {
    const totalLaps = laps.length

    var frontLeftTotal = 0
    var frontRightTotal = 0
    var rearLeftTotal = 0
    var rearRightTotal = 0

    laps.forEach((l) => {
        frontLeftTotal += l.frontLeftWear
        frontRightTotal += l.frontRightWear
        rearLeftTotal += l.rearLeftWear
        rearRightTotal += l.rearRightWear
    })

    const frontLeft = 1 - frontLeftTotal / totalLaps
    const frontRight = 1 - frontRightTotal / totalLaps
    const rearLeft = 1 - rearLeftTotal / totalLaps
    const rearRight = 1 - rearRightTotal / totalLaps

    return {
        combined: Number(
            ((frontLeft + frontRight + rearLeft + rearRight) / 4).toFixed(2)
        ),
        frontLeft: frontLeft,
        frontRight: frontRight,
        rearLeft: rearLeft,
        rearRight: rearRight,
    }
}
