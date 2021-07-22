const componentsMap = new Map()

interface RegisterComponentOptions<T> {
    type: string | string[];
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

export function getComponent(type: string) {
    return componentsMap.get(type)
}
