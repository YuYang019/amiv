<template>
    <div v-if="debug">
        {{ value }}
    </div>
    <el-form v-bind="$attrs">
        <slot />
    </el-form>
</template>

<script lang="ts">
import { defineComponent, ref, provide } from 'vue'
import { useForm, injectionKey } from './useForm'

export default defineComponent({
    name: 'Form',

    inheritAttrs: false,

    props: {
        debug: {
            type: Boolean,
            default: false
        }
    },

    setup() {
        const form = useForm()

        provide(injectionKey, form)

        return {
            value: form.formValue,
        }
    },

    created() {
        console.log('form', this.$attrs)
    }
})
</script>


