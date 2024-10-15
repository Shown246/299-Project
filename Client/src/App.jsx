import AuthContextProvider from './AuthContextProvider';
import './App.css'
import Router from './Router'

function App() {
  
  return (
    <div className='dark:bg-river dark:text-white'>
      <AuthContextProvider>
        <Router/>
      </AuthContextProvider>      
    </div>
  )
}

export default App;
