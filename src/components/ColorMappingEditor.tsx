import { FC, useState } from 'react'
import { AppContextProvider, useAppContext } from '../storage/app-context'
import JsonEditor from './JsonEditor'
import InputElement from './InputElement'

const ColorMappingEditor: FC = () => {
    const { compoundColors, setCompoundColors } = useAppContext()
    const [showMappings, setShowMappings] = useState(false)

    const mapperHandler = () => {
        setShowMappings(!showMappings)
    }

    return (
        <AppContextProvider>
            <div className="text-center">
                <InputElement
                    id="mapper"
                    labelText="Tire Mappings"
                    htmlProps={{ onClick: mapperHandler }}
                />
            </div>
            <div>
                {showMappings && (
                    <JsonEditor
                        data={compoundColors}
                        onRefresh={setCompoundColors}
                    />
                )}
            </div>
        </AppContextProvider>
    )
}

export default ColorMappingEditor
