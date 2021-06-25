<template>
    <div class="page">
        <div>header</div>
        <slot />
        <div>footer</div>
    </div>
</template>

<script lang="ts">
import {defineComponent, h} from 'vue'

export default defineComponent({
    name: 'Page',
})
</script>

<style>
.page {
    border: 1px solid #efefef;
}
</style>


