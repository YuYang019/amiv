import { ref, reactive, onMounted,InjectionKey, watchEffect, ComponentInternalInstance } from 'vue'

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
}> = Symbol('')

export function useForm() {
    const form = reactive({})
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
                    const valid = run(form, exp)
                    const comp = components.get(name)
                    console.log('watch-effect', exp, name, valid, form)
                    if (comp) {
                        (comp as any)?.ctx[handler]?.(valid)
                    }
                })
            })
        })
    }

    function setFormValue(name: string, value: any) {
        console.log('set-form-value', name, value)
        form[name] = value
    }

    function registerFormItem(name: string, options: RegisterFormItemOptions) {
        if (options) {
            const { component, expressions } = options
            console.log('register-form-item', name, options)
            components.set(name, component)
            linkages.set(name, expressions)
        }
    }

    // form渲染完毕，检查联动
    onMounted(() => {
        watchExpressions()
    })

    return {
        formValue: form,
        registerFormItem,
        setFormValue
    }
}
