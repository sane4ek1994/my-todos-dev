import React from 'react';

type TButton =  React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    name: string
    callback: () => void
}
const Button = ({name, callback, ...rest}: TButton) => {
    return (
        <button {...rest} onClick={callback}>{name}</button>
    );
};

export default Button;
