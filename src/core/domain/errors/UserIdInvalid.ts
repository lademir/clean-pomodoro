export class UserIdInvalidError extends Error {
    constructor() {
        super('User id is invalid')
        this.name = 'UserIdInvalidError'
    }
}