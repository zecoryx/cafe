import { createContext, useContext, useState } from 'react';
import { createOrder, updateOrder, completeOrder as completeOrderAPI, orders as initialOrders, historyOrders as initialHistoryOrders } from '../shared/data/api';

const OrderContext = createContext();

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within OrderProvider');
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [currentOrder, setCurrentOrder] = useState(null);
  const [orders, setOrders] = useState(initialOrders);
  const [historyOrders, setHistoryOrders] = useState(initialHistoryOrders);
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i => 
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const updateCartItem = (itemId, quantity) => {
    if (quantity <= 0) {
      setCart(prev => prev.filter(i => i.id !== itemId));
    } else {
      setCart(prev => prev.map(i => 
        i.id === itemId ? { ...i, quantity } : i
      ));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const createNewOrder = (orderData, itemsToUse = null) => {
    const items = itemsToUse || cart;
    
    if (items.length === 0) {
      return null;
    }
    
    // Check if order already exists for this table
    if (orderData.tableId) {
      const existingOrder = orders.find(o => o.tableId === orderData.tableId && o.status === 'pending');
      if (existingOrder) {
        // Update existing order with new items
        const updatedItems = [...(existingOrder.items || []), ...items];
        const updatedOrder = updateOrder(existingOrder.id, {
          items: updatedItems,
          orderType: orderData.orderType || existingOrder.orderType
        });
        setOrders(prev => prev.map(o => o.id === existingOrder.id ? updatedOrder : o));
        setCurrentOrder(updatedOrder);
        if (!itemsToUse) {
          clearCart();
        }
        return updatedOrder;
      }
    }
    
    const newOrder = createOrder({
      ...orderData,
      items: items
    });
    setOrders(prev => {
      // Remove duplicate orders for the same table
      const filtered = prev.filter(o => !(o.tableId === orderData.tableId && o.status === 'pending' && o.id !== newOrder.id));
      return [...filtered, newOrder];
    });
    setCurrentOrder(newOrder);
    if (!itemsToUse) {
      clearCart();
    }
    return newOrder;
  };

  const selectOrder = (order) => {
    setCurrentOrder(order);
  };

  const updateOrderItems = (orderId, newItems, orderType = null) => {
    setOrders(prev => prev.map(o => 
      o.id === orderId ? { 
        ...o, 
        items: newItems,
        orderType: orderType || o.orderType
      } : o
    ));
    if (currentOrder?.id === orderId) {
      setCurrentOrder(prev => ({ 
        ...prev, 
        items: newItems,
        orderType: orderType || prev.orderType
      }));
    }
  };

  const completeOrder = (orderId, paymentData) => {
    const completed = completeOrderAPI(orderId, paymentData);
    if (completed) {
      setOrders(prev => prev.filter(o => o.id !== orderId));
      setHistoryOrders(prev => [completed, ...prev]);
      setCurrentOrder(null);
      return completed;
    }
    return null;
  };

  return (
    <OrderContext.Provider value={{
      cart,
      addToCart,
      updateCartItem,
      clearCart,
      currentOrder,
      orders,
      historyOrders,
      createNewOrder,
      selectOrder,
      updateOrderItems,
      completeOrder
    }}>
      {children}
    </OrderContext.Provider>
  );
};

