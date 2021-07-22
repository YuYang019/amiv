<template>
    <div v-if="debug">
        {{ value }}
    </div>
    <el-form
        v-bind="$attrs"
        v-loading="loading"
        ref="elForm"
        :rules="innerRules"
        :model="value"
    >
        <slot />
        <div class="form-footer">
            <child
                v-for="(schema, index) in actions"
                :key="index"
                :schema="schema"
            />
        </div>
    </el-form>
</template>

<script lang="ts">
import { defineComponent, ref, provide } from 'vue'
import { useForm, injectionKey } from './useForm'
import Child from 'packages/vue/src/Child'

import type { PropType } from 'vue'

interface Api {
    method: string;
    url: string;
    data: Record<string, string>
}

type Validator = string | ((...args: any[]) => void)

export default defineComponent({
    name: 'Form',

    inheritAttrs: false,

    components: {
        Child
    },

    props: {
        debug: {
            type: Boolean,
            default: false
        },
        rules: {
            type: Object,
            default: () => ({})
        },
        api: {
            type: [String, Object],
            default: ''
        },
        actions: {
            type: Array,
            default: () => [{
                type: 'submit',
                level: 'primary',
                label: '提交'
            }],
        },
    },

    setup(props) {
        const form = useForm(props.api)
        const elForm = ref()

        provide(injectionKey, form)

        const enhanceValidator = (validator: Validator) => {
            if (typeof validator === 'function') {
                const fn = (rule, val, callback) => {
                    validator(rule, val, callback, form.formValue, elForm)
                }
                return fn
            }
            if (typeof validator === 'string') {
                const code = `const temp = ${validator}; temp(rule, val, callback, formValue, elForm)`
                const validatorFn = new Function('rule', 'val', 'callback', 'formValue', 'elForm', code)
                const fn = (rule, val, callback) => {
                    try {
                        validatorFn(rule, val, callback, form.formValue, elForm)
                    } catch (err) {
                        console.error(err)
                    }
                }
                return fn
            }
        }

        const makeRules = (obj) => {
            if (!obj) {
                return
            }
            const newData = {}
            Object.keys(obj).forEach(key => {
                const value = obj[key]
                if (Array.isArray(value)) {
                    newData[key] = []
                    value.forEach((item, index) => {
                        newData[key][index] = makeRules(item)
                    })
                }
                else if (Object.prototype.toString.call(value) === '[object Object]') {
                    newData[key] = makeRules(value)
                }
                else {
                    if (key === 'validator') {
                        newData[key] = enhanceValidator(value)
                    } else {
                        newData[key] = value
                    }
                }
            })
            return newData
        }

        return {
            elForm,
            innerRules: makeRules(props.rules),
            value: form.formValue,
            loading: form.loading
        }
    },

    created() {
        console.log('form', this.$attrs)
    }
})
</script>

<style>
.form-footer {
    text-align: right;
}
</style>


