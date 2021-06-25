import {defineComponent, h, computed, watch, ref, provide, InjectionKey, Ref} from 'vue'
import {createRenderer} from '@amiv/core'
import Child from './Child'

import './components/Divider'
import './components/Page'
import './components/Select'
import './components/ElementUI'

type RendererType = Record<string, any> | null;

export const provideKey: InjectionKey<Ref<RendererType>> = Symbol('renderer')

export const Renderer = defineComponent({
    name: 'Renderer',

    props: ['schema'],

    setup(props) {
        const renderer = ref<RendererType>(null)
        const computedSchema = computed(() => renderer?.value?.schema)

        provide(provideKey, renderer)

        watch(
            () => props.schema,
            val => {
                if (val) {
                    renderer.value = createRenderer({schema: val})
                } else {
                    renderer.value = null
                }
            },
            {immediate: true}
        )

        return {
            computedSchema,
        }
    },

    render() {
        const {computedSchema} = this

        if (!computedSchema) {
            return
        }

        return h(
            'div',
            { class: 'renderer' },
            h(Child, {
                schema: computedSchema,
            })
        )
    }
})
