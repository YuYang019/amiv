<template>
    <el-main class="layout-main">
        <slot></slot>
    </el-main>
</template>

<script lang="ts">
import {ElMain} from 'element-plus';
import {defineComponent, h} from 'vue';

export default defineComponent({
    name: 'LayoutMain',

    components: {
        ElMain,
    },
});
</script>

<style></style>


