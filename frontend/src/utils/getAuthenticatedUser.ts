import Cookies from 'js-cookie'

export const getAuthenticatedUser = () => {
    const user = {
        token: Cookies.get('IMA_token'),
        userId: Cookies.get('IMA_userId')
    }
    return user
}