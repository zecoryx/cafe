import { PrinterIcon } from './Icons';

function ReceiptModal({ order, onClose }) {
  const items = order?.items || [];
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const total = order?.total || subtotal;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-lg shadow-2xl w-full max-w-md p-6 border border-white/50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Stol {order?.tableNo || order?.tableId || 'N/A'}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="mb-4 flex justify-between text-sm">
          <span className="text-gray-600">Buyurtma mahsulotlari</span>
          <span className="font-medium">{items.length} ta</span>
        </div>

        <div className="border-t border-b py-4 mb-4 space-y-3">
          {items.map((item, index) => (
            <div key={index} className="flex justify-between items-start">
              <div className="flex-1">
                <span className="font-medium text-gray-800 block">{item.name}</span>
                <span className="text-sm text-gray-600">
                  {item.quantity} × {item.price.toLocaleString()} UZS
                </span>
              </div>
              <span className="font-semibold text-gray-800 ml-4">
                {(item.price * item.quantity).toLocaleString()} UZS
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Jami:</span>
            <span className="font-medium">{subtotal.toLocaleString()} UZS</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>To'langan:</span>
            <span className="text-green-600">{total.toLocaleString()} UZS</span>
          </div>
          <div className="flex justify-between text-sm items-center">
            <span className="text-gray-600">To'lov usuli:</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
              {order?.paymentMethod === 'cash' ? 'Naqd' : 
               order?.paymentMethod === 'card' ? 'Karta' : 
               order?.paymentMethod === 'qr' ? 'QR To\'lov' : 
               order?.paymentMethod === 'mixed' ? 'Aralash' : 
               order?.paymentMethod || 'N/A'}
            </span>
          </div>
        </div>

        <button
          onClick={() => window.print()}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
        >
          <PrinterIcon />
          Chek chiqarish
        </button>
      </div>
    </div>
  );
}

export default ReceiptModal;

