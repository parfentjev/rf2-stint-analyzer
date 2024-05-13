import { FC, useState } from 'react'
import { RaceResults } from '../analyzer/models'
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/webpack-resolver'

interface ResultEditorProps {
    results: RaceResults
    onRefresh: (newResults: RaceResults) => void
}

const ResultEditor: FC<ResultEditorProps> = ({ results, onRefresh }) => {
    const [value, setValue] = useState(JSON.stringify(results, null, 2))

    const changeHandler = (newValue: string) => {
        setValue(newValue)
    }

    const refreshHandler = () => {
        onRefresh(JSON.parse(value))
    }

    return (
        <>
            <AceEditor
                mode="javascript"
                theme="monokai"
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    tabSize: 2,
                }}
                width="100%"
                height="1080px"
                style={{ margin: '1rem 0' }}
                value={value}
                onChange={changeHandler}
                fontSize="1rem"
                lineHeight={19}
            />
            <input
                id="refresh"
                type="button"
                className="hidden"
                onClick={refreshHandler}
            />
            <label htmlFor="refresh" className="action-label">
                Refresh
            </label>
        </>
    )
}

export default ResultEditor
