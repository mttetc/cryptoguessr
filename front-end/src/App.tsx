import Home from '@/pages/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Providers from '@/components/providers';

const App = () => {
  return (
    <Providers>
      <BrowserRouter
        basename={
          process.env.NODE_ENV === 'production' ? '/cryptoguessr' : undefined
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Providers>
  );
};

export default App;
