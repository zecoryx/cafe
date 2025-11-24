import { useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import OrderSidebar from '../../components/OrderSidebar';
import { useOrder } from '../../contexts/OrderContext';
import { tables as initialTables } from '../../shared/data/api';
import { SearchIcon, UsersIcon } from '../../components/Icons';

function Tables() {
  const [tables, setTables] = useState(initialTables);
  const [selectedTable, setSelectedTable] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { createNewOrder, currentOrder, orders } = useOrder();

  // Update table status based on orders
  useEffect(() => {
    setTables(prev => prev.map(table => {
      const hasOrder = orders.some(o => o.tableId === table.number && o.status === 'pending');
      if (hasOrder && table.status === 'available') {
        return { ...table, status: 'occupied' };
      } else if (!hasOrder && table.status === 'occupied') {
        return { ...table, status: 'available' };
      }
      return table;
    }));
  }, [orders]);

  const filteredTables = tables.filter(table =>
    `Stol ${table.number}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'occupied':
        return 'bg-orange-500';
      case 'reserved':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleTableClick = (table) => {
    setSelectedTable(table);
    // Just select the table, don't create order automatically
    // Order will be created only when items are added to cart from Menu page
  };

  return (
    <Layout>
      <div className="flex gap-6 h-[calc(100vh-180px)]">
        {/* Left Section - Tables */}
        <div className='flex-1'>
          <div className="bg-white rounded-lg shadow-lg p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Stollar</h2>
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
                <select className="px-4 py-2 bg-white border border-gray-300 rounded-lg outline-none">
                  <option>Barcha stollar</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              {filteredTables.map((table) => {
                const bgColor = table.status === 'available' ? 'bg-green-500' :
                  table.status === 'occupied' ? 'bg-orange-500' :
                    table.status === 'reserved' ? 'bg-purple-500' : 'bg-gray-500';
                const statusBg = table.status === 'available' ? 'bg-green-100 text-green-800 border-green-500' :
                  table.status === 'occupied' ? 'bg-orange-100 text-orange-800 border-orange-500' :
                    table.status === 'reserved' ? 'bg-purple-100 text-purple-800 border-purple-500' :
                      'bg-gray-100 text-gray-800 border-gray-500';

                return (
                  <div
                    key={table.id}
                    onClick={() => handleTableClick(table)}
                    className={`p-6 rounded-lg cursor-pointer ${bgColor} text-white`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xl font-bold text-white">Stol {table.number}</h3>
                      <span className={`${statusBg} text-xs px-2 py-1 rounded-full border`}>
                        {table.status === 'available' ? 'Bo\'sh' : table.status === 'occupied' ? 'Band' : table.status === 'reserved' ? 'Bron qilingan' : table.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white">
                      <UsersIcon />
                      <span>{table.capacity} kishi</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-6 text-gray-600">
            Jami stollar: {tables.length}
          </div>
        </div>




        {/* Right Section - Order Sidebar */}
        <div className="w-96">
          {selectedTable ? (
            <OrderSidebar
              order={currentOrder || orders.find(o => o.tableId === selectedTable.number)}
              waiter={currentOrder?.waiter || "Unknown"}
            />
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
    </Layout>
  );
}

export default Tables;

