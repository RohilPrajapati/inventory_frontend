export const getAccessToken = () => {
    return localStorage.getItem('accessToken');
};

export const setAccessToken = (accessToken) => {
    localStorage.setItem('accessToken', accessToken);
};

export const getRefreshToken = () => {
    return localStorage.getItem('refreshToken');
};

export const setRefreshToken = (accessToken) => {
    localStorage.setItem('refreshToken', accessToken);
};

export const isAuthenticated = () => {
    return !!localStorage.getItem('accessToken');
};

export function getAuthHeader () {
    const accessToken = getAccessToken()

    if (accessToken) {
        return { Authorization: 'Bearer ' + accessToken }
    } else {
        return {}
    }
}

export const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
};