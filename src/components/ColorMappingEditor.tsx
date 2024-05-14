import { FC, useState } from 'react'
import { AppContextProvider, useAppContext } from '../storage/app-context'
import JsonEditor from './JsonEditor'

const ColorMappingEditor: FC = () => {
    const { compoundColors, setCompoundColors } = useAppContext()
    const [showMappings, setShowMappings] = useState(false)

    const mapperHandler = () => {
        setShowMappings(!showMappings)
    }

    return (
        <AppContextProvider>
            <div className="text-center">
                <input
                    id="mapper"
                    type="button"
                    className="hidden"
                    onClick={mapperHandler}
                />
                <label htmlFor="mapper" className="action-label">
                    Tire Mappings
                </label>
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
