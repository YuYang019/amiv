<template>
    <div class="output">
        <renderer
            v-if="rendered"
            :schema="schema"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, nextTick } from 'vue'
import { Renderer } from '@amiv/vue'
import { registerComponent } from '@amiv/core'
import HelloWorld from './HelloWorld.vue'
import useCode from '../composables/useCode'

registerComponent({
    type: 'custom',
    component: HelloWorld,
})

export default defineComponent({
    name: 'App',
    components: {
        Renderer,
    },
    setup() {
        const rendered = ref(true)
        const { schema } = useCode()

        // 强制重渲染
        watch(schema, () => {
            rendered.value = false
            nextTick(() => {
                rendered.value = true
            })
        })

        return {
            rendered,
            schema,
        }
    },
})
</script>

<style scoped>
.output {
    width: 50vw;
    height: 100vh;
}
</style>
