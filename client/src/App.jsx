import './App.css';
import UseStateManager from './useManager/useContextManager';
import Navbar from './components/Navbar';
import { AuthProvider } from './useManager/authContext';
import AppRoutes from './AppRoutes';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (

    <AuthProvider>
      <UseStateManager>
        <BrowserRouter>
          <Navbar />
          <AppRoutes />
        </BrowserRouter>
      </UseStateManager>
    </AuthProvider>
  );
}

export default App;
