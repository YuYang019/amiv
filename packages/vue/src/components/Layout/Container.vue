<template>
    <el-container class="layout-container">
        <slot></slot>
    </el-container>
</template>

<script lang="ts">
import {ElContainer} from 'element-plus';
import {defineComponent, h} from 'vue';

export default defineComponent({
    name: 'LayoutContainer',

    components: {
        ElContainer,
    },
});
</script>

<style></style>


