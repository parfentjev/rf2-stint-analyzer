import { parseString } from 'xml2js'
import { RaceResults } from './models'

export const deserializeXML = (xml: string) => {
    return new Promise<RaceResults>((resolve, reject) => {
        parseString(xml, (error, result) => {
            if (error) {
                reject(error)
            } else {
                const raceResult = result.rFactorXML.RaceResults[0]

                const output = new RaceResults(
                    raceResult.TrackVenue[0],
                    raceResult.TimeString[0]
                )

                resolve(output)
            }
        })
    })
}
