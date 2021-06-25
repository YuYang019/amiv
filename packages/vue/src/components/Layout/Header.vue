<template>
    <el-header class="layout-header">
        <slot></slot>
    </el-header>
</template>

<script lang="ts">
import {ElHeader} from 'element-plus';
import {defineComponent, h} from 'vue';

export default defineComponent({
    name: 'LayoutHeader',

    components: {
        ElHeader,
    },
});
</script>

<style></style>


