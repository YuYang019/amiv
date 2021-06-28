import {DefineComponent, h} from 'vue'

type Component = DefineComponent<any, any, any>

export default function withExtraProps(Wrapped: Component, extraProps: Record<string, any>) {
    return {
        render() {
            const props = {
                ...this.$attrs,
                ...extraProps
            }

            return h(Wrapped, {
                ...props
            })
        }
    }
}
