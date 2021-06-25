<template>
    <el-aside class="layout-aside">
        <slot></slot>
    </el-aside>
</template>

<script lang="ts">
import {ElAside} from 'element-plus';
import {defineComponent, h} from 'vue';

export default defineComponent({
    name: 'LayoutAside',

    components: {
        ElAside,
    },
});
</script>

<style></style>


