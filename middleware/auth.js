export default async function ({
  route, redirect, $cookies
}) {
  const { path } = route
  if( path.startsWith('/')) {
    if (!$cookies.get('dataClient')) { 
    
      redirect('/login')
    }
  }else if(path.startsWith('/')){
    redirect(`/login`)
  }
}