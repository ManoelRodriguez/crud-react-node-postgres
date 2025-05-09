import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { EditUser } from './pages/EditUser';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/edit/:id" element={<EditUser />} />
    </Routes>
  );
}

export default App;