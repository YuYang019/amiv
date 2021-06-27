<!-- <template>
    <wrapper :wrapper-props="wrapperProps">
        <template #default="slotProps">
            <el-button @click="onAction(slotProps)">{{ label }}</el-button>
        </template>
    </wrapper>
</template> -->

<script lang="ts">
import { ElButton } from 'element-plus'
import { defineComponent, h, ref, reactive, toRefs, onUpdated, computed } from 'vue'
import Wrapper from './Wrapper.vue'

export default defineComponent({
    name: 'Button',

    components: {
        Wrapper
    },

    setup(props, { attrs }) {
        // const { label, ...rest } = attrs
        // const wrapperProps = rest
        console.log('button-rest')

        function onAction(slotProps) {
            console.log('click', slotProps)
            slotProps && slotProps.doAction()
        }

        // onUpdated(() => {
        //     console.log('button', 'updated')
        // })

        return {
            // label: computed(() => attrs.label),
            onAction,
            // wrapperProps: computed(() => attrs)
        }
    },

    render() {
        const { onAction, $attrs } = this

        function renderButton(slotProps) {
            let buttonType = 'default'
            if ($attrs.primary) {
                buttonType = 'primary'
            }

            return h(ElButton, {
                onClick: () => onAction(slotProps),
                type: buttonType
            }, {
                default: () => $attrs.label
            })
        }

        return h(Wrapper, {
            ...$attrs
        }, {
            default: (slotProps) => renderButton(slotProps)
        })
    }

    // setup(props, { attrs }) {
    //     console.log('button', attrs)

        

    //     return {
    //         attrs
    //     }
    // },
})
</script>

<style>
.divider {
    height: 1px;
    width: 100%;
    background: #ccc;
}
</style>


