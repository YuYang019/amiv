<template>
    <el-form-item
        v-if="innerVisible"
        :label="label"
        :prop="name"
    >
        <slot :slotProps="slotProps" />
    </el-form-item>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref, inject } from 'vue'
import { injectionKey } from './useForm'
import useSource from './useSource'

export default defineComponent({
    name: 'FormItem',

    inheritAttrs: false,

    props: {
        name: {
            type: String,
            required: true
        },
        label: {
            type: String,
            default: '',
        },
        visible: {
            type: Boolean,
            default: false
        },
        visibleOn: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        disabledOn: {
            type: String,
            default: ''
        },
        source: {
            type: [String, Object],
            default: ''
        },
    },

    setup(props) {
        const value = ref()
        const innerVisible = ref<boolean>(props.visible || true)
        const innerDisabled = ref<boolean>(props.disabled)
        const { options } = useSource()

        const form = inject(injectionKey)

        form?.registerFormItem(props.name, {
            component: getCurrentInstance(),
            expressions: {
                visibleOn: props.visibleOn,
                disabledOn: props.disabledOn
            }
        })

        function changeDisabled(bool: boolean) {
            console.log('change diabled', bool)
            innerDisabled.value = props.disabled || bool
        }

        function changeVisible(bool: boolean) {
            console.log('change visible', bool)
            innerVisible.value = props.visible || bool
        }

        return {
            form,
            value,
            options,
            innerVisible,
            innerDisabled,
            changeDisabled,
            changeVisible
        }
    },

    computed: {
        slotProps() {
            const { form: { formValue }, innerDisabled } = this
            const { name } = this.$props

            const props = {
                ...this.$attrs,
                name,
                value: formValue[this.$props.name],
                linkageDisabled: innerDisabled,
                setFormValue: (value: unknown) => {
                    this.form.setFormValue(name, value)
                },
            }

            if (this.options) {
                props.options = this.options
            }

            return props
        }
    },

    created() {
        console.log('form-item', this.$attrs)
    },
})
</script>
