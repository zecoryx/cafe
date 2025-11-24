import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { HomeIcon, DocumentIcon, TableIcon, ClockIcon, GlobeIcon, ArrowDownIcon } from './Icons';

function Layout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  const navItems = [
    { path: '/cashier/menu', label: 'Menyu', icon: HomeIcon },
    { path: '/cashier/orders', label: 'Buyurtmalar', icon: DocumentIcon },
    { path: '/cashier/tables', label: 'Stollar', icon: TableIcon },
    { path: '/cashier/history', label: 'Tarix', icon: ClockIcon }
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <nav className="flex gap-2">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`px-4 py-2 font-medium flex items-center rounded-xl ${
                  isActive(item.path)
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-blue-600 border border-blue-200'
                }`}
              >
                <span className="mr-2"><item.icon /></span>
                {item.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-lg border border-gray-200">
              <GlobeIcon />
              <span>UZB</span>
              <ArrowDownIcon />
            </div>
            <div className="flex items-center gap-2 relative">
              <img
                src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User'}
                alt={user?.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm"
            >
              Chiqish
            </button>
          </div>
        </div>
      </header>

      <main className="p-6">
        {children}
      </main>
    </div>
  );
}

export default Layout;

