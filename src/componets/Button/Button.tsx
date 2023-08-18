import {DetailedHTMLProps, ButtonHTMLAttributes} from 'react';

type TButton = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    name: string
    callback: () => void
}
const Button = ({name, callback, ...rest}: TButton) => {
    return (
        <button {...rest} onClick={callback}>{name}</button>
    );
};

export default Button;
