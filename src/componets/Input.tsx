import React from 'react';


type TInput =  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    type: string
}
const Input = ({type, ...rest}: TInput) => {
    return (
        <input {...rest} type={type} />
    );
};

export default Input;
