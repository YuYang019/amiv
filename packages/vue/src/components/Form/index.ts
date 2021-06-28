import {registerComponent} from '@amiv/core'
import withExtraProps from '../../utils/withExtraProps'
import Form from './Form.vue'
import Radio from './Radio.vue'
import Input from './Input.vue'

registerComponent({
    type: 'form',
    component: Form
})

registerComponent({
    type: 'input-text',
    component: Input
})

registerComponent({
    type: 'input-password',
    component: withExtraProps(Input, { inputType: 'password' })
})

registerComponent({
    type: 'input-url',
    component: withExtraProps(Input, { inputType: 'url' })
})

registerComponent({
    type: 'input-email',
    component: withExtraProps(Input, { inputType: 'email' })
})

registerComponent({
    type: 'radios',
    component: Radio
})
