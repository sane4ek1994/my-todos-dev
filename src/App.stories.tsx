import App from './App'
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";

export default {
    title: 'App Component',
    component: App,
    decorators: [ReduxStoreProviderDecorator]
}


export const EditableSpanExample = () => {
    return <App/>
}
