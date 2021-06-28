<template>
    <el-form-item v-bind="attrs">
        <slot />
    </el-form-item>
</template>

<script lang="ts">
import {ElFormItem} from 'element-plus'
import {defineComponent, h} from 'vue'
import pick from 'packages/vue/src/utils/pick'

export default defineComponent({
    name: 'FormItem',

    inheritAttrs: false,

    computed: {
        attrs() {
            const picked = pick(this.$attrs, ['label'])
            return {
                ...picked,
                label: picked.label || ''
            }
        },
    },

    created() {
        console.log('form-item', this.$attrs)
    }
})
</script>

<style>
.divider {
    height: 1px;
    width: 100%;
    background: #ccc;
}
</style>


