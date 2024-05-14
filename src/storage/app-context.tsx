import { FC, ReactNode, createContext, useContext, useState } from 'react'
import { CompoundColor } from '../analyzer/models'

type AppContextProps = {
    compoundColors: CompoundColor[]
    setCompoundColors: (compoundColors: CompoundColor[]) => void
}

export const AppContext = createContext<AppContextProps>({
    compoundColors: [],
    setCompoundColors: (compoundColors: CompoundColor[]) => {},
})

export const AppContextProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [compoundColors, setCompoundColors] = useState([
        new CompoundColor('Soft', 'rgb(255, 255, 255)'),
        new CompoundColor('Medium', 'rgb(255, 213, 0)'),
        new CompoundColor('Hard', 'rgb(26, 213, 0)'),
        new CompoundColor('Wet', 'rgb(0, 21, 255)'),
    ])

    const value = {
        compoundColors: compoundColors,
        setCompoundColors: (compoundColors: CompoundColor[]) =>
            setCompoundColors(compoundColors),
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)
