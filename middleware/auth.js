export default async function ({
  route, redirect, $cookies
}) {
  const { path } = route
  if( path.startsWith('/user') || path.startsWith('/')) {
    // if (!$cookies.get('dataClient')) { 
      redirect('/login')
    // }
  }
}