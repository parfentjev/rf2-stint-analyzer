import { ChangeEvent, FC, useState } from 'react'
import { readFile } from '../analyzer/file-reader'
import { deserializeXML } from '../analyzer/analyzer'
import { RaceResults } from '../analyzer/models'

interface UploadFormProps {
    onResultsChange: (results: RaceResults) => void
}

const UploadForm: FC<UploadFormProps> = (props) => {
    const [fileLabel, setFileLabel] = useState('Choose a file')

    const fileHandler = async (event: ChangeEvent<HTMLInputElement>) => {
        const file =
            event.currentTarget.files?.length === 1 &&
            event.currentTarget.files[0]

        if (file) {
            setFileLabel(file.name)

            const xml = await readFile(file)
            const results = await deserializeXML(xml)

            props.onResultsChange(results)
        }
    }

    return (
        <>
            <p>
                This app can be used to visualize race stints. Upload an rFactor
                2 log you'd like to analyze using the button below.
            </p>
            <p>
                You can find logs here:{' '}
                <span className="text-highlight">
                    C:\Program Files (x86)\Steam\steamapps\common\rFactor
                    2\UserData\Log\Results
                </span>
            </p>
            <div className="text-center">
                <input
                    id="file"
                    type="file"
                    accept="*.xml"
                    className="hidden"
                    onChange={fileHandler}
                />
                <label htmlFor="file" className="file-label">
                    {fileLabel}
                </label>
            </div>
        </>
    )
}

export default UploadForm
