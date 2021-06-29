import { h } from 'vue'
import FormItem from 'packages/vue/src/components/Form/FormItem.vue'

export function withExtraProps(Wrapped: any, extraProps: Record<string, any>) {
    return {
        render() {
            return h(Wrapped, {
                ...this.$attrs,
                ...extraProps
            })
        }
    }
}

export function withFormItem(Wrapped: any) {
    return {
        render() {
            return h(FormItem, {}, {
                default: (data) => {
                    return h(Wrapped, {
                        ...data.slotProps
                    })
                }
            })
        }
    }
}
