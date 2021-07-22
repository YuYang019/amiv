import { defineComponent, h, toRefs } from 'vue'
import { getComponent } from '@amiv/core'

const Child = defineComponent({
    name: 'Child',

    props: ['schema'],

    setup(props) {
        return {
            ...toRefs(props)
        }
    },

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

        return vnodes
    }
})

export default Child
