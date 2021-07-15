<template>
    <el-checkbox
        :model-value="value"
        @change="onChange"
        :border="border"
        :true-label="trueValue"
        :false-label="falseValue"
        :disabled="linkageDisabled"
    >
        {{ option }}
    </el-checkbox>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Checkbox',

    props: {
        value: {
            type: [String, Number, Boolean],
            default: false,
        },
        linkageDisabled: {
            type: Boolean
        },
        setFormValue: {
            type: Function,
            default: () => void 0
        },
        option: {
            type: String,
            default: ''
        },
        border: {
            type: Boolean,
            default: false
        },
        trueValue: {
            type: [String, Number, Boolean],
            default: true
        },
        falseValue: {
            type: [String, Number, Boolean],
            default: false
        },
    },

    setup(props) {
        const onChange = (val: unknown) => {
            props?.setFormValue?.(val)
        }

        return {
            onChange,
        }
    },

    created() {
        console.log('checkbox', this.$attrs)
    }
})
</script>


