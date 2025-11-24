import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import OrderSidebar from '../../components/OrderSidebar';
import { useOrder } from '../../contexts/OrderContext';
import ReceiptModal from '../../components/ReceiptModal';
import Pagination from '../../components/Pagination';
import { SearchIcon, FilterIcon, PrinterIcon, EyeIcon } from '../../components/Icons';

function History() {
  const { historyOrders } = useOrder();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredOrders = historyOrders.filter(order =>
    order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.waiter?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    `Stol ${order.tableNo || order.tableId}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'refunded':
        return 'bg-gray-100 text-gray-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return '✓';
      case 'refunded':
        return '↻';
      case 'cancelled':
        return '×';
      default:
        return '';
    }
  };

  const totalRevenue = historyOrders.reduce((sum, order) => sum + (order.total || 0), 0);
  const totalOrders = historyOrders.length;
  const avgOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;

  useEffect(() => {
    // Reset to page 1 when search query changes
    setCurrentPage(1);
  }, [searchQuery]);

  return (
    <Layout>
      <div className="flex gap-6 h-[calc(100vh-180px)]">
        {/* Left Section - History */}
        <div className="flex-1 bg-white rounded-lg shadow-lg p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6 flex-shrink-0">
            <h2 className="text-2xl font-bold text-gray-800">Tarix</h2>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  placeholder="Stol yoki ofitsiant bo'yicha qidirish"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg outline-none"
                />
              </div>
              <button className="p-2 border border-gray-300 rounded-lg">
                <FilterIcon />
              </button>
            </div>
          </div>

          {/* Orders Table */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex-1 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Buyurtma ID ↓</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Stol № ↓</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Holat ↓</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Sana ↓</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Ofitsiant ↓</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {paginatedOrders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-4 py-3 text-sm text-gray-800">{order.id}</td>
                      <td className="px-4 py-3 text-sm text-gray-800">Stol {order.tableNo || order.tableId}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <span className="mr-1">✓</span>
                          To'langan
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{order.date}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full overflow-hidden bg-blue-100 flex items-center justify-center">
                            <img
                              src={order.waiter?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=User'}
                              alt={order.waiter?.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-sm text-gray-800">{order.waiter?.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setShowReceipt(true);
                            }}
                            className="p-2 text-gray-600"
                            title="Print"
                          >
                            <PrinterIcon />
                          </button>
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="p-2 text-gray-600"
                            title="View"
                          >
                            <EyeIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex-shrink-0 mt-4">
              <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            </div>
          </div>
        </div>

        {/* Right Section - Order Details */}
        <div className="w-96">
          {selectedOrder ? (
            <OrderSidebar order={selectedOrder} waiter={selectedOrder?.waiter?.name} />
          ) : (
            <div className="bg-white rounded-lg shadow-lg p-6 h-full flex flex-col">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Avval stolni tanlang</h2>
              <p className="text-sm text-gray-600 mb-4">👤 Ofitsiant: Noma'lum</p>
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">⚠️</div>
                  <p className="text-gray-500">Mahsulotlar qo'shilmagan</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {showReceipt && selectedOrder && (
        <ReceiptModal
          order={selectedOrder}
          onClose={() => setShowReceipt(false)}
        />
      )}
    </Layout>
  );
}

export default History;

