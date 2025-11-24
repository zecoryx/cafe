import { useState } from 'react';
import { CardIcon, CashIcon, QRIcon, MixedIcon } from './Icons';

function PaymentModal({ order, total, paymentMethod, onClose, onConfirm }) {
  const [cashReceived, setCashReceived] = useState(total);
  const [printReceipt, setPrintReceipt] = useState(true);

  const handleConfirm = () => {
    onConfirm({
      method: paymentMethod,
      amount: cashReceived,
      printReceipt
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">To'lovni Tasdiqlash</h2>
          <button
            onClick={onClose}
            className="text-gray-500 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-3">To'lov Usullari</p>
          <div className="grid grid-cols-4 gap-2">
            <button
              className={`py-2 px-3 rounded font-medium text-sm flex items-center justify-center gap-1 border ${
                paymentMethod === 'cash'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              <CashIcon />
              Naqd
            </button>
            <button
              className={`py-2 px-3 rounded font-medium text-sm flex items-center justify-center gap-1 border ${
                paymentMethod === 'card'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              <CardIcon />
              Karta
            </button>
            <button
              className={`py-2 px-3 rounded font-medium text-sm flex items-center justify-center gap-1 border ${
                paymentMethod === 'qr'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              <QRIcon />
              QR To'lov
            </button>
            <button
              className={`py-2 px-3 rounded font-medium text-sm flex items-center justify-center gap-1 border ${
                paymentMethod === 'mixed'
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300'
              }`}
            >
              <MixedIcon />
              Aralash
            </button>
          </div>
        </div>

        <div className="mb-4 flex justify-between text-sm">
          <span className="text-gray-600">Stol {order?.tableId || order?.tableNo || 'N/A'}</span>
          <span className="font-medium">{order?.items?.length || 0} ta mahsulot</span>
        </div>

        <div className="mb-4 flex justify-between text-lg font-bold">
          <span>Umumiy Summa:</span>
          <span className="text-gray-800">{total.toLocaleString()} UZS</span>
        </div>

        {paymentMethod === 'cash' && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Qabul qilingan naqd pul
            </label>
            <input
              type="number"
              value={cashReceived}
              onChange={(e) => setCashReceived(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none"
            />
          </div>
        )}

        <div className="mb-6 flex justify-between items-center">
          <label className="text-sm font-medium text-gray-700">Chek chiqarish</label>
          <button
            onClick={() => setPrintReceipt(!printReceipt)}
            className={`relative w-12 h-6 rounded-full ${
              printReceipt ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full ${
                printReceipt ? 'translate-x-6' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-white border border-gray-300 text-gray-800 py-3 px-4 rounded-lg font-medium"
          >
            Bekor qilish
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium"
          >
            To'lovni Tasdiqlash
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentModal;

