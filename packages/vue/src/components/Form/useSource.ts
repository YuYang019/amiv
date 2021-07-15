import { watchEffect, getCurrentInstance, ref, inject } from 'vue'
import { injectionKey } from './useForm'

type Source = string | {
    method?: 'get' | 'post';
    url: string;
    data?: Record<string, string>
}

interface Props {
    [key: string]: unknown;
    name: string;
    source?: Source;
}

interface Option {
    value: unknown;
    label: string;
}

function isString(data: unknown): data is string {
    return typeof data === 'string'
}

function hasOwnProperty(obj: any, key: string) {
    return Object.prototype.hasOwnProperty.call(obj, key)
}

function useSource() {
    const instance = getCurrentInstance()
    const props = instance?.props as Props
    const options = ref<Option[]>([])

    if (!props?.source) {
        return {}
    }

    const form = inject(injectionKey)
    if (isString(props.source)) {
        const pattern = /\${([\s\S]+?)}/g
        watchEffect(() => {
            const api = (props.source as string).replace(pattern, (...args) => {
                const key = args[1]
                return form?.formValue[key] ?? ''
            })

            console.log('api', api, props.name)

            options.value = []
            if (hasOwnProperty(form?.formValue, props.name)) {
                // 联动被触发时，重置
                form?.setFormValue(props.name, '')
            }

            setTimeout(() => {
                options.value = [
                    { label: 'asda', value: 1 },
                    { label: '123123', value: 2 },
                    { label: 'vfcsa', value: 3 }
                ]
            }, 2000)
        })
    }

    return {
        options
    }
}

export default useSource
