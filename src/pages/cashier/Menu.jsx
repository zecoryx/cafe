import { useState } from 'react';
import Layout from '../../components/Layout';
import OrderSidebar from '../../components/OrderSidebar';
import TableSelectModal from '../../components/TableSelectModal';
import { useOrder } from '../../contexts/OrderContext';
import { categories, getMenuItems } from '../../shared/data/api';
import { SearchIcon } from '../../components/Icons';

function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showTableModal, setShowTableModal] = useState(false);
  const [selectedTableId, setSelectedTableId] = useState(null);
  const { cart, addToCart, updateCartItem, createNewOrder, currentOrder } = useOrder();

  const menuItems = getMenuItems(selectedCategory);
  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (item) => {
    addToCart(item);
  };

  const handleQuantityChange = (itemId, change) => {
    const item = cart.find(i => i.id === itemId);
    if (item) {
      updateCartItem(itemId, item.quantity + change);
    } else {
      const menuItem = menuItems.find(i => i.id === itemId);
      if (menuItem) {
        addToCart(menuItem);
      }
    }
  };

  const getQuantity = (itemId) => {
    const item = cart.find(i => i.id === itemId);
    return item?.quantity || 0;
  };

  const handleTableSelect = (tableId) => {
    setSelectedTableId(tableId);
    // Just select the table, don't create order or payment yet
    // Order will be created only when payment is initiated
  };

  const handleAddToTable = () => {
    if (cart.length === 0) {
      alert('Please add products to the cart first.');
      return;
    }
    setShowTableModal(true);
  };

  return (
    <Layout>
      <div className="flex gap-6 h-[calc(100vh-180px)]">
        {/* Left Section - Menu */}
        <div className="flex-1 bg-white rounded-lg shadow-sm p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Menyu</h2>
            <div className="flex items-center gap-4 w-1/2">
              <div className="relative flex-1">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  placeholder="Nomi yoki kategoriyasini qidirish"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-blue-50 border border-blue-100 rounded-full outline-none text-gray-700"
                />
              </div>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 bg-red-100 text-red-600 rounded-xl font-semibold"
              >
                Hammasini tozalash
              </button>
            </div>
          </div>

          <div className="flex gap-6">
            {/* Categories */}
            <div className="space-y-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full px-4 py-4 rounded-2xl border flex items-center flex-col gap-3 ${selectedCategory === category.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                      : 'border-gray-200 bg-white text-gray-700'
                    }`}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                  <span className="font-semibold">{category.name}</span>
                </button>
              ))}
            </div>

            {/* Menu Items Grid */}
            <div className="flex-1">
              <div className="grid grid-cols-3 gap-4">
                {filteredItems.map((item) => {
                  const quantity = getQuantity(item.id);
                  const stockColor = item.stock > 20 ? 'bg-green-500' : item.stock > 10 ? 'bg-orange-500' : 'bg-red-500';

                  return (
                    <div key={item.id} className="bg-white rounded-lg overflow-hidden">
                      {/* Food Image */}
                      <div className="relative bg-blue-50  flex items-center justify-center w-full py-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className=" object-cover w-50 h-50 rounded-full" 
                        />
                        {item.stock < 50 && (
                          <div className={`absolute top-2 right-2 ${stockColor} text-white text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center`}>
                            {item.stock}
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="p-4">
                        <h3 className="text-lg font-bold text-gray-800 mb-1">{item.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{item.description || 'Soup'}</p>
                        <div className="flex items-center justify-between">
                          <p className="text-lg font-semibold text-gray-800">{item.price.toLocaleString()} UZS</p>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleQuantityChange(item.id, -1)}
                              disabled={quantity === 0}
                              className="w-8 h-8 bg-gray-200 rounded font-bold text-sm disabled:opacity-50"
                            >
                              −
                            </button>
                            <span className="w-8 text-center font-medium">{quantity}</span>
                            <button
                              onClick={() => handleQuantityChange(item.id, 1)}
                              disabled={item.stock === 0}
                              className="w-8 h-8 bg-blue-600 text-white rounded font-bold text-sm disabled:opacity-50"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>


        </div>

        {/* Right Section - Order Sidebar */}
        <div className="w-96">
          <OrderSidebar
            order={currentOrder || (cart.length > 0 ? { items: cart, orderType: 'dine-in', tableId: selectedTableId } : null)}
            selectedTableId={selectedTableId}
            onTableSelect={() => setShowTableModal(true)}
          />
        </div>
      </div>
      <div className="mt-6 text-gray-600">
        Jami mahsulotlar: {menuItems.length}
      </div>

      {showTableModal && (
        <TableSelectModal
          onClose={() => setShowTableModal(false)}
          onSelect={handleTableSelect}
          currentTableId={selectedTableId}
        />
      )}
    </Layout>
  );
}

export default Menu;

