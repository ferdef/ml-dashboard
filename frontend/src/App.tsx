// frontend/src/App.tsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ModelList from './pages/ModelList';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/models" element={<ModelList />} />
      </Routes>
    </Layout>
  );
}

export default App;