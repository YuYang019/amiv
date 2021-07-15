<template>
    <el-select
        :model-value="value"
        @change="onChange"
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
import { defineComponent, ref, PropType } from 'vue'

interface SelectOption {
    label: string;
    value: any;
}

export default defineComponent({
    name: 'Select',

    props: {
        value: {
            type: [String, Number],
            default: '',
        },
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
        const onChange = (val: unknown) => {
            props?.setFormValue?.(val)
        }

        return {
            onChange,
        }
    }
})
</script>


