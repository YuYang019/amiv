<template>
    <el-input
        :model-value="value"
        @update:model-value="onChange"
        v-bind="attrs"
        :type="type"
        :disabled="linkageDisabled"
    />
</template>

<script lang="ts">
import { ElInput } from 'element-plus'
import { defineComponent } from 'vue'
import pick from 'lodash/pick'

export default defineComponent({
    name: 'Input',

    components: {
        ElInput
    },

    props: {
        value: {
            type: [String, Number, Array, Boolean, Object],
            default: ''
        },
        linkageDisabled: {
            type: Boolean
        },
        setFormValue: {
            type: Function,
            default: () => void 0
        }
    },

    setup(props) {
        const onChange = (val: unknown) => {
            props?.setFormValue?.(val)
        }

        return {
            onChange,
        }
    },

    computed: {
        type() {
            const { inputType } = this.$attrs
            if (inputType === 'url') return 'url'
            if (inputType === 'email') return 'email'
            if (inputType === 'password') return 'password'
            return 'text'
        },
        attrs() {
            const props = [
                'placeholder',
                'onChange',
            ]

            return {
                ...pick(this.$attrs, props)
            }
        }
    },

    created() {
        console.log('input', this.$attrs)
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


