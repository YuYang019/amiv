import { registerComponent } from '@amiv/core'
import { withExtraProps, withFormItem } from 'packages/vue/src/utils/hoc'
import Form from './Form.vue'
import Radio from './Radio.vue'
import Input from './Input.vue'
import Select from './Select.vue'
import Checkbox from './Checkbox.vue'
import Checkboxes from './Checkboxes.vue'


registerComponent({
    type: 'form',
    component: Form
})

registerComponent({
    type: 'select',
    component: withFormItem(Select)
})

registerComponent({
    type: 'input-text',
    component: withFormItem(Input)
})

registerComponent({
    type: 'input-password',
    component: withFormItem(withExtraProps(Input, { inputType: 'password' }))
})

registerComponent({
    type: 'input-url',
    component: withFormItem(withExtraProps(Input, { inputType: 'url' }))
})

registerComponent({
    type: 'input-email',
    component: withFormItem(withExtraProps(Input, { inputType: 'email' }))
})

registerComponent({
    type: 'radios',
    component: withFormItem(Radio)
})

registerComponent({
    type: 'checkbox',
    component: withFormItem(Checkbox)
})

registerComponent({
    type: 'checkboxes',
    component: withFormItem(Checkboxes)
})
