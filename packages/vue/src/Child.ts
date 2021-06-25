import {defineComponent, h, toRefs, ref} from 'vue';
import {getComponent} from '@amiv/core';
import {provideKey} from './Renderer';

const Child = defineComponent({
    name: 'Child',

    props: ['schema'],

    setup(props) {
        const {schema} = toRefs(props);
        return {
            schema
        }
    },

    render() {
        const {schema} = this;

        if (!schema) return '';

        const {component, body} = schema;
        const otherProps = {...schema};
        delete otherProps.component;
        delete otherProps.body;

        const Component = getComponent(component);
        if (!Component) {
            return '';
        }

        const getChildren = () => {
            const children: any[] = [];
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
            } else if (!!body) {
                children.push(body)
            }
            return children;
        }

        return h(Component, {
            ...otherProps
        }, {
            default: getChildren
        })
    }
})

export default Child;