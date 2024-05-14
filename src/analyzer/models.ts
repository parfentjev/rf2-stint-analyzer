export class RaceResults {
    constructor(public venue: string, public date: string, public race: Race) {}
}

export class Race {
    constructor(public laps: number, public drivers: Driver[]) {}
}

export class Driver {
    constructor(
        public name: string,
        public position: number,
        public laps: Lap[]
    ) {}
}

export class Lap {
    constructor(
        public number: number,
        public time: number,
        public frontCompound: string,
        public rearCompound: string,
        public pit?: string
    ) {}
}

export class CompoundColor {
    constructor(public name: string, public color: string) {}
}
