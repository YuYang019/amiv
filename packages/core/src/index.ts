const componentsMap = new Map()
const instancesMap = new Map()

interface RegisterComponentOptions<T> {
    type: string | string[];
    component: T
}

interface RegisterInstanceOptions<T> {
    name: string | string[];
    component: T
}

export function createRenderer(options: any) {
    return options
}

export function registerComponent<T>(options: RegisterComponentOptions<T>) {
    const { type, component } = options
    if (Array.isArray(type)) {
        type.forEach(t => componentsMap.set(t, component))
    } else {
        componentsMap.set(type, component)
    }
}

export function registerInstance<T>(options: RegisterInstanceOptions<T>) {
    const { name, component } = options
    if (Array.isArray(name)) {
        name.forEach(t => instancesMap.set(t, component))
    } else {
        instancesMap.set(name, component)
    }
}

export function getComponent(type: string) {
    return componentsMap.get(type)
}

export function getInstance(name: string) {
    return instancesMap.get(name)
}
