import { FC, ReactNode, createContext, useContext, useState } from 'react'
import { CompoundColor } from '../analyzer/models'

type AppContextProps = {
    compoundColors: CompoundColor[]
    setCompoundColors: (compoundColors: CompoundColor[]) => void
}

export const AppContext = createContext<AppContextProps>({
    compoundColors: [],
    setCompoundColors: () => {},
})

export const AppContextProvider: FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [compoundColors, setCompoundColors] = useState([
        { name: 'Soft', color: 'rgb(255, 255, 255)' },
        { name: 'Medium', color: 'rgb(255, 213, 0)' },
        { name: 'Hard', color: 'rgb(26, 213, 0)' },
        { name: 'Wet', color: 'rgb(62, 210, 255)' },
    ])

    const value = {
        compoundColors: compoundColors,
        setCompoundColors: (compoundColors: CompoundColor[]) =>
            setCompoundColors(compoundColors),
    }

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)
