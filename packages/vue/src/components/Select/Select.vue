<template>
    <el-select v-model="value">
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
    </el-select>
</template>

<script lang="ts">
import {defineComponent, ref, PropType} from 'vue'

interface SelectOption {
    label: string;
    value: any;
}

export default defineComponent({
    name: 'Select',
    props: {
        options: {
            type: Array as PropType<SelectOption[]>,
            default: () => []
        }
    },
    setup() {
        const value = ref()
        return {
            value
        }
    }
})
</script>

<style>
.page {
    border: 1px solid #efefef;
}
</style>


