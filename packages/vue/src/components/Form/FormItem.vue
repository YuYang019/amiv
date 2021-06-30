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
import template from 'lodash/template'
import { injectionKey } from './useForm'

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

        const form = inject(injectionKey)

        if (typeof props.source === 'string') {
            let firstInit = true
            watchEffect(() => {
                // 收集依赖
                if (firstInit) {
                    const deps: string[] = []
                    const pattern = /\${([\s\S]+?)}/g
                    let ret = pattern.exec(props.source)
                    while (ret) {
                        deps.push(ret[1])
                        ret = pattern.exec(props.source)
                    }
                    if (deps.length) {
                        deps.forEach(key => form?.formValue[key])
                    }
                    firstInit = false
                    return
                }
                // TODO template 自写
                const compiled = template(props.source)
                const api = compiled(form?.formValue)
                console.log(api)
            })
        }

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
