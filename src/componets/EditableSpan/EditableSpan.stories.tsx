import {EditableSpan} from "./EditableSpan";
import {action} from '@storybook/addon-actions'

export default {
    title: 'EditableSpan Component',
    component: EditableSpan
}

const callback = action('EditableSpan is changed')

export const EditableSpanExample = () => {
    return <EditableSpan title={'React'} onChangeTitle={callback}/>
}
