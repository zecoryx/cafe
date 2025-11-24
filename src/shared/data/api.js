// Mock API data and functions

// Mock users
export const mockUsers = [
  {
    id: 1,
    email: "cashier@cafe.com",
    password: "cashier123",
    name: "Anvar Aripov",
    role: "cashier",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anvar",
    status: "active"
  },
  {
    id: 2,
    email: "admin@cafe.com",
    password: "admin123",
    name: "Brave Admin",
    role: "admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
    status: "active"
  },
  {
    id: 3,
    email: "dilshod@cafe.com",
    password: "cashier123",
    name: "Dilshod Karimov",
    role: "cashier",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dilshod",
    status: "active"
  },
  {
    id: 4,
    email: "sardor@cafe.com",
    password: "cashier123",
    name: "Sardor Toshmatov",
    role: "cashier",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sardor",
    status: "active"
  },
  {
    id: 5,
    email: "aziza@cafe.com",
    password: "cashier123",
    name: "Aziza Qodirova",
    role: "cashier",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aziza",
    status: "active"
  },
  {
    id: 6,
    email: "farhod@cafe.com",
    password: "cashier123",
    name: "Farhod Yusupov",
    role: "cashier",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Farhod",
    status: "active"
  },
  {
    id: 7,
    email: "nozima@cafe.com",
    password: "cashier123",
    name: "Nozima Alimova",
    role: "cashier",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Nozima",
    status: "active"
  },
  {
    id: 8,
    email: "bekzod@cafe.com",
    password: "cashier123",
    name: "Bekzod Rahimov",
    role: "cashier",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bekzod",
    status: "active"
  },
  {
    id: 9,
    email: "muhammad@cafe.com",
    password: "cashier123",
    name: "Muhammad Ali",
    role: "cashier",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Muhammad",
    status: "active"
  },
  {
    id: 10,
    email: "zilola@cafe.com",
    password: "cashier123",
    name: "Zilola Xasanova",
    role: "cashier",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zilola",
    status: "active"
  },
  {
    id: 11,
    email: "jamshid@cafe.com",
    password: "cashier123",
    name: "Jamshid Tursunov",
    role: "cashier",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jamshid",
    status: "active"
  },
  {
    id: 12,
    email: "dilnoza@cafe.com",
    password: "cashier123",
    name: "Dilnoza Mirzayeva",
    role: "cashier",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dilnoza",
    status: "active"
  }
];

