import {ref, InjectionKey} from 'vue'

const defaultCode = `{
  "component": "page",
  "title": "简单页面",
  "body": [
    {
      "component": "custom",
      "msg": "Hello Vue 3 + TypeScript + Vite"
    },
    {
      "component": "divider"
    }
  ]
}
`

export const provideKey: InjectionKey<Record<string, any>> = Symbol('schema')
const schema = ref()

export default function() {
    const key = 'amiv/code'

    function setCode(json: string) {
        try {
            let ret
            const code = `ret = ${json}`
            eval(code)
            schema.value = ret
            localStorage.setItem(key, json)
        } catch (err) {
            console.log(err)
        }
    }

    function getCode() {
        const code = localStorage.getItem(key) || defaultCode
        setCode(code)
        return code
    }

    return {
        setCode,
        getCode,
        schema
    }
}
