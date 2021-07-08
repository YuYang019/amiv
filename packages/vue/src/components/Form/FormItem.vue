<template>
    <el-form-item
        v-if="innerVisible"
        v-bind="attrs"
    >
        <slot :slotProps="slotProps" />
    </el-form-item>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref, inject, watchEffect } from 'vue'
import pick from 'lodash/pick'
import omit from 'lodash/omit'
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
        const {options} = useSource(props.source)

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
        attrs() {
            const picked = pick(this.$attrs, ['label'])
            return {
                ...picked,
                label: picked.label || ''
            }
        },
        slotProps() {
            return {
                ...omit(this.$attrs, ['label']),
                name: this.$props.name,
                linkageDisabled: this.innerDisabled,
                options: this.options || this.$attrs['options'],
                setFormValue: (value: unknown) => {
                    this.form.setFormValue(this.$props.name, value)
                },
            }
        }
    },

    created() {
        console.log('form-item', this.$attrs)
    },
})
</script>
