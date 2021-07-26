<template>
    <div class="page">
        <div>header</div>
        <slot />
        <div>footer</div>
    </div>
</template>

<script lang="ts">
import { defineComponent, h, provide } from 'vue'
import { useScope } from 'packages/vue/src/composables/useScope'

export default defineComponent({
    name: 'Page',

    setup() {
        useScope()
    }
})
</script>

<style>
.page {
    border: 1px solid #efefef;
}
</style>


