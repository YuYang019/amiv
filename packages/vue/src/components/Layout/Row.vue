<template>
    <el-row class="layout-row">
        <slot></slot>
    </el-row>
</template>

<script lang="ts">
import {ElRow} from 'element-plus';
import {defineComponent, h} from 'vue';

export default defineComponent({
    name: 'LayoutRow',

    components: {
        ElRow,
    },
});
</script>

<style></style>


