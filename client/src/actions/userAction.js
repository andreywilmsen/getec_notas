// Action de login
export const LoginAction = (token, name) => {
    return {
        type: 'LOGIN',
        payload: {token, name}
    };
};
// Action de logout
export const LogoutAction = () => {
    return {
        type: 'LOGOUT',
    };
};