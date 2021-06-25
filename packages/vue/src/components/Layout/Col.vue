<template>
    <el-col class="layout-col">
        <slot></slot>
    </el-col>
</template>

<script lang="ts">
import {ElCol} from 'element-plus';
import {defineComponent, h} from 'vue';

export default defineComponent({
    name: 'LayoutCol',

    components: {
        ElCol,
    },
});
</script>

<style></style>


