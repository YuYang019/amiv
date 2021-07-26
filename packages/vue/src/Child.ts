import { defineComponent, h, ref, getCurrentInstance } from 'vue'
import { getComponent } from '@amiv/core'

const temp: any[] = [];

(window as any).temp = temp

const Child = defineComponent({
    name: 'Child',

    props: ['schema'],

    render() {
        const { schema } = this

        if (typeof schema === 'string') {
            return schema
        }

        if (!schema) return ''

        const { type, body, ...otherProps } = schema

        const Component = getComponent(type)
        if (!Component) {
            console.error('未找到组件', type)
            return ''
        }

        const getChildren = () => {
            const children: any[] = []
            if (Array.isArray(body)) {
                body.forEach(item => {
                    children.push(h(Child, {
                        schema: item
                    }))
                })
            } else if (typeof body === 'object') {
                children.push(h(Child, {
                    schema: body
                }))
            } else if (body) {
                children.push(body)
            }
            return children
        }

        console.log('render-child', type, body, otherProps)

        const vnodes = h(Component, {
            type,
            ...otherProps
        }, {
            default: getChildren
        })
        console.log(vnodes)
        temp.push([type, vnodes])

        return vnodes
    },
})

export default Child
