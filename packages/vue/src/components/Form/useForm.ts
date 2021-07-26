import { ref, reactive, onMounted,InjectionKey, watchEffect, getCurrentInstance, nextTick } from 'vue'
import type { ComponentInternalInstance, Ref } from 'vue'

type RemoveSuffix<T extends string> = T extends `${infer R}On` ? R : never

type ExpTypes = 'disabledOn' | 'visibleOn'

type ExpTypeHandler<T extends string> = `change${RemoveSuffix<Capitalize<T>>}`

type ExpTypeToHandler = {
    [K in ExpTypes]: ExpTypeHandler<K>
}

type Expressions =  {
    [K in ExpTypes]: string
}

interface RegisterFormItemOptions {
    component: ComponentInternalInstance | null,
    expressions: Expressions
}

const expTypeToHandler: ExpTypeToHandler = {
    'disabledOn': 'changeDisabled',
    'visibleOn': 'changeVisible'
}

export const injectionKey: InjectionKey<{
    formValue: Record<string, any>;
    setFormValue: (name: string, value: any) => void;
    registerFormItem: (name: string, options: RegisterFormItemOptions) => void;
    submitForm: () => Promise<void>;
    resetForm: () => void;
    loading: Ref<boolean>
}> = Symbol('')

export function useForm(url = '') {
    const formRef = getCurrentInstance()
    const formValue = reactive({})
    const loading = ref(false)
    const components = new Map<string, ComponentInternalInstance | null>()
    const linkages = new Map<string, Expressions>()
    const evalCache = new Map<string, () => void>()

    function run(ctx: any, exp: string) {
        let fn
        if (evalCache.has(exp)) {
            fn = evalCache.get(exp)
        } else {
            fn = new Function(
                'data',
                'utils',
                `with(data) { return !!(${exp}) }`
            )
            evalCache.set(exp, fn)
        }

        try {
            console.log('run', exp)
            return fn.call(ctx, ctx, {})
        } catch (err) {
            console.warn(exp, err)
            return false
        }
    }

    function watchExpressions() {
        linkages.forEach((linkageExps, name) => {
            Object.keys(linkageExps).forEach(expType => {
                const handler = expTypeToHandler[expType]
                const exp = linkageExps[expType]
                if (!exp) return

                watchEffect(() => {
                    const valid = run(formValue, exp)
                    const comp = components.get(name)
                    console.log('watch-effect', exp, name, valid, formValue)
                    if (comp) {
                        (comp as any)?.ctx[handler]?.(valid)
                    }
                })
            })
        })
    }

    function setFormValue(name: string, value: any) {
        console.log('set-form-value', name, value)
        formValue[name] = value
    }

    function registerFormItem(name: string, options: RegisterFormItemOptions) {
        if (options) {
            const { component, expressions } = options
            console.log('register-form-item', name, options)
            components.set(name, component)
            linkages.set(name, expressions)
        }
    }

    async function submitForm() {
        return new Promise((resolve, reject) => {
            const elForm = (formRef as any)?.setupState?.elForm
            if (elForm) {
                elForm.validate(async valid => {
                    if (valid) {
                        loading.value = true
                        await new Promise(resolve => setTimeout(resolve, 1500))
                        await fetch(url, {
                            headers: {
                                'content-type': 'application/json'
                            },
                            method: 'POST',
                            body: JSON.stringify(formValue)
                        })
                        loading.value = false
                        resolve('success')
                    } else {
                        reject()
                    }
                })
            } else {
                reject()
            }
        })
    }

    function resetForm() {
        const elForm = (formRef as any)?.setupState?.elForm
        Object.keys(formValue).forEach(key => {
            delete formValue[key]
        })
        nextTick(elForm?.clearValidate)
    }

    // form渲染完毕，监听联动
    onMounted(() => {
        watchExpressions()
    })

    return {
        formValue,
        registerFormItem,
        setFormValue,
        resetForm,
        submitForm,
        loading
    }
}
