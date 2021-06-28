<template>
    <form-item>
        <el-radio-group v-model="value">
            <el-radio
                v-for="item in options"
                :label="item.value"
                :key="item.value"
            >
                {{ item.label }}
            </el-radio>
        </el-radio-group>
    </form-item>
</template>

<script lang="ts">
import {ElRadio, ElRadioGroup} from 'element-plus'
import {defineComponent, watch, ref, inject} from 'vue'
import FormItem from './FormItem.vue'
import {provideKey} from './useForm'

export default defineComponent({
    name: 'Radio',

    props: {
        name: {
            type: String,
            required: true
        },
    },

    components: {
        FormItem,
        ElRadio,
        ElRadioGroup
    },

    setup(props) {
        const value = ref('')
        const form = inject(provideKey)

        watch(value, (val) => {
            form?.setFormValue(props.name, val)
        })

        return {
            value,
            form
        }
    },

    computed: {
        options() {
            return this.$attrs.options || []
        }
    },

    created() {
        console.log('radio', this.$attrs)
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


