import { useState } from "react";
import Layout from "../../components/Layout";
import OrderSidebar from "../../components/OrderSidebar";
import { useOrder } from "../../contexts/OrderContext";
import { SearchIcon, PersonIcon, ClockIcon } from "../../components/Icons";

function OrderList() {
  const { orders, selectOrder, currentOrder } = useOrder();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Remove duplicates by tableId (keep only the latest order for each table)
  const uniqueOrders = orders.reduce((acc, order) => {
    const existing = acc.find(
      (o) => o.tableId === order.tableId && o.status === "pending"
    );
    if (!existing) {
      acc.push(order);
    } else if (new Date(order.createdAt) > new Date(existing.createdAt)) {
      // Replace with newer order
      const index = acc.indexOf(existing);
      acc[index] = order;
    }
    return acc;
  }, []);

  const filteredOrders = uniqueOrders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.waiter?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `Stol ${order.tableId}`.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const formatTime = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <Layout>
      <div className="flex gap-6 h-[calc(100vh-180px)]">
        {/* Left Section - Order List */}
        <div className="flex-1 bg-white rounded-lg shadow-lg p-6 overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Buyurtmalar Ro'yxati
            </h2>
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
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg outline-none"
              >
                <option value="all">Barcha buyurtmalar</option>
                <option value="pending">Jarayonda</option>
                <option value="paid">To'langan</option>
                <option value="canceled">Bekor qilingan</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {filteredOrders.map((order) => {
              const borderColor =
                order.status === "paid"
                  ? "bg-green-50 border border-green-500"
                  : order.status === "pending"
                  ? "bg-orange-50 border border-orange-500"
                  : order.status === "canceled"
                  ? "bg-red-50 border border-red-500"
                  : "border-gray-300";
              const statusBg =
                order.status === "paid"
                  ? "bg-green-100 text-green-800"
                  : order.status === "pending"
                  ? "bg-orange-100 text-orange-800"
                  : order.status === "canceled"
                  ? "bg-red-100 text-red-800"
                  : "bg-gray-100 text-gray-800";

              return (
                <div
                  key={order.id}
                  onClick={() => selectOrder(order)}
                  className={`p-4 rounded-lg cursor-pointer border-2 ${borderColor}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-gray-800">
                      Stol {order.tableId}
                    </h3>
                    <span
                      className={`${statusBg} text-xs px-3 py-1 rounded-full`}
                    >
                      {order.status === "paid"
                        ? "To'langan"
                        : order.status === "pending"
                        ? "Jarayonda"
                        : order.status === "canceled"
                        ? "Bekor qilingan"
                        : order.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                    <PersonIcon />
                    <span>{order.waiter}</span>
                  </div>
                  <div className="flex items-center justify-between mt-5">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <ClockIcon />
                      <span>{formatTime(order.createdAt)}</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">
                      {order.total?.toLocaleString() || 0} UZS
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-xl">Buyurtmalar topilmadi</p>
            </div>
          )}

          <div className="mt-6 text-gray-600">
            Jami buyurtmalar: {filteredOrders.length}
          </div>
        </div>

        {/* Right Section - Order Details */}
        <div className="w-96">
          <OrderSidebar order={currentOrder} waiter={currentOrder?.waiter} />
        </div>
      </div>
    </Layout>
  );
}

export default OrderList;
