import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { loginUser } from '../shared/data/api';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const result = loginUser(email, password);
    if (result.success) {
      login(result.user);
      if (result.user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/cashier/menu');
      }
    } else {
      setError(result.message || 'Noto\'g\'ri email yoki parol');
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image with Blur */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920&h=1080&fit=crop)'
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
      </div>
      
      {/* Blur Overlay */}
      <div className="absolute inset-0 backdrop-blur-md"></div>

      {/* Login Modal */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md border border-white/50">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Xush kelibsiz, Kassir</h1>
          <p className="text-gray-600 mb-6">Buyurtmalarni qayta ishlash va to'lovlarni boshqarish uchun tizimga kiring.</p>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Emailingizni kiriting"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Parol</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parolingizni kiriting"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                30 kun eslab qolish
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              Kirish
            </button>
          </form>

          <div className="mt-6 text-sm text-gray-600 text-center">
            <p>Demo Hisoblar:</p>
            <p className="mt-2">Kassir: cashier@cafe.com / cashier123</p>
            <p>Admin: admin@cafe.com / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

