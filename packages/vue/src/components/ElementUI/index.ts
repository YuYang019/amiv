import {registerComponent} from '@amiv/core'
import * as ElementPlus from 'element-plus'

function getKebabCase(str: string) {
    return str.replace(/El/g, 'el-').toLowerCase()
}

Object.keys(ElementPlus).forEach((name: string) => {
    const component = ElementPlus[name]
    if (name.startsWith('El')) {
        registerComponent({
            type: getKebabCase(name),
            component
        })
    }
})
