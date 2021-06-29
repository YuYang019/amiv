<template>
    <el-form-item
        v-if="innerVisible"
        v-bind="attrs"
    >
        <slot :slotProps="slotProps" />
    </el-form-item>
</template>

<script lang="ts">
import {defineComponent, getCurrentInstance, ref, inject} from 'vue'
import pick from 'lodash/pick'
import omit from 'lodash/omit'
import {injectionKey} from './useForm'

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
        }
    },

    setup(props) {
        const value = ref()
        const innerVisible = ref<boolean>(props.visible || true)
        const innerDisabled = ref<boolean>(props.disabled)

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
                ...omit(this.$attrs, ['label', 'disabled', 'visible', 'disabledOn', 'visibleOn', 'name']),
                linkageDisabled: this.innerDisabled,
                setFormValue: (value: unknown) => {
                    this.form.setFormValue(this.$props.name, value)
                }
            }
        }
    },

    created() {
        console.log('form-item', this.$attrs)
    },
})
</script>
