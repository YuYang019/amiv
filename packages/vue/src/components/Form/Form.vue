<template>
    <div>{{ value }}</div>
    <el-form v-bind="$attrs">
        <slot />
    </el-form>
</template>

<script lang="ts">
import {ElForm} from 'element-plus'
import {defineComponent, h, provide} from 'vue'
import {useForm, provideKey} from './useForm'

export default defineComponent({
    name: 'Form',

    setup() {
        const form = useForm()

        provide(provideKey, form)

        return {
            value: form.formValue
        }
    },

    created() {
        // createForm()
        console.log('form', this.$attrs)
    }
})
</script>


