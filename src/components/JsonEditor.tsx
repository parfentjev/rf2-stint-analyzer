import { useState } from 'react'
import AceEditor from 'react-ace'

import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/webpack-resolver'
import InputElement from './InputElement'

interface JsonEditorProps<T> {
    data: T
    onRefresh: (newResults: T) => void
}

const JsonEditor = <T,>({ data, onRefresh }: JsonEditorProps<T>) => {
    const [value, setValue] = useState(JSON.stringify(data, null, 2))

    const changeHandler = (newValue: string) => {
        setValue(newValue)
    }

    const refreshHandler = () => {
        onRefresh(JSON.parse(value))
    }

    return (
        <div className="text-center">
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
                height="80vh"
                style={{ margin: '1rem 0' }}
                value={value}
                onChange={changeHandler}
                fontSize="1rem"
                lineHeight={19}
            />
            <InputElement
                id="refresh"
                labelText="Refresh"
                onClick={refreshHandler}
            />
        </div>
    )
}

export default JsonEditor
