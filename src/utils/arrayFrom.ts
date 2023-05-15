

const arrayFrom = (length: number) => {
    return Array.from({ length }, (_, i) => (
        { value: i + 1, label: i + 1 }
    ))
}
export default arrayFrom
