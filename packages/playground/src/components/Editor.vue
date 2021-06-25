<template>
    <div
        id="editor"
        ref="el"
    />
</template>

<script lang="ts">
import {defineComponent, ref, onMounted} from 'vue'
import useEditor from '../composables/useEditor'

export default defineComponent({
    name: 'Editor',

    setup() {
        const el = ref<HTMLElement>()

        onMounted(() => {
            useEditor(el)
        })

        return {
            el
        }
    }
})
</script>

<style scoped>
#editor {
    width: 40vw;
    height: 100vh;
}
</style>
