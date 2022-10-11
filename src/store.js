let globalPassword

export const MasterPassword = {
    set: function(newPassword) {
        globalPassword = newPassword
    },
    get: function() {
        return globalPassword
    }
}