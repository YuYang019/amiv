const componentsMap = new Map();

interface RegisterComponentOptions<T> {
    name: string;
    component: T
}

export function createRenderer(options: any) {
    return options;
}

export function registerComponent<T>(options: RegisterComponentOptions<T>) {
    const {name, component} = options;
    componentsMap.set(name, component);
}

export function getComponent(type: string) {
    return componentsMap.get(type);
}
