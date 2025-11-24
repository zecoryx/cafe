import { Route, Routes, Navigate } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { OrderProvider } from "./contexts/OrderContext"
import ProtectedRoute from "./components/ProtectedRoute"
import Login from "./pages/Login"
import Menu from "./pages/cashier/Menu"
import OrderList from "./pages/cashier/OrderList"
import Tables from "./pages/cashier/Tables"
import History from "./pages/cashier/History"
import AdminDashboard from "./pages/admin/Dashboard"
import Cashiers from "./pages/admin/Cashiers"
import Inventory from "./pages/admin/Inventory"

function App() {
  return (
    <AuthProvider>
      <OrderProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Cashier Routes */}
          <Route
            path="/cashier/menu"
            element={
              <ProtectedRoute allowedRoles={['cashier', 'admin']}>
                <Menu />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cashier/orders"
            element={
              <ProtectedRoute allowedRoles={['cashier', 'admin']}>
                <OrderList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cashier/tables"
            element={
              <ProtectedRoute allowedRoles={['cashier', 'admin']}>
                <Tables />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cashier/history"
            element={
              <ProtectedRoute allowedRoles={['cashier', 'admin']}>
                <History />
              </ProtectedRoute>
            }
          />
          
          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/cashiers"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Cashiers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/inventory"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Inventory />
              </ProtectedRoute>
            }
          />
        </Routes>
      </OrderProvider>
    </AuthProvider>
  )
}

export default App