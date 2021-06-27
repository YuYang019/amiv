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
import Child from '../../Child'

export default defineComponent({
    name: 'ButtonToolbar',

    render() {
        const { $attrs: { buttons } } = this
        console.log(buttons)

        function renderButtons() {
            if (buttons.length) {
                return buttons.map(button => h(Child, {
                    schema: button
                }))
            }
        }

        return renderButtons()
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


