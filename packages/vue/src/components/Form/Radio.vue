<template>
    <el-radio-group
        :model-value="value"
        @change="onChange"
        :disabled="linkageDisabled"
    >
        <el-radio
            v-for="item in options"
            :label="item.value"
            :key="item.value"
        >
            {{ item.label }}
        </el-radio>
    </el-radio-group>
</template>

<script lang="ts">
import { ElRadio, ElRadioGroup } from 'element-plus'
import { defineComponent, PropType } from 'vue'

interface Option {
    value: any,
    label: string
}

export default defineComponent({
    name: 'Radio',

    props: {
        value: {
            type: [String, Number, Boolean],
            default: '',
        },
        linkageDisabled: {
            type: Boolean
        },
        setFormValue: {
            type: Function,
            default: () => void 0
        },
        options: {
            type: Array as PropType<Option[]>,
            default: () => []
        }
    },

    components: {
        ElRadio,
        ElRadioGroup
    },

    setup(props) {
        const onChange = (val: unknown) => {
            props?.setFormValue?.(val)
        }

        return {
            onChange,
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


