import { FC, InputHTMLAttributes } from 'react'

interface InputElementProps {
    id: string
    labelText: string
    htmlProps: InputHTMLAttributes<HTMLInputElement>
}

export const InputElement: FC<InputElementProps> = (props) => {
    return (
        <>
            <input id={props.id} className="hidden" {...props.htmlProps} />
            <label htmlFor={props.id} className="action-label">
                {props.labelText}
            </label>
        </>
    )
}

export default InputElement
