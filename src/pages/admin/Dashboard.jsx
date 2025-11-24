import { useOrder } from '../../contexts/OrderContext';
import { getCashiers } from '../../shared/data/api';
import AdminLayout from '../../components/AdminLayout';
import { CashIcon, DocumentIcon, UsersIcon } from '../../components/Icons';

function AdminDashboard() {
  const { historyOrders } = useOrder();
  const cashiers = getCashiers();
  const orders = historyOrders;

  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const totalOrders = orders.length;
  const totalCashiers = cashiers.length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Boshqaruv paneli</h1>
        
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <CashIcon />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-2">Jami daromad</p>
            <p className="text-3xl font-bold text-gray-800">{totalRevenue.toLocaleString()} UZS</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <DocumentIcon />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-2">Jami buyurtmalar</p>
            <p className="text-3xl font-bold text-gray-800">{totalOrders.toLocaleString()}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <UsersIcon />
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-2">Jami kassirlar</p>
            <p className="text-3xl font-bold text-gray-800">{totalCashiers}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">O'rtacha buyurtma</h3>
            <p className="text-2xl font-bold text-gray-800">{Math.round(averageOrderValue).toLocaleString()} UZS</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Faol kassirlar</h3>
            <p className="text-2xl font-bold text-gray-800">{cashiers.filter(c => c.status === 'active').length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Oxirgi buyurtmalar</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Buyurtma ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Stol</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Holat</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Summa</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Sana</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.slice(0, 10).map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-800 font-medium">#{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-800">Stol {order.tableNo || order.tableId}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {order.status === 'paid' ? 'To\'langan' : order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                    {order.total?.toLocaleString() || 0} UZS
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{order.date || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;

