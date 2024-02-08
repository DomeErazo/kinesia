export default ({ $cookies, app: { $axios }, route: { path } }) => {

    const token = (path => {
        if (path.startsWith('/Administrador')) {
            
            const data = $cookies.get('ROLE_ADMIN')
            const token = data ? data.token_acceso : null
            return token
            
        } else if (path.startsWith('/AdministradorEmpresarial')) {

            const data = $cookies.get('ROLE_USER')
            const token = data ? data.token_acceso : null
            return token
        } else if (path.startsWith('/Entrevista')) {
            const data = $cookies.get('ROLE_HC')
            const token = data ? data.token_acceso : null
            return token
        }
    })(path)
    if (token) {
        $axios.setToken('Kinesia '+token)
    }

}