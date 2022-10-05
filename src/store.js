let globalPin
let globalPassword

export const pin = {
    set: function(newPin) {
        globalPin = newPin
    },
    get: function() {
        return globalPin
    }
}

export const password = {
    set: function(newPassword) {
        globalPassword = newPassword
    },
    get: function() {
        return globalPassword
    }
}