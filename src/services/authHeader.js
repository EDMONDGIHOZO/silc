export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('currentUser'))

    if (user && user.token) {
        return {
            Accept: 'application/json',
            Authorization: 'Bearer ' + user.token,
        }
    } else {
        return { message: 'something is wrong' }
    }
}