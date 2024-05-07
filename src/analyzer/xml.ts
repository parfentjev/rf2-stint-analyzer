import { parseString } from 'xml2js'
import { Driver, Lap, Race, RaceResults } from './models'

export const readFile = (file: File) => {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader()

        reader.onload = (r) => {
            if (r.target?.result) {
                resolve(r.target.result.toString())
            } else {
                reject(new Error('Failed to read file.'))
            }
        }

        reader.readAsText(file)
    })
}

export const deserializeXML = (xml: string) => {
    return new Promise<RaceResults>((resolve, reject) => {
        parseString(xml, (error, result) => {
            if (error) {
                reject(error)
            } else {
                const raceResult = result.rFactorXML.RaceResults[0]

                const race = new Race(
                    raceResult.Race[0].Laps[0],
                    raceResult.Race[0].Driver.map((d: any) => {
                        return new Driver(
                            d.Name[0],
                            Number(d.Position[0]),
                            mapLaps(d.Lap)
                        )
                    })
                )

                const output = new RaceResults(
                    raceResult.TrackCourse[0],
                    raceResult.TimeString[0],
                    race
                )

                resolve(output)
            }
        })
    })
}

const mapLaps = (laps: any) => {
    if (!laps) {
        return null
    }

    return laps.map((l: any) => {
        return new Lap(
            Number(l.$.num),
            Number(l.$.et),
            extractCompoundName(l.$.fcompound),
            extractCompoundName(l.$.rcompound),
            l.$.pit
        )
    })
}

const extractCompoundName = (rawValue: string) => {
    return rawValue.split(',')[1]
}
