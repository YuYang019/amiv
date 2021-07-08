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
import { defineComponent, ref, PropType, watch, inject, watchEffect } from 'vue'
import { injectionKey } from './useForm'

interface SelectOption {
    label: string;
    value: any;
}

export default defineComponent({
    name: 'Select',

    props: {
        name: {
            type: String,
            required: true
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
        const value = ref()
        const form = inject(injectionKey)

        watch(value, newVal => {
            console.log('new inner val', newVal, props)
            form?.setFormValue?.(props.name, newVal)
        })

        watch(() => form?.formValue[props.name], newVal => {
            console.log('newval', newVal)
            value.value = newVal
        })

        return {
            value
        }
    }
})
</script>


