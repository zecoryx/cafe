import { useState } from 'react';
import { useOrder } from '../contexts/OrderContext';
import PaymentModal from './PaymentModal';
import { CardIcon, CashIcon, QRIcon, MixedIcon, PrinterIcon, TrashIcon, PersonIcon } from './Icons';

function OrderSidebar({ order, waiter = "Unknown", selectedTableId, onTableSelect }) {
  const { currentOrder, completeOrder, createNewOrder, updateOrderItems, cart, updateCartItem, orders } = useOrder();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const displayOrder = order || currentOrder;
  const items = displayOrder?.items || [];
  const isCart = displayOrder && !displayOrder.id;
  const tableId = displayOrder?.tableId || selectedTableId;
  const [orderType, setOrderType] = useState(displayOrder?.orderType || 'dine-in');

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.15;
  const total = subtotal + tax;
  const paid = displayOrder?.paid || 0;
  const remaining = total - paid;

  const handlePayment = (method) => {
    setPaymentMethod(method);
    setShowPaymentModal(true);
  };

  const handleRemoveItem = (itemId) => {
    if (isCart) {
      updateCartItem(itemId, 0);
    } else if (displayOrder?.id) {
      const newItems = items.filter(i => i.id !== itemId);
      updateOrderItems(displayOrder.id, newItems);
    }
  };

  const handleUpdateQuantity = (itemId, change) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    const newQuantity = item.quantity + change;
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
    } else {
      if (isCart) {
        updateCartItem(itemId, newQuantity);
      } else if (displayOrder?.id) {
        const newItems = items.map(i =>
          i.id === itemId ? { ...i, quantity: newQuantity } : i
        );
        updateOrderItems(displayOrder.id, newItems);
      }
    }
  };

  const handleConfirmPayment = (paymentData) => {
    if (isCart && items.length > 0) {
      if (!tableId) {
        alert('Avval stolni tanlang');
        setShowPaymentModal(false);
        return;
      }
      const newOrder = createNewOrder({
        tableId: tableId,
        waiter: waiter,
        status: "pending",
        orderType: orderType || "dine-in"
      }, items);
      if (newOrder && newOrder.id) {
        completeOrder(newOrder.id, paymentData);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      }
    } else if (displayOrder?.id) {
      completeOrder(displayOrder.id, paymentData);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
    setShowPaymentModal(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-full flex flex-col relative">
      {showSuccess && (
        <div className="absolute top-4 left-4 right-4 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg z-10 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span>✓</span>
            <span>To'lov muvaffaqiyatli amalga oshirildi.</span>
          </span>
          <button onClick={() => setShowSuccess(false)} className="text-white">
            ×
          </button>
        </div>
      )}

      {/* Header Section */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold text-gray-800">
            {tableId ? `Stol ${tableId}` : "Avval stolni tanlang"}
          </h2>
          {displayOrder && displayOrder.status && (
            <span className={`text-xs px-3 py-1 rounded-full ${
              displayOrder.status === 'paid' 
                ? 'bg-green-100 text-green-800' 
                : displayOrder.status === 'pending'
                ? 'bg-orange-100 text-orange-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {displayOrder.status === 'paid' ? 'To\'langan' : 
               displayOrder.status === 'pending' ? 'Jarayonda' : 
               'Bekor qilingan'}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span>Ofitsiant:</span>
          <div className="flex items-center gap-1">
            <PersonIcon />
            <span className="font-medium">{waiter || "Noma'lum"}</span>
          </div>
        </div>
        {isCart && !tableId && onTableSelect && (
          <button
            onClick={onTableSelect}
            className="mt-2 w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium text-sm"
          >
            Stolni tanlang
          </button>
        )}
      </div>

      {displayOrder && items.length > 0 && (
        <div className="mb-4 flex gap-2">
          <button
            onClick={() => {
              const newOrderType = 'dine-in';
              setOrderType(newOrderType);
              if (displayOrder.id) {
                const order = orders.find(o => o.id === displayOrder.id);
                if (order) {
                  updateOrderItems(displayOrder.id, order.items, newOrderType);
                }
              }
            }}
            className={`flex-1 py-2 px-4 rounded font-medium ${
              (displayOrder.orderType || orderType) === 'dine-in'
                ? 'bg-gray-200 text-gray-800'
                : 'bg-white text-gray-600'
            }`}
          >
            Restoranda
          </button>
          <button
            onClick={() => {
              const newOrderType = 'take-away';
              setOrderType(newOrderType);
              if (displayOrder.id) {
                const order = orders.find(o => o.id === displayOrder.id);
                if (order) {
                  updateOrderItems(displayOrder.id, order.items, newOrderType);
                }
              }
            }}
            className={`flex-1 py-2 px-4 rounded font-medium ${
              (displayOrder.orderType || orderType) === 'take-away'
                ? 'bg-gray-200 text-gray-800'
                : 'bg-white text-gray-600'
            }`}
          >
            Olib ketish
          </button>
        </div>
      )}

      {/* Order Items Section */}
      {items.length === 0 ? (
        <div className="flex-1 flex items-center justify-center bg-white rounded-lg min-h-[200px] mb-4">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <p className="text-gray-500">Mahsulotlar qo'shilmagan</p>
          </div>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto mb-4 min-h-[200px] max-h-[400px]">
          {items.map((item) => (
            <div key={item.id} className="flex items-start gap-3 mb-4 pb-4 border-b border-gray-200">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-blue-50 flex items-center justify-center flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-800 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-1">
                  {item.price.toLocaleString()} UZS × {item.quantity}
                </p>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-sm font-semibold text-gray-800">
                    {(item.price * item.quantity).toLocaleString()} UZS
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, -1)}
                      className="w-7 h-7 bg-gray-200 rounded font-bold text-sm flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="w-6 text-center font-medium text-sm">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, 1)}
                      className="w-7 h-7 bg-blue-600 text-white rounded font-bold text-sm flex items-center justify-center"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="ml-1 p-1.5 text-red-600 rounded"
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Bill Summary Section */}
      <div className="pt-4 space-y-2 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Mahsulotlar</span>
          <span className="font-medium">{items.length} ta</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Jami</span>
          <span className="font-medium">{subtotal.toLocaleString()} UZS</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Soliq (15%)</span>
          <span className="font-medium">{tax.toLocaleString()} UZS</span>
        </div>
        <div className="flex justify-between text-lg font-bold">
          <span>Umumiy</span>
          <span className="text-gray-800">{total.toLocaleString()} UZS</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">To'langan</span>
          <span className="text-green-600">{paid.toLocaleString()} UZS</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Qoldiq:</span>
          <span className={`font-medium ${remaining > 0 ? 'text-red-600' : 'text-green-600'}`}>
            {remaining.toLocaleString()} UZS
          </span>
        </div>
      </div>
      
      {/* Dashed Separator */}
      <div className="my-4 border-t border-dashed border-gray-300"></div>

      <div className="mt-6">
        <p className="text-sm text-gray-600 mb-3 font-bold">To'lov Usullari</p>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => handlePayment('card')}
            className="bg-blue-100 text-blue-700 py-2 px-4 rounded font-medium flex items-center justify-center gap-2"
          >
            <CardIcon />
            Karta
          </button>
          <button
            onClick={() => handlePayment('cash')}
            className="bg-green-100 text-green-700 py-2 px-4 rounded font-medium flex items-center justify-center gap-2"
          >
            <CashIcon />
            Naqd
          </button>
          <button
            onClick={() => handlePayment('qr')}
            className="bg-purple-100 text-purple-700 py-2 px-4 rounded font-medium flex items-center justify-center gap-2"
          >
            <QRIcon />
            QR To'lov
          </button>
          <button
            onClick={() => handlePayment('mixed')}
            className="bg-gray-100 text-gray-700 py-2 px-4 rounded font-medium flex items-center justify-center gap-2"
          >
            <MixedIcon />
            Aralash
          </button>
        </div>
      </div>

      <button className="mt-4 w-full bg-white border border-gray-300 text-gray-800 py-2 px-4 rounded font-medium flex items-center justify-center gap-2">
        <PrinterIcon />
        Chek chiqarish
      </button>

      {showPaymentModal && (
        <PaymentModal
          order={displayOrder}
          total={total}
          paymentMethod={paymentMethod}
          onClose={() => setShowPaymentModal(false)}
          onConfirm={handleConfirmPayment}
        />
      )}
    </div>
  );
}

export default OrderSidebar;

