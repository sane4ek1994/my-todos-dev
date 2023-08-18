import Button from './Button'
import {action} from "@storybook/addon-actions";


export default {
    title: 'Button Component',
    component: Button,
}

const clickAction = action('Click')

export const ButtonExample = () => {
    return <Button name={'Click me'} callback={clickAction}/>
}
