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
import { defineComponent, ref, getCurrentInstance } from 'vue'
import { useScope } from 'packages/vue/src/composables/useScope'

import type { PropType } from 'vue'
import type { Option } from 'packages/vue/src/types/shared'

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
            type: Array as PropType<Option[]>,
            default: () => []
        }
    },

    setup(props) {
        const { scope } = useScope()

        scope?.registerInstance(getCurrentInstance())

        const onChange = (val: unknown) => {
            props?.setFormValue?.(val)
        }

        return {
            onChange,
        }
    }
})
</script>


