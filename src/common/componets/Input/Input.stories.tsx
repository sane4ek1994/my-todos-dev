import Input from 'common/componets/Input/Input'
import {action} from "@storybook/addon-actions";


export default {
    title: 'Input Component',
    component: Input,
}

const onChangedValue = action('New value')

export const InputExample = () => {
    return <Input type='text' onChange={onChangedValue}/>
}
