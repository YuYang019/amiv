import {defineComponent, h, computed, watch, ref, provide, InjectionKey, Ref} from 'vue';
import {createRenderer} from '@amiv/core';
import Child from './Child';

import './components/Divider';
import './components/Page';
import './components/Layout';

type RendererType = Record<string, any> | null;

export const provideKey: InjectionKey<Ref<RendererType>> = Symbol('renderer');

export const Renderer = defineComponent({
    name: 'Renderer',

    props: ['schema'],

    setup(props) {
        const renderer = ref<RendererType>(null);
        const schema = computed(() => renderer?.value?.schema);

        provide(provideKey, renderer);

        watch(
            () => props.schema,
            val => {
                if (val) {
                    renderer.value = createRenderer({schema: val});
                    console.log('create');
                } else {
                    renderer.value = null;
                }
            },
            {immediate: true}
        )

        return {
            schema,
        }
    },

    render() {
        const {schema} = this;
        console.log('renderer', schema);

        return h(
            'div',
            {class: 'renderer'},
            h(Child, {
                schema,
            })
        )
    }
})
