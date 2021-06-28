import { ref, reactive, onMounted,InjectionKey, ComponentInternalInstance } from 'vue'

export const provideKey: InjectionKey<{
    formValue: any;
    setFormValue: (name: string, value: any) => void;
    registerFormItem: (name: string, component: ComponentInternalInstance | null) => void;
    registerLinkage: (name: string, expressions: Expressions) => void
}> = Symbol('')

type RemoveSuffix<T extends string> = T extends `${infer R}On` ? R : never

type ExpTypes = 'disabledOn' | 'visibleOn'

type ExpTypeHandler<T extends string> = `change${RemoveSuffix<Capitalize<T>>}`

type ExpTypeToHandler = {
    [K in ExpTypes]: ExpTypeHandler<K>
}

type Expressions =  {
    [K in ExpTypes]: string
}

const expTypeToHandler: ExpTypeToHandler = {
    'disabledOn': 'changeDisabled',
    'visibleOn': 'changeVisible'
}

export function useForm() {
    const form = reactive({})
    const formItems = new Map<string, ComponentInternalInstance>()
    const linkages = new Map<string, Expressions>()
    const evalCache = new Map<string, () => void>()

    function run(ctx: any, exp: string) {
        console.log(exp)

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
            console.log(fn, ctx)
            return fn.call(ctx, ctx, {})
        } catch (err) {
            console.warn(exp, err)
            return false
        }
    }

    // TODO 性能优化
    function checkExpressions() {
        linkages.forEach((linkageExps, name) => {
            Object.keys(linkageExps).forEach(expType => {
                const handler = expTypeToHandler[expType]
                const exp = linkageExps[expType]
                if (!exp) return
                const valid = run(form, exp)
                const comp = formItems.get(name)
                console.log('check', exp, name, valid, form)
                if (comp) {
                    (comp as any)?.ctx[handler]?.(valid)
                }
            })
        })
    }

    function setFormValue(name: string, value: any) {
        console.log('set-form-value', name, value)
        form[name] = value
        checkExpressions()
    }

    function registerLinkage(name: string, expressions: Expressions) {
        if (expressions) {
            linkages.set(name, expressions)
        }
    }

    function registerFormItem(name: string, component: ComponentInternalInstance | null) {
        if (component) {
            console.log('set form item', name, component)
            formItems.set(name, component)
        }
    }

    // form渲染完毕，检查联动
    onMounted(() => {
        checkExpressions()
    })

    return {
        formValue: form,
        registerFormItem,
        registerLinkage,
        setFormValue
    }
}

// export default function useForm() {
//     return {
//         setValue,
//         getForm
//     }
// }