// Mock menu categories
export const categories = [
  { id: "all", name: "Barcha Menyu", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=100&h=100&fit=crop" },
  { id: "paket", name: "Paket Hemat", image: "https://images.unsplash.com/photo-1509722747041-616f39b57569?w=100&h=100&fit=crop" },
  { id: "drinks", name: "Ichimliklar", image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=100&h=100&fit=crop" },
  { id: "desserts", name: "Shirinliklar", image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=100&h=100&fit=crop" },
  { id: "chicken", name: "Tovuq", image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=100&h=100&fit=crop" }
];

// Mock menu items
export const menuItems = [
  {
    id: 1,
    name: "Tandoori Tovuq",
    category: "chicken",
    description: "Mazali tandoori tovuq",
    price: 45000,
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop",
    stock: 50
  },
  {
    id: 2,
    name: "Samosa",
    category: "paket",
    description: "Xamirli samosa",
    price: 15000,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
    stock: 10
  },
  {
    id: 3,
    name: "Palak Paneer",
    category: "paket",
    description: "Palak bilan paneer",
    price: 35000,
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop",
    stock: 50
  },
  {
    id: 4,
    name: "Aloo Gobi",
    category: "paket",
    description: "Kartoshka va karam",
    price: 30000,
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=300&fit=crop",
    stock: 5
  },
  {
    id: 5,
    name: "Butter Tovuq",
    category: "chicken",
    description: "Saryog'li tovuq",
    price: 50000,
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop",
    stock: 30
  },
  {
    id: 6,
    name: "Dosa",
    category: "paket",
    description: "An'anaviy dosa",
    price: 25000,
    image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop",
    stock: 10
  },
  {
    id: 7,
    name: "Pasta Primavera",
    category: "paket",
    description: "Yozgi pasta",
    price: 40000,
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&h=300&fit=crop",
    stock: 25
  },
  {
    id: 8,
    name: "Lamb Kebabs",
    category: "chicken",
    description: "Qo'zi go'shti kebab",
    price: 55000,
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop",
    stock: 20
  },
  {
    id: 9,
    name: "Cappuccino",
    category: "drinks",
    description: "Italyan kofe",
    price: 12000,
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop",
    stock: 100
  },
  {
    id: 10,
    name: "Latte",
    category: "drinks",
    description: "Sutli kofe",
    price: 15000,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d005?w=400&h=300&fit=crop",
    stock: 80
  },
  {
    id: 11,
    name: "Chocolate Cake",
    category: "desserts",
    description: "Shokoladli tort",
    price: 25000,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    stock: 15
  },
  {
    id: 12,
    name: "Ice Cream",
    category: "desserts",
    description: "Muzqaymoq",
    price: 10000,
    image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop",
    stock: 40
  },
  {
    id: 13,
    name: "Coca Cola",
    category: "drinks",
    description: "Sovuq ichimlik",
    price: 8000,
    image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=400&h=300&fit=crop",
    stock: 200
  },
  {
    id: 14,
    name: "Pepsi",
    category: "drinks",
    description: "Sovuq ichimlik",
    price: 8000,
    image: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=300&fit=crop",
    stock: 180
  },
  {
    id: 15,
    name: "Grilled Chicken",
    category: "chicken",
    description: "Pishirilgan tovuq",
    price: 48000,
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop",
    stock: 35
  }
];

// Mock tables
export const tables = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  number: i + 1,
  status: i < 13 ? "available" : i < 19 ? "occupied" : "reserved",
  capacity: 4,
  currentOrder: null
}));

// Mock orders
export let orders = [
  {
    id: "#0112538",
    tableId: 8,
    waiter: "Sarah M",
    status: "paid",
    items: [
      { id: 7, name: "Pasta Primavera", price: 35000, quantity: 3, image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=200&h=200&fit=crop" },
      { id: 8, name: "Lamb Kebabs", price: 45000, quantity: 2, image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=200&h=200&fit=crop" }
    ],
    orderType: "dine-in",
    createdAt: new Date(Date.now() - 7200000),
    total: 120000
  },
  {
    id: "#0112539",
    tableId: 11,
    waiter: "Tom H",
    status: "pending",
    items: [
      { id: 1, name: "Tandoori Tovuq", price: 45000, quantity: 2, image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=200&h=200&fit=crop" },
      { id: 9, name: "Cappuccino", price: 12000, quantity: 2, image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=200&h=200&fit=crop" }
    ],
    orderType: "dine-in",
    createdAt: new Date(Date.now() - 3600000),
    total: 131400
  },
  {
    id: "#0112540",
    tableId: 12,
    waiter: "Anna K",
    status: "canceled",
    items: [
      { id: 5, name: "Butter Tovuq", price: 50000, quantity: 1, image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=200&h=200&fit=crop" },
      { id: 11, name: "Chocolate Cake", price: 25000, quantity: 1, image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=200&h=200&fit=crop" }
    ],
    orderType: "take-away",
    createdAt: new Date(Date.now() - 10800000),
    total: 110000
  },
  {
    id: "#0112541",
    tableId: 5,
    waiter: "Mike Johnson",
    status: "pending",
    items: [
      { id: 3, name: "Palak Paneer", price: 35000, quantity: 2, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&h=200&fit=crop" },
      { id: 13, name: "Coca Cola", price: 8000, quantity: 3, image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?w=200&h=200&fit=crop" }
    ],
    orderType: "dine-in",
    createdAt: new Date(Date.now() - 900000),
    total: 101200
  },
  {
    id: "#0112542",
    tableId: 9,
    waiter: "Emily Brown",
    status: "paid",
    items: [
      { id: 6, name: "Dosa", price: 25000, quantity: 3, image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200&h=200&fit=crop" },
      { id: 10, name: "Latte", price: 15000, quantity: 2, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d005?w=200&h=200&fit=crop" }
    ],
    orderType: "dine-in",
    createdAt: new Date(Date.now() - 450000),
    total: 120750
  }
];

// Mock history orders
const generateHistoryOrder = (id, tableNo, daysAgo, hoursAgo, waiterName, items, paymentMethod) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(date.getHours() - hoursAgo);
  
  return {
    id: `#${id}`,
    tableNo: tableNo,
    status: "paid",
    date: date.toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    waiter: { name: waiterName, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${waiterName}` },
    items: items,
    subtotal: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0) * 1.15,
    paymentMethod: paymentMethod
  };
};

export let historyOrders = [
  generateHistoryOrder("3066", 1, 0, 2, "Olivia Rhye", [
    { name: "Cappuccino", quantity: 3, price: 12000 },
    { name: "Latte", quantity: 2, price: 15000 }
  ], "cash"),
  generateHistoryOrder("3067", 2, 0, 3, "Anvar Aripov", [
    { name: "Tandoori Tovuq", quantity: 2, price: 45000 },
    { name: "Coca Cola", quantity: 2, price: 8000 }
  ], "card"),
  generateHistoryOrder("3068", 4, 0, 4, "Sarah M", [
    { name: "Butter Tovuq", quantity: 1, price: 50000 },
    { name: "Chocolate Cake", quantity: 1, price: 25000 }
  ], "qr"),
  generateHistoryOrder("3069", 6, 0, 5, "John Doe", [
    { name: "Palak Paneer", quantity: 2, price: 35000 },
    { name: "Pepsi", quantity: 3, price: 8000 }
  ], "cash"),
  generateHistoryOrder("3070", 8, 1, 1, "Jane Smith", [
    { name: "Dosa", quantity: 3, price: 25000 },
    { name: "Ice Cream", quantity: 2, price: 10000 }
  ], "card"),
  generateHistoryOrder("3071", 10, 1, 2, "Mike Johnson", [
    { name: "Grilled Chicken", quantity: 2, price: 48000 },
    { name: "Latte", quantity: 1, price: 15000 }
  ], "mixed"),
  generateHistoryOrder("3072", 11, 1, 3, "Emily Brown", [
    { name: "Samosa", quantity: 5, price: 15000 },
    { name: "Cappuccino", quantity: 2, price: 12000 }
  ], "cash"),
  generateHistoryOrder("3073", 13, 1, 4, "Olivia Rhye", [
    { name: "Pasta Primavera", quantity: 2, price: 40000 },
    { name: "Coca Cola", quantity: 2, price: 8000 }
  ], "card"),
  generateHistoryOrder("3074", 15, 2, 1, "Anvar Aripov", [
    { name: "Lamb Kebabs", quantity: 2, price: 55000 },
    { name: "Pepsi", quantity: 2, price: 8000 }
  ], "qr"),
  generateHistoryOrder("3075", 16, 2, 2, "Sarah M", [
    { name: "Aloo Gobi", quantity: 3, price: 30000 },
    { name: "Ice Cream", quantity: 1, price: 10000 }
  ], "cash"),
  generateHistoryOrder("3076", 18, 2, 3, "John Doe", [
    { name: "Tandoori Tovuq", quantity: 1, price: 45000 },
    { name: "Chocolate Cake", quantity: 2, price: 25000 }
  ], "card"),
  generateHistoryOrder("3077", 20, 2, 4, "Jane Smith", [
    { name: "Butter Tovuq", quantity: 2, price: 50000 },
    { name: "Latte", quantity: 3, price: 15000 }
  ], "mixed"),
  generateHistoryOrder("3078", 22, 3, 1, "Mike Johnson", [
    { name: "Palak Paneer", quantity: 1, price: 35000 },
    { name: "Cappuccino", quantity: 2, price: 12000 }
  ], "cash"),
  generateHistoryOrder("3079", 3, 3, 2, "Emily Brown", [
    { name: "Dosa", quantity: 2, price: 25000 },
    { name: "Coca Cola", quantity: 4, price: 8000 }
  ], "card"),
  generateHistoryOrder("3080", 5, 3, 3, "Olivia Rhye", [
    { name: "Grilled Chicken", quantity: 1, price: 48000 },
    { name: "Pepsi", quantity: 2, price: 8000 }
  ], "qr"),
  generateHistoryOrder("3081", 7, 3, 4, "Anvar Aripov", [
    { name: "Samosa", quantity: 4, price: 15000 },
    { name: "Ice Cream", quantity: 3, price: 10000 }
  ], "cash"),
  generateHistoryOrder("3082", 9, 4, 1, "Sarah M", [
    { name: "Pasta Primavera", quantity: 1, price: 40000 },
    { name: "Chocolate Cake", quantity: 1, price: 25000 }
  ], "card"),
  generateHistoryOrder("3083", 12, 4, 2, "John Doe", [
    { name: "Lamb Kebabs", quantity: 3, price: 55000 },
    { name: "Latte", quantity: 2, price: 15000 }
  ], "mixed"),
  generateHistoryOrder("3084", 14, 4, 3, "Jane Smith", [
    { name: "Aloo Gobi", quantity: 2, price: 30000 },
    { name: "Cappuccino", quantity: 1, price: 12000 }
  ], "cash"),
  generateHistoryOrder("3085", 17, 4, 4, "Mike Johnson", [
    { name: "Tandoori Tovuq", quantity: 2, price: 45000 },
    { name: "Coca Cola", quantity: 3, price: 8000 }
  ], "card"),
  generateHistoryOrder("3086", 19, 5, 1, "Emily Brown", [
    { name: "Butter Tovuq", quantity: 1, price: 50000 },
    { name: "Pepsi", quantity: 2, price: 8000 }
  ], "qr"),
  generateHistoryOrder("3087", 21, 5, 2, "Olivia Rhye", [
    { name: "Palak Paneer", quantity: 2, price: 35000 },
    { name: "Ice Cream", quantity: 2, price: 10000 }
  ], "cash"),
  generateHistoryOrder("3088", 23, 5, 3, "Anvar Aripov", [
    { name: "Dosa", quantity: 4, price: 25000 },
    { name: "Chocolate Cake", quantity: 1, price: 25000 }
  ], "card"),
  generateHistoryOrder("3089", 2, 5, 4, "Sarah M", [
    { name: "Grilled Chicken", quantity: 2, price: 48000 },
    { name: "Latte", quantity: 1, price: 15000 }
  ], "mixed")
];

// API functions
export const loginUser = (email, password) => {
  const user = mockUsers.find(u => u.email === email && u.password === password);
  if (user) {
    return { success: true, user: { ...user, password: undefined } };
  }
  return { success: false, message: "Invalid credentials" };
};

export const getMenuItems = (category = "all") => {
  if (category === "all") return menuItems;
  return menuItems.filter(item => item.category === category);
};

export const createOrder = (orderData) => {
  const subtotal = orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.15;
  const total = subtotal + tax;
  
  const newOrder = {
    id: `#${String(Math.floor(Math.random() * 1000000)).padStart(7, '0')}`,
    ...orderData,
    subtotal: subtotal,
    total: total,
    createdAt: new Date()
  };
  orders.push(newOrder);
  return newOrder;
};

export const updateOrder = (orderId, updates) => {
  const index = orders.findIndex(o => o.id === orderId);
  if (index !== -1) {
    const updatedOrder = { ...orders[index], ...updates };
    // Recalculate totals if items changed
    if (updates.items) {
      const subtotal = updates.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const tax = subtotal * 0.15;
      updatedOrder.subtotal = subtotal;
      updatedOrder.total = subtotal + tax;
    }
    orders[index] = updatedOrder;
    return updatedOrder;
  }
  return null;
};

export const completeOrder = (orderId, paymentData) => {
  const order = orders.find(o => o.id === orderId);
  if (order) {
    const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.15;
    const total = subtotal + tax;
    
    const historyOrder = {
      ...order,
      tableNo: order.tableId,
      status: "paid",
      paymentMethod: paymentData.method,
      paid: paymentData.amount || total,
      subtotal: subtotal,
      total: total,
      date: new Date().toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    };
    historyOrders.unshift(historyOrder);
    orders = orders.filter(o => o.id !== orderId);
    return historyOrder;
  }
  return null;
};

export const getCashiers = () => {
  return mockUsers.filter(u => u.role === "cashier");
};

export const addCashier = (cashierData) => {
  const newCashier = {
    id: mockUsers.length + 1,
    ...cashierData,
    role: "cashier",
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${cashierData.name}`,
    status: "active"
  };
  mockUsers.push(newCashier);
  return newCashier;
};

export const updateCashier = (id, cashierData) => {
  const index = mockUsers.findIndex(u => u.id === id);
  if (index !== -1) {
    mockUsers[index] = { ...mockUsers[index], ...cashierData };
    return mockUsers[index];
  }
  return null;
};

export const deleteCashier = (id) => {
  const index = mockUsers.findIndex(u => u.id === id);
  if (index !== -1) {
    mockUsers.splice(index, 1);
    return true;
  }
  return false;
};

