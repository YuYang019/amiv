<template>
    <el-select
        v-model="value"
        :disabled="linkageDisabled"
    >
        <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
        />
    </el-select>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, watch, watchEffect } from 'vue'

interface SelectOption {
    label: string;
    value: any;
}

export default defineComponent({
    name: 'Select',

    props: {
        linkageDisabled: {
            type: Boolean
        },
        setFormValue: {
            type: Function,
            default: () => void 0
        },
        options: {
            type: Array as PropType<SelectOption[]>,
            default: () => []
        }
    },

    setup(props) {
        const value = ref()

        watch(value, newVal => {
            props.setFormValue?.(newVal)
        })

        return {
            value
        }
    }
})
</script>


