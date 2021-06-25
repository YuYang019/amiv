<template>
    <div class="output">
        <renderer :schema="schema" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Renderer } from '@amiv/vue'
import { registerComponent } from '@amiv/core'
import HelloWorld from './HelloWorld.vue'
import useCode from '../composables/useCode'

registerComponent({
    name: 'custom',
    component: HelloWorld,
})

export default defineComponent({
    name: 'App',
    components: {
        Renderer,
    },
    setup() {
        const { schema } = useCode()

        return {
            schema,
        }
    },
})
</script>

<style scoped>
.output {
    width: 60vw;
    height: 100vh;
}
</style>
