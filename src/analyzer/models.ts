export type RaceResults = {
    venue: string
    race: Race
}

export type Race = {
    laps: number
    drivers: Driver[]
}

export type Driver = {
    name: string
    position: number
    laps: Lap[]
}

export type Lap = {
    number: number
    time: number
    frontCompound: string
    frontLeftWear: number
    frontRightWear: number
    rearCompound: string
    rearLeftWear: number
    rearRightWear: number
    pit?: string
}

export type CompoundColor = { name: string; color: string }
