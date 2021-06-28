function hasProp(obj: Record<string, any>, prop: string) {
    return Object.prototype.hasOwnProperty.call(obj, prop)
}

export default function pick(obj: Record<string, any>, props: string[]): Record<string, any> {
    const ret = {}
    props.forEach(prop => {
        if (hasProp(obj, prop)) {
            ret[prop] = obj[prop]
        }
    })
    return ret
}
