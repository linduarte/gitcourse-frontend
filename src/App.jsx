import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

import Home from "./pages/Home";
import Topics from "./pages/Topics";
import Topic from "./pages/Topic"; // <--- O componente importado se chama Topic
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* 1. Rota de Login (importante para o sistema) */}
          <Route path="/login" element={<Login />} />

          {/* 2. Rota de Teste ABERTA (Mudamos TopicDetail para Topic) */}
          <Route path="/topics/:slug" element={<Topic />} />

          {/* 3. Rota Home */}
          <Route path="/" element={<Home />} />

          {/* 4. Rotas protegidas */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/topics-list" // Mudei levemente o nome aqui para não dar conflito
            element={
              <ProtectedRoute>
                <Topics />
              </ProtectedRoute>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;