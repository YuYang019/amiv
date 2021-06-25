<template>
    <div class="playground">
        <editor />
        <renderer-output />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Editor from './components/Editor.vue'
import RendererOutput from './components/Output.vue'

export default defineComponent({
    name: 'App',
    components: {
        Editor,
        RendererOutput
    },
    data() {
        return {}
    }
})
</script>

<style scoped>
.playground {
    display: flex;
}
</style>
