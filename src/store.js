let globalPin

export const setGlobalPin = function(newPin) {
    globalPin = newPin
}
export const getGlobalPin = () => {
    if (globalPin === undefined) return 0
    else return globalPin
}