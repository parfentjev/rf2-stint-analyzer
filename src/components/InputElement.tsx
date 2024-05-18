import { FC, InputHTMLAttributes, MouseEvent } from 'react'

interface InputElementProps extends InputHTMLAttributes<HTMLInputElement> {
    id: string
    labelText: string
}

export const InputElement: FC<InputElementProps> = (props) => {
    return (
        <>
            <input
                type={props.type ?? 'button'}
                className="hidden"
                {...props}
            />
            <label htmlFor={props.id} className="action-label">
                {props.labelText}
            </label>
        </>
    )
}

export default InputElement
