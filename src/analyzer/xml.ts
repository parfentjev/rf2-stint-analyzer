import { parseString } from 'xml2js'
import { Lap, Race, RaceResults } from './models'

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

export const deserializeXML = (xml: string): Promise<RaceResults> => {
    return new Promise<RaceResults>((resolve, reject) => {
        parseString(xml, (error, result) => {
            if (error) {
                reject(error)
            } else {
                const raceResult = result.rFactorXML.RaceResults[0]

                const race: Race = {
                    laps: raceResult.Race[0].Laps[0],
                    drivers: raceResult.Race[0].Driver.map((d: any) => {
                        return {
                            name: d.Name[0],
                            position: Number(d.Position[0]),
                            laps: mapLaps(d.Lap),
                        }
                    }),
                }

                const output: RaceResults = {
                    venue: raceResult.TrackCourse[0],
                    race: race,
                }

                resolve(output)
            }
        })
    })
}

const mapLaps = (laps: any): Lap[] => {
    if (!laps) {
        return []
    }

    return laps.map((l: any) => {
        return {
            number: Number(l.$.num),
            time: Number(l.$.et),
            frontCompound: extractCompoundName(l.$.fcompound),
            frontLeftWear: Number(l.$.twfl),
            frontRightWear: Number(l.$.twfr),
            rearCompound: extractCompoundName(l.$.rcompound),
            rearLeftWear: Number(l.$.twrl),
            rearRightWear: Number(l.$.twrr),
            pit: l.$.pit,
        }
    })
}

const extractCompoundName = (rawValue: string): string => {
    return rawValue.split(',')[1]
}
