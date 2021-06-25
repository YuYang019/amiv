import {ref, InjectionKey} from 'vue'

const defaultCode = `const schema = {
  component: 'page',
  title: '简单页面',
  body: [
    {
      component: 'custom',
      msg: 'Hello Vue 3 + TypeScript + Vite',
    },
    {
      component: 'divider',
    },
  ]
}

return schema
`

export const provideKey: InjectionKey<Record<string, any>> = Symbol('schema')
const schema = ref()

export default function() {
    const key = 'amiv/code'

    function setCode(code: string) {
        const fn = new Function(code)
        const ret = fn.call(window)
        schema.value = ret
        localStorage.setItem(key, code)
    }

    function getCode() {
        return localStorage.getItem(key) || defaultCode
    }

    setCode(getCode())

    return {
        setCode,
        getCode,
        schema
    }
}
