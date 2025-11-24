import { useState, useEffect } from 'react';
import { getCashiers, addCashier, updateCashier, deleteCashier } from '../../shared/data/api';
import AdminLayout from '../../components/AdminLayout';
import { EditIcon, DeleteIcon, SearchIcon } from '../../components/Icons';
import Pagination from '../../components/Pagination';

function Cashiers() {
  const [cashiers, setCashiers] = useState(getCashiers());
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCashier, setEditingCashier] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const filteredCashiers = cashiers.filter(cashier =>
    cashier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cashier.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCashiers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCashiers = filteredCashiers.slice(startIndex, endIndex);

  // Reset page when search changes
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [searchQuery, totalPages]);

  const handleAddCashier = (e) => {
    e.preventDefault();
    const newCashier = addCashier(formData);
    setCashiers([...cashiers, newCashier]);
    setFormData({ name: '', email: '', password: '' });
    setShowAddModal(false);
  };

  const handleEditCashier = (cashier) => {
    setEditingCashier(cashier);
    setFormData({
      name: cashier.name,
      email: cashier.email,
      password: ''
    });
    setShowEditModal(true);
  };

  const handleUpdateCashier = (e) => {
    e.preventDefault();
    if (editingCashier) {
      const updated = updateCashier(editingCashier.id, formData);
      if (updated) {
        setCashiers(cashiers.map(c => c.id === updated.id ? updated : c));
      }
      setFormData({ name: '', email: '', password: '' });
      setEditingCashier(null);
      setShowEditModal(false);
    }
  };

  const handleDeleteCashier = (id) => {
    if (window.confirm('Bu kassirni o\'chirishni xohlaysizmi?')) {
      if (deleteCashier(id)) {
        setCashiers(cashiers.filter(c => c.id !== id));
      }
    }
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Kassirlar boshqaruvi</h1>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium"
          >
            + Kassir qo'shish
          </button>
        </div>

        <div className="mb-4">
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <SearchIcon />
            </div>
            <input
              type="text"
              placeholder="Kassirlarni qidirish..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Ism</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Rol</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Holat</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedCashiers.map((cashier) => (
                <tr key={cashier.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800 font-medium">#{cashier.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={cashier.avatar}
                        alt={cashier.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="font-medium text-gray-800">{cashier.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{cashier.email}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full capitalize">
                      {cashier.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      Faol
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleEditCashier(cashier)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <EditIcon />
                      </button>
                      <button 
                        onClick={() => handleDeleteCashier(cashier.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => {
              setCurrentPage(page);
              window.scrollTo(0, 0);
            }}
          />
        </div>
      )}

      {/* Add Cashier Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Yangi kassir qo'shish</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddCashier} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To'liq ism</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Parol</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium"
                >
                  Kassir qo'shish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Cashier Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Kassirni tahrirlash</h2>
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setEditingCashier(null);
                  setFormData({ name: '', email: '', password: '' });
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdateCashier} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To'liq ism</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Yangi parol (ixtiyoriy)</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Parolni o'zgartirmasangiz bo'sh qoldiring"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingCashier(null);
                    setFormData({ name: '', email: '', password: '' });
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium"
                >
                  Bekor qilish
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

export default Cashiers;

