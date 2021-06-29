<template>
    <el-input
        v-model="value"
        v-bind="attrs"
        :type="type"
        :disabled="linkageDisabled"
    />
</template>

<script lang="ts">
import {ElInput} from 'element-plus'
import {defineComponent, ref, watch} from 'vue'
import pick from 'lodash/pick'

export default defineComponent({
    name: 'Input',

    components: {
        ElInput
    },

    props: {
        linkageDisabled: {
            type: Boolean
        },
        setFormValue: {
            type: Function,
            default: () => void 0
        }
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

    computed: {
        type() {
            const {inputType} = this.$attrs
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


