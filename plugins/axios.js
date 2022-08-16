export default ({ $cookies, app: { $axios }, route: { path } }) => {

    const token = (path => {
        if (path.startsWith('/creacionEstudiante')) {
            
            const data = $cookies.get('ROLE_ADMIN')
            const token = data ? data.token_acceso : null
            return token
            
        } else if (path.startsWith('/principalEst')) {

            const data = $cookies.get('ROLE_USER')
            const token = data ? data.token_acceso : null
            return token
        } else if (path.startsWith('/registrarDosis')) {
            const data = $cookies.get('ROLE_HC')
            const token = data ? data.token_acceso : null
            return token
        }
    })(path)
    if (token) {
        $axios.setToken('SGVUCE '+token)
    }

}