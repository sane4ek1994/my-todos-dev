import {DetailedHTMLProps, InputHTMLAttributes} from 'react';

type TInput = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    type: string
}
const Input = ({type, ...rest}: TInput) => {
    return (
        <input {...rest} type={type}/>
    );
};

export default Input;
