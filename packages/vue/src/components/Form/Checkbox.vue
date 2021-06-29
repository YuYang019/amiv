<template>
    <el-checkbox
        v-model="value"
        :border="border"
        :true-label="trueValue"
        :false-label="falseValue"
        :disabled="linkageDisabled"
    >
        {{ option }}
    </el-checkbox>
</template>

<script lang="ts">
import {defineComponent, ref, watch} from 'vue'
import pick from 'lodash/pick'

export default defineComponent({
    name: 'Checkbox',

    props: {
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
        const value = ref()

        watch(value, (val) => {
            props?.setFormValue?.(val)
        })

        return {
            value,
        }
    },

    created() {
        console.log('checkbox', this.$attrs)
    }
})
</script>


