<template>
    <form-item v-if="visible">
        <template #default>
            <el-input
                v-model="value"
                v-bind="attrs"
                :type="type"
                :disabled="disabled"
            />
        </template>
    </form-item>
</template>

<script lang="ts">
import {ElInput} from 'element-plus'
import {defineComponent, h, ref, inject, watch, getCurrentInstance} from 'vue'
import FormItem from './FormItem.vue'
import pick from 'packages/vue/src/utils/pick'
import {provideKey} from './useForm'

export default defineComponent({
    name: 'Input',

    props: {
        name: {
            type: String,
            required: true
        },
        visibleOn: {
            type: String,
            default: ''
        },
        disabledOn: {
            type: String,
            default: ''
        }
    },

    components: {
        FormItem,
        ElInput
    },

    setup(props) {
        const value = ref()
        const visible = ref(true)
        const disabled = ref(false)
        const form = inject(provideKey)

        form?.registerFormItem(props.name, getCurrentInstance())

        form?.registerLinkage(props.name, {
            visibleOn: props.visibleOn,
            disabledOn: props.disabledOn
        })

        console.log('input current instance', getCurrentInstance())

        watch(value, (val) => {
            form?.setFormValue(props.name, val)
        })

        function changeDisabled(bool: boolean) {
            console.log('change diabled', bool)
            disabled.value = bool
        }

        function changeVisible(bool: boolean) {
            console.log('change visible', bool)
            visible.value = bool
        }

        return {
            visible,
            disabled,
            value,
            form,
            changeDisabled,
            changeVisible
        }
    },

    // watch: {
    //     value: {
    //         handler(val) {
    //             const {name} = this.$attrs
    //             if (name) {
    //                 this.form.setFormValue(name, val)
    //             }
    //         },
    //         immediate: true
    //     }
    // },

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


