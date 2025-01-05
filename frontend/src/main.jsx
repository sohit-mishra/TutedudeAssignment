import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext'; 

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider>
      <Router>
        <AuthContextProvider>
          <App/>
        </AuthContextProvider>
      </Router>
    </ChakraProvider>
  </StrictMode>
);
