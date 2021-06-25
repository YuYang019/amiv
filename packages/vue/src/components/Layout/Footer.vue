<template>
    <el-footer class="layout-footer">
        <slot></slot>
    </el-footer>
</template>

<script lang="ts">
import {ElFooter} from 'element-plus';
import {defineComponent, h} from 'vue';

export default defineComponent({
    name: 'LayoutFooter',

    components: {
        ElFooter,
    },
});
</script>

<style></style>


