export const TOKEN_KEY = 'sika'
export const ROLE_KEY = 'role'
export function getToken() {
    return localStorage.getItem(TOKEN_KEY)
}

export function setToken(tokenValue: string) {
    localStorage.setItem(TOKEN_KEY, tokenValue)
}

export function removeToken() {
    localStorage.removeItem(TOKEN_KEY)
}

export function setRoleName(roleName:string) {
    localStorage.setItem(ROLE_KEY, roleName)
}

export function getRoleName() {
    return localStorage.getItem(ROLE_KEY)
}

export function removeRoleName() {
    localStorage.removeItem(ROLE_KEY)
}

