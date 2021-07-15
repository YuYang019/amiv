<template>
    <el-checkbox-group
        v-bind="$attrs"
        v-model="innerValue"
        @change="onChange"
        :disabled="linkageDisabled"
    >
        <el-checkbox
            v-for="item in options"
            :label="item.value"
            :key="item.value"
        >
            {{ item.label }}
        </el-checkbox>
    <!-- <el-checkbox label="复选框 B"></el-checkbox>
    <el-checkbox label="复选框 C"></el-checkbox>
    <el-checkbox label="禁用" disabled></el-checkbox>
    <el-checkbox label="选中且禁用" disabled></el-checkbox> -->
    </el-checkbox-group>
    <!-- <el-checkbox
        v-model="value"
        :border="border"
        :true-label="trueValue"
        :false-label="falseValue"
        :disabled="linkageDisabled"
    >
        {{ option }}
    </el-checkbox> -->
</template>

<script lang="ts">
import { defineComponent, ref, watch, PropType } from 'vue'

interface Option {
    value: any;
    label: string;
}

export default defineComponent({
    name: 'Checkboxes',

    props: {
        name: {
            type: String,
            required: true,
        },
        value: {
            type: [Array, String],
            default: () => []
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
        },
        joinValues: {
            type: Boolean,
            default: true
        },
        delimeter: {
            type: String,
            default: ','
        }
    },

    setup(props) {
        const innerValue = ref([])

        const onChange = (newVal: Array<unknown>) => {
            const val = props.joinValues ? newVal.join(props.delimeter) : newVal
            props?.setFormValue?.(val)
        }

        // 监听重置事件
        watch(() => props.value, (newVal: string | any[]) => {
            if (!newVal || newVal?.length === 0) {
                innerValue.value = []
            }
        })

        return {
            innerValue,
            onChange,
        }
    },

    created() {
        console.log('checkboxes', this.$attrs)
    }
})
</script>


