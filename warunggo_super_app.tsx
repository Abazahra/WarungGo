import React, { useState } from 'react';

export default function WarungGoApp() {
  // Navigation & Role States
  const [activeRole, setActiveRole] = useState('landing'); // 'landing', 'consumer', 'warung', 'courier', 'admin'
  const [activeTab, setActiveTab] = useState('explore'); // For consumer
  const [selectedStoreFilter, setSelectedStoreFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [adminClickCount, setAdminClickCount] = useState(0);

  // Authentication & Registration States
  const [isConsumerRegistered, setIsConsumerRegistered] = useState(false);
  const [consumerProfile, setConsumerProfile] = useState({
    name: 'Budi Santoso',
    phone: '081234567890',
    addrStreet: 'Jl. Raya Pameungpeuk',
    addrNo: '45',
    addrKp: 'Cikaso',
    addrRtRw: '02/01',
    addrDesa: 'Mergawati',
    addrKec: 'Pameungpeuk',
    addrKab: 'Garut',
    landmark: 'Dekat Masjid Al-Barokah',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100'
  });

  // Warung Registration & Login State
  const [showWarungRegister, setShowWarungRegister] = useState(false);
  const [warungLoginModal, setWarungLoginModal] = useState(false);
  const [warungLoginPhone, setWarungLoginPhone] = useState('');
  const [warungLoginPin, setWarungLoginPin] = useState('');
  const [warungRegForm, setWarungRegForm] = useState({
    ownerName: '',
    phone: '',
    pin: '',
    storeName: '',
    category: 'Kuliner',
    addrStreet: '',
    addrNo: '',
    addrKp: '',
    addrRtRw: '',
    addrDesa: '',
    addrKec: 'Pameungpeuk',
    addrKab: 'Garut',
    landmark: '',
    bank: 'BCA',
    ownerPhoto: '',
    ktpPhoto: '',
    agreedToTerms: false
  });

  // Courier Registration & Login State
  const [showCourierRegister, setShowCourierRegister] = useState(false);
  const [courierLoginModal, setCourierLoginModal] = useState(false);
  const [courierLoginPhone, setCourierLoginPhone] = useState('');
  const [courierLoginPin, setCourierLoginPin] = useState('');
  const [courierRegForm, setCourierRegForm] = useState({
    name: '',
    phone: '',
    pin: '',
    vehicle: '',
    plateNo: '',
    addrStreet: '',
    addrNo: '',
    addrKp: '',
    addrRtRw: '',
    addrDesa: '',
    addrKec: 'Pameungpeuk',
    addrKab: 'Garut',
    bank: 'DANA',
    ownerPhoto: '',
    ktpPhoto: '',
    agreedToTerms: false
  });

  // Admin Security States
  const [adminPinInput, setAdminPinInput] = useState('');
  const [adminVerified, setAdminVerified] = useState(false);
  const [adminStep, setAdminStep] = useState('pin'); // 'pin', 'verification'
  const [adminSubTab, setAdminSubTab] = useState('ledger');
  const [adminPhone, setAdminPhone] = useState('081321312304');
  
  // Admin Bank & E-Wallet List State for Dynamic Consumer Checkout
  const [adminBanks, setAdminBanks] = useState([
    { id: 1, name: 'BCA', accNo: '081321312304', holder: 'PT WarungGo Pameungpeuk' },
    { id: 2, name: 'BJB', accNo: '081321312304', holder: 'PT WarungGo Pameungpeuk' },
    { id: 3, name: 'BNI', accNo: '081321312304', holder: 'PT WarungGo Pameungpeuk' },
    { id: 4, name: 'BRI', accNo: '081321312304', holder: 'PT WarungGo Pameungpeuk' },
    { id: 5, name: 'BSI', accNo: '081321312304', holder: 'PT WarungGo Pameungpeuk' },
    { id: 6, name: 'Mandiri', accNo: '081321312304', holder: 'PT WarungGo Pameungpeuk' },
    { id: 7, name: 'DANA', accNo: '081321312304', holder: 'PT WarungGo Pameungpeuk' },
    { id: 8, name: 'OVO', accNo: '081321312304', holder: 'PT WarungGo Pameungpeuk' },
    { id: 9, name: 'ShopeePay', accNo: '081321312304', holder: 'PT WarungGo Pameungpeuk' }
  ]);
  const [newBankForm, setNewBankForm] = useState({ name: '', accNo: '081321312304', holder: 'PT WarungGo Pameungpeuk' });

  const [adminBank, setAdminBank] = useState({ 
    bankName: 'BCA', 
    accNo: '081321312304', 
    qrisImage: 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=WARUNGGO-QRIS-OFFICIAL-081321312304' 
  });

  const [activityLogs, setActivityLogs] = useState([
    { id: 1, role: 'Konsumen', action: 'Membuat pesanan baru WG-9021', timestamp: '2026-11-01 22:15:10' },
    { id: 2, role: 'Warung', action: 'Menerima pesanan WG-9021', timestamp: '2026-11-01 22:16:00' },
    { id: 3, role: 'Kurir', action: 'Mengambil pesanan WG-9021 dari warung', timestamp: '2026-11-01 22:25:00' },
    { id: 4, role: 'Admin', action: 'Verifikasi Escrow Ledger & Bagi Hasil', timestamp: '2026-11-01 22:30:12' }
  ]);

  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcasts, setBroadcasts] = useState([
    { id: 1, text: 'Selamat datang di WarungGo Pameungpeuk! Nikmati ongkir flat & jajanan khas lokal.', timestamp: '2026-11-01 08:00' }
  ]);

  // Notification Toast State
  const [notification, setNotification] = useState(null);
  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // Mock Stores & Products
  const [stores, setStores] = useState([
    {
      id: 1,
      name: 'Warung Nasi Ibu Siti',
      phone: '081122334455',
      pin: '1234',
      category: 'Kuliner',
      status: 'Buka',
      address: 'Jl. Raya Pameungpeuk No.12',
      rating: 4.9,
      earnings: 45000,
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500',
      products: [
        { id: 101, name: 'Sate Ayam Pameungpeuk (10 Tusuk)', price: 25000, desc: 'Sate ayam bumbu kacang khas pesisir.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300' },
        { id: 102, name: 'Nasi Liwet Sunda Lengkap', price: 20000, desc: 'Nasi liwet dengan ikan asin, timun, dan sambal terasi.', image: 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=300' },
        { id: 103, name: 'Es Kelapa Muda Pesisir', price: 8000, desc: 'Kelapa muda segar asli pantai selatan.', image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=300' }
      ]
    },
    {
      id: 2,
      name: 'Toko Kelontong Berkah Jaya',
      phone: '081299887766',
      pin: '5678',
      category: 'Sembako',
      status: 'Buka',
      address: 'Pasar Cikaso Pameungpeuk',
      rating: 4.8,
      earnings: 0,
      image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=500',
      products: [
        { id: 201, name: 'Beras Premium Lokal 5Kg', price: 65000, desc: 'Beras pulen hasil petani lokal Pameungpeuk.', image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300' },
        { id: 202, name: 'Minyak Goreng 2L', price: 34000, desc: 'Minyak goreng kemasan higienis.', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300' }
      ]
    }
  ]);

  const [pendingWarungs, setPendingWarungs] = useState([
    { id: 991, ownerName: 'Pak Dadan', phone: '081987654321', pin: '4321', name: 'Warung Ikan Bakar Cikaso', category: 'Kuliner', addrStreet: 'Jl. Pantai Cikaso', addrNo: '9', addrKec: 'Pameungpeuk' }
  ]);

  const [couriers, setCouriers] = useState([
    { id: 1, name: 'Asep Kurir', phone: '081211223344', pin: '1111', vehicle: 'Honda Beat', plateNo: 'Z 4567 AB', status: 'Aktif', earnings: 144000, rating: 4.9 },
    { id: 2, name: 'Jajang Express', phone: '081355667788', pin: '2222', vehicle: 'Yamaha Mio', plateNo: 'Z 8901 CD', status: 'Aktif', earnings: 96000, rating: 4.8 }
  ]);
  const [pendingCouriers, setPendingCouriers] = useState([
    { id: 881, name: 'Ujang Kurir', phone: '081233445566', pin: '3333', vehicle: 'Suzuki Smash', plateNo: 'Z 1234 EF', addrKec: 'Pameungpeuk' }
  ]);

  // Cart State
  const [cart, setCart] = useState([]); // [{productId, storeId, storeName, name, price, qty}]
  const [selectedCourierId, setSelectedCourierId] = useState(1);
  const [checkoutData, setCheckoutData] = useState({
    paymentMethod: 'QRIS',
    selectedBank: 'BCA',
    paymentProof: ''
  });

  // Orders State
  const [orders, setOrders] = useState([
    {
      id: 'WG-9020',
      storeId: 1,
      storeName: 'Warung Nasi Ibu Siti',
      customerName: 'Budi Santoso',
      items: [{ name: 'Sate Ayam Pameungpeuk (10 Tusuk)', qty: 2, price: 25000 }],
      total: 58000, // 50k + 8k ongkir
      subtotal: 50000,
      ongkir: 8000,
      courierId: 1,
      courierName: 'Asep Kurir',
      paymentMethod: 'QRIS (BCA - 081321312304)',
      paymentStatus: 'Lunas & Terverifikasi Admin',
      status: 'Sedang Diantar oleh Kurir',
      timestamp: '2026-11-01 21:00:00'
    }
  ]);

  // Financial Ledger State
  const [ledgerEntries, setLedgerEntries] = useState([
    { id: 1, date: '2026-11-01 21:00:00', desc: 'Pesanan WG-9020 (Warung Nasi Ibu Siti)', paymentAccount: 'BCA (081321312304)', warungCut: 45000, platformCut: 5000, courierFee: 8000, total: 58000 }
  ]);

  // Total Platform Profit
  const [adminTotalProfit, setAdminTotalProfit] = useState(5000);

  // Handle Printing & PDF Export
  const handlePrintLedger = () => {
    window.print();
  };

  // Helper for Camera / Gallery File Simulation
  const handleFileUpload = (e, formType, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file);
      if (formType === 'warung') {
        setWarungRegForm(prev => ({ ...prev, [fieldName]: fakeUrl }));
      } else if (formType === 'courier') {
        setCourierRegForm(prev => ({ ...prev, [fieldName]: fakeUrl }));
      }
      showNotification('📸 Foto berhasil dimuat!');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-400 selection:text-slate-950 pb-20">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 bg-amber-400 text-slate-950 font-bold px-6 py-3.5 rounded-2xl shadow-2xl border-2 border-amber-300 animate-bounce text-sm">
          {notification}
        </div>
      )}

      {/* TOP NAVBAR */}
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur border-b border-slate-800 px-4 sm:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div 
            onClick={() => {
              const newCount = adminClickCount + 1;
              setAdminClickCount(newCount);
              if (newCount >= 5) {
                setActiveRole('admin');
                setAdminClickCount(0);
                showNotification('🔓 Mode Admin Terbuka!');
              }
            }}
            className="bg-gradient-to-tr from-amber-500 to-amber-300 w-11 h-11 rounded-2xl flex items-center justify-center font-black text-slate-950 text-xl shadow-lg cursor-pointer transform hover:scale-105 transition-all"
            title="Klik 5 kali untuk Akses Admin"
          >
            WG
          </div>
          <div>
            <h1 className="text-base sm:text-lg font-black tracking-tight text-white flex items-center gap-2">
              WarungGo <span className="bg-amber-400 text-slate-950 text-[10px] px-2 py-0.5 rounded-full font-bold">Pameungpeuk-Garut</span>
            </h1>
            <p className="text-xs text-slate-400">Platform Jajanan & Kuliner Pesisir Selatan</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {activeRole !== 'landing' && (
            <button 
              onClick={() => setActiveRole('landing')}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border border-slate-700"
            >
              🚪 Keluar / Gerbang Role
            </button>
          )}
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-6">

        {/* 1. LANDING PORTAL (GERBANG ROLE) - KULINER IMMERSIVE BANNER */}
        {activeRole === 'landing' && (
          <div className="space-y-10 py-6">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-slate-800">
              {/* Background Culinary Image with Dark Gradient Overlay */}
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1600" 
                  alt="Kuliner Pameungpeuk" 
                  className="w-full h-full object-cover filter brightness-50 transform hover:scale-105 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/40"></div>
              </div>

              <div className="relative z-10 p-8 sm:p-16 max-w-3xl space-y-6">
                <div className="flex items-center gap-2">
                  <span className="bg-amber-400 text-slate-950 text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-widest shadow-lg animate-pulse">
                    🔥 Cita Rasa Pesisir Selatan
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-xs font-bold px-3 py-1 rounded-full">
                    ✅ Siap Kirim Pesanan
                  </span>
                </div>
                
                <h2 className="text-3xl sm:text-6xl font-black text-white tracking-tight leading-none drop-shadow-md">
                  Jajanan & Kuliner Lezat Pameungpeuk Dalam Genggaman.
                </h2>
                
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed font-medium">
                  Nikmati sate ayam pesisir, nasi liwet hangat, es kelapa segar, hingga sembako harian langsung dari warung pilihan terbaik di Pameungpeuk dan sekitarnya.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <button 
                    onClick={() => setActiveRole('consumer')}
                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-8 py-4 rounded-2xl shadow-2xl transition-all cursor-pointer text-sm uppercase tracking-wider transform hover:-translate-y-0.5"
                  >
                    🛒 Mulai Belanja Sekarang
                  </button>
                  <button 
                    onClick={() => setWarungLoginModal(true)}
                    className="bg-slate-900/80 hover:bg-slate-800 text-white font-bold px-6 py-4 rounded-2xl border border-slate-700 backdrop-blur transition-all cursor-pointer text-sm"
                  >
                    🏪 Mitra Warung Masuk
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-slate-900/90 border border-slate-800 hover:border-amber-400/50 p-6 sm:p-8 rounded-3xl transition-all shadow-xl flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-14 h-14 bg-amber-400/10 text-amber-400 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-amber-400 group-hover:text-slate-950 transition-all font-black">
                    🛒
                  </div>
                  <h3 className="text-xl font-black text-white">Konsumen / Warga</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Pesan makanan, jajanan, dan sembako dari warung terdekat di Pameungpeuk dengan ongkir flat & kurir pilihan.
                  </p>
                </div>
                <button 
                  onClick={() => setActiveRole('consumer')}
                  className="mt-6 w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black py-3 rounded-2xl transition-all cursor-pointer text-xs uppercase tracking-wider"
                >
                  Masuk Sebagai Konsumen →
                </button>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 hover:border-emerald-400/50 p-6 sm:p-8 rounded-3xl transition-all shadow-xl flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-14 h-14 bg-emerald-400/10 text-emerald-400 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-emerald-400 group-hover:text-slate-950 transition-all font-black">
                    🏪
                  </div>
                  <h3 className="text-xl font-black text-white">Mitra Warung / Toko</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Daftarkan warung kuliner atau toko Anda, kelola menu produk, dan terima pesanan dari warga sekitar Pameungpeuk.
                  </p>
                </div>
                <div className="mt-6 space-y-2">
                  <button 
                    onClick={() => setWarungLoginModal(true)}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 rounded-2xl transition-all cursor-pointer text-xs uppercase tracking-wider"
                  >
                    Login Warung (User & PIN)
                  </button>
                  <button 
                    onClick={() => setShowWarungRegister(true)}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-emerald-500/30 font-bold py-2.5 rounded-2xl transition-all cursor-pointer text-xs"
                  >
                    + Daftar Warung Baru
                  </button>
                </div>
              </div>

              <div className="bg-slate-900/90 border border-slate-800 hover:border-cyan-400/50 p-6 sm:p-8 rounded-3xl transition-all shadow-xl flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="w-14 h-14 bg-cyan-400/10 text-cyan-400 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-cyan-400 group-hover:text-slate-950 transition-all font-black">
                    🛵
                  </div>
                  <h3 className="text-xl font-black text-white">Kurir Partner</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Ambil tugas pengantaran pesanan di wilayah Pameungpeuk dan dapatkan 100% hak ongkos kirim secara transparan.
                  </p>
                </div>
                <div className="mt-6 space-y-2">
                  <button 
                    onClick={() => setCourierLoginModal(true)}
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-3 rounded-2xl transition-all cursor-pointer text-xs uppercase tracking-wider"
                  >
                    Login Kurir (User & PIN)
                  </button>
                  <button 
                    onClick={() => setShowCourierRegister(true)}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-cyan-400 border border-cyan-500/30 font-bold py-2.5 rounded-2xl transition-all cursor-pointer text-xs"
                  >
                    + Daftar Kurir Baru
                  </button>
                </div>
              </div>

            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-3xl flex items-center gap-4">
              <span className="text-2xl">📢</span>
              <div>
                <h4 className="text-xs font-black text-amber-400 uppercase tracking-widest">Informasi Terbaru WarungGo</h4>
                <p className="text-xs text-slate-300 mt-0.5">{broadcasts[0]?.text}</p>
              </div>
            </div>
          </div>
        )}

        {/* --- MODALS & REGISTRATION --- */}
        {warungLoginModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-black text-white">Login Mitra Warung</h3>
                <button onClick={() => setWarungLoginModal(false)} className="text-slate-400 hover:text-white font-bold">✕</button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const found = stores.find(s => (s.phone === warungLoginPhone || s.name.toLowerCase().includes(warungLoginPhone.toLowerCase())) && s.pin === warungLoginPin);
                if (found) {
                  setActiveRole('warung');
                  setWarungLoginModal(false);
                  showNotification(`✅ Selamat datang kembali, ${found.name}!`);
                } else {
                  showNotification('❌ Nomor User / PIN Warung salah atau belum terdaftar.');
                }
              }} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Nama User / No. WhatsApp Warung</label>
                  <input 
                    type="text" 
                    placeholder="Contoh: 081122334455"
                    value={warungLoginPhone}
                    onChange={(e) => setWarungLoginPhone(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">PIN Rahasia (4-6 Digit)</label>
                  <input 
                    type="password" 
                    placeholder="••••"
                    maxLength="6"
                    value={warungLoginPin}
                    onChange={(e) => setWarungLoginPin(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white font-medium"
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 rounded-xl cursor-pointer">
                  Masuk ke Dashboard Warung
                </button>
              </form>
            </div>
          </div>
        )}

        {courierLoginModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-6 shadow-2xl">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-black text-white">Login Kurir Partner</h3>
                <button onClick={() => setCourierLoginModal(false)} className="text-slate-400 hover:text-white font-bold">✕</button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                const found = couriers.find(c => (c.phone === courierLoginPhone || c.name.toLowerCase().includes(courierLoginPhone.toLowerCase())) && c.pin === courierLoginPin);
                if (found) {
                  setActiveRole('courier');
                  setCourierLoginModal(false);
                  showNotification(`✅ Selamat datang kembali, ${found.name}!`);
                } else {
                  showNotification('❌ Nomor User / PIN Kurir salah atau belum terdaftar.');
                }
              }} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Nama User / No. WhatsApp Kurir</label>
                  <input 
                    type="text" 
                    placeholder="Contoh: 081211223344"
                    value={courierLoginPhone}
                    onChange={(e) => setCourierLoginPhone(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white font-medium"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">PIN Rahasia (4-6 Digit)</label>
                  <input 
                    type="password" 
                    placeholder="••••"
                    maxLength="6"
                    value={courierLoginPin}
                    onChange={(e) => setCourierLoginPin(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2.5 text-white font-medium"
                    required
                  />
                </div>
                <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-3 rounded-xl cursor-pointer">
                  Masuk ke Dashboard Kurir
                </button>
              </form>
            </div>
          </div>
        )}

        {showCourierRegister && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-black text-cyan-400">Pendaftaran Kurir Partner Baru</h3>
                <button onClick={() => setShowCourierRegister(false)} className="text-slate-400 hover:text-white font-bold">✕</button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                if (!courierRegForm.name || !courierRegForm.phone || !courierRegForm.pin) return;
                setPendingCouriers([...pendingCouriers, { id: Date.now(), ...courierRegForm }]);
                setShowCourierRegister(false);
                showNotification('🎉 Pendaftaran kurir berhasil dikirim! Menunggu verifikasi admin.');
              }} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Nama Lengkap</label>
                    <input 
                      type="text" 
                      placeholder="Asep Kurir"
                      value={courierRegForm.name}
                      onChange={(e) => setCourierRegForm({...courierRegForm, name: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">No. User / WhatsApp</label>
                    <input 
                      type="text" 
                      placeholder="081211223344"
                      value={courierRegForm.phone}
                      onChange={(e) => setCourierRegForm({...courierRegForm, phone: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Buat PIN Login</label>
                    <input 
                      type="password" 
                      placeholder="••••"
                      maxLength="6"
                      value={courierRegForm.pin}
                      onChange={(e) => setCourierRegForm({...courierRegForm, pin: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Jenis Kendaraan</label>
                    <input 
                      type="text" 
                      placeholder="Honda Beat"
                      value={courierRegForm.vehicle}
                      onChange={(e) => setCourierRegForm({...courierRegForm, vehicle: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Nomor Plat Kendaraan</label>
                    <input 
                      type="text" 
                      placeholder="Z 4567 AB"
                      value={courierRegForm.plateNo}
                      onChange={(e) => setCourierRegForm({...courierRegForm, plateNo: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Nama Jalan / Blok</label>
                    <input 
                      type="text" 
                      placeholder="Jl. Raya Cikaso"
                      value={courierRegForm.addrStreet}
                      onChange={(e) => setCourierRegForm({...courierRegForm, addrStreet: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Desa / Kelurahan</label>
                    <input 
                      type="text" 
                      placeholder="Mergawati"
                      value={courierRegForm.addrDesa}
                      onChange={(e) => setCourierRegForm({...courierRegForm, addrDesa: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Kecamatan</label>
                    <input 
                      type="text" 
                      placeholder="Pameungpeuk"
                      value={courierRegForm.addrKec}
                      onChange={(e) => setCourierRegForm({...courierRegForm, addrKec: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Kabupaten</label>
                    <input 
                      type="text" 
                      value="Garut"
                      disabled
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-400 font-medium cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Upload Foto Diri (Kamera/Galeri)</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      capture="user"
                      onChange={(e) => handleFileUpload(e, 'courier', 'ownerPhoto')}
                      className="w-full text-[10px] text-slate-400 file:mr-2 file:py-1 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-cyan-500 file:text-slate-950 hover:file:bg-cyan-400"
                    />
                    {courierRegForm.ownerPhoto && <p className="text-[10px] text-emerald-400 mt-1">✓ Foto diri terpilih</p>}
                  </div>
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Upload Foto KTP / SIM C</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'courier', 'ktpPhoto')}
                      className="w-full text-[10px] text-slate-400 file:mr-2 file:py-1 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-cyan-500 file:text-slate-950 hover:file:bg-cyan-400"
                    />
                    {courierRegForm.ktpPhoto && <p className="text-[10px] text-emerald-400 mt-1">✓ Foto KTP terpilih</p>}
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Bank / E-Wallet Pencairan Ongkir</label>
                  <select 
                    value={courierRegForm.bank}
                    onChange={(e) => setCourierRegForm({...courierRegForm, bank: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                  >
                    <option value="BCA">BCA</option>
                    <option value="BJB">BJB</option>
                    <option value="BNI">BNI</option>
                    <option value="BRI">BRI</option>
                    <option value="BSI">BSI</option>
                    <option value="Mandiri">Mandiri</option>
                    <option value="DANA">DANA</option>
                    <option value="OVO">OVO</option>
                    <option value="ShopeePay">ShopeePay</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input 
                    type="checkbox" 
                    id="courierTerms"
                    checked={courierRegForm.agreedToTerms}
                    onChange={(e) => setCourierRegForm({...courierRegForm, agreedToTerms: e.target.checked})}
                    className="rounded bg-slate-800 border-slate-700"
                    required
                  />
                  <label htmlFor="courierTerms" className="text-slate-300 text-[11px]">Saya menyetujui ketentuan hak 100% ongkir kurir dan kedisiplinan pengantaran.</label>
                </div>

                <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black py-3 rounded-xl cursor-pointer">
                  Daftar Kurir Sekarang
                </button>
              </form>
            </div>
          </div>
        )}

        {showWarungRegister && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl my-8 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-black text-emerald-400">Pendaftaran Mitra Warung Baru</h3>
                <button onClick={() => setShowWarungRegister(false)} className="text-slate-400 hover:text-white font-bold">✕</button>
              </div>
              <form onSubmit={(e) => {
                e.preventDefault();
                if (!warungRegForm.storeName || !warungRegForm.phone || !warungRegForm.pin) return;
                setPendingWarungs([...pendingWarungs, { id: Date.now(), ...warungRegForm }]);
                setShowWarungRegister(false);
                showNotification('🎉 Pendaftaran warung berhasil dikirim! Menunggu verifikasi admin.');
              }} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Nama Pemilik</label>
                    <input 
                      type="text" 
                      placeholder="Ibu Siti"
                      value={warungRegForm.ownerName}
                      onChange={(e) => setWarungRegForm({...warungRegForm, ownerName: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Nama Warung / Toko</label>
                    <input 
                      type="text" 
                      placeholder="Warung Nasi Barokah"
                      value={warungRegForm.storeName}
                      onChange={(e) => setWarungRegForm({...warungRegForm, storeName: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Nama User / No. WhatsApp</label>
                    <input 
                      type="text" 
                      placeholder="081234567890"
                      value={warungRegForm.phone}
                      onChange={(e) => setWarungRegForm({...warungRegForm, phone: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Buat PIN Login</label>
                    <input 
                      type="password" 
                      placeholder="••••"
                      maxLength="6"
                      value={warungRegForm.pin}
                      onChange={(e) => setWarungRegForm({...warungRegForm, pin: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Kategori Usaha</label>
                  <select 
                    value={warungRegForm.category}
                    onChange={(e) => setWarungRegForm({...warungRegForm, category: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                  >
                    <option value="Kuliner">Kuliner / Makanan & Minuman</option>
                    <option value="Sembako">Sembako & Alat Rumah Tangga</option>
                    <option value="Elektronik">Elektronik & Ponsel</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Nama Jalan / Blok</label>
                    <input 
                      type="text" 
                      placeholder="Jl. Cilauteren"
                      value={warungRegForm.addrStreet}
                      onChange={(e) => setWarungRegForm({...warungRegForm, addrStreet: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">No. / Kp / RT/RW</label>
                    <input 
                      type="text" 
                      placeholder="Kp. Cikuda RT 01/02"
                      value={warungRegForm.addrKp}
                      onChange={(e) => setWarungRegForm({...warungRegForm, addrKp: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Desa / Kelurahan</label>
                    <input 
                      type="text" 
                      placeholder="Jatimulya"
                      value={warungRegForm.addrDesa}
                      onChange={(e) => setWarungRegForm({...warungRegForm, addrDesa: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Kecamatan</label>
                    <input 
                      type="text" 
                      placeholder="Pameungpeuk / Cikelet / Santolo"
                      value={warungRegForm.addrKec}
                      onChange={(e) => setWarungRegForm({...warungRegForm, addrKec: e.target.value})}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Kabupaten</label>
                    <input 
                      type="text" 
                      value="Garut"
                      disabled
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-400 font-medium cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Patokan / Landmark Terdekat</label>
                  <input 
                    type="text" 
                    placeholder="Contoh: Dekat Jembatan Cikaso"
                    value={warungRegForm.landmark}
                    onChange={(e) => setWarungRegForm({...warungRegForm, landmark: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Upload Foto Diri (Kamera/Galeri)</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      capture="user"
                      onChange={(e) => handleFileUpload(e, 'warung', 'ownerPhoto')}
                      className="w-full text-[10px] text-slate-400 file:mr-2 file:py-1 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-500 file:text-slate-950 hover:file:bg-emerald-400"
                    />
                    {warungRegForm.ownerPhoto && <p className="text-[10px] text-emerald-400 mt-1">✓ Foto diri terpilih</p>}
                  </div>
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Upload Foto KTP / Toko</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'warung', 'ktpPhoto')}
                      className="w-full text-[10px] text-slate-400 file:mr-2 file:py-1 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-500 file:text-slate-950 hover:file:bg-emerald-400"
                    />
                    {warungRegForm.ktpPhoto && <p className="text-[10px] text-emerald-400 mt-1">✓ Foto KTP terpilih</p>}
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Bank / E-Wallet Pencairan Hasil Penjualan</label>
                  <select 
                    value={warungRegForm.bank}
                    onChange={(e) => setWarungRegForm({...warungRegForm, bank: e.target.value})}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                  >
                    <option value="BCA">BCA</option>
                    <option value="BJB">BJB</option>
                    <option value="BNI">BNI</option>
                    <option value="BRI">BRI</option>
                    <option value="BSI">BSI</option>
                    <option value="Mandiri">Mandiri</option>
                    <option value="DANA">DANA</option>
                    <option value="OVO">OVO</option>
                    <option value="ShopeePay">ShopeePay</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <input 
                    type="checkbox" 
                    id="warungTerms"
                    checked={warungRegForm.agreedToTerms}
                    onChange={(e) => setWarungRegForm({...warungRegForm, agreedToTerms: e.target.checked})}
                    className="rounded bg-slate-800 border-slate-700"
                    required
                  />
                  <label htmlFor="warungTerms" className="text-slate-300 text-[11px]">Saya menyetujui syarat bagi hasil 90% warung dan 10% platform WarungGo.</label>
                </div>

                <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-3 rounded-xl cursor-pointer">
                  Daftar Sekarang
                </button>
              </form>
            </div>
          </div>
        )}

        {/* 2. CONSUMER DASHBOARD */}
        {activeRole === 'consumer' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-900 p-6 rounded-3xl border border-slate-800 gap-4">
              <div className="flex items-center space-x-4">
                <img src={consumerProfile.avatar} alt="Avatar" className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-400" />
                <div>
                  <h3 className="text-lg font-black text-white">{consumerProfile.name}</h3>
                  <p className="text-xs text-slate-400">📍 {consumerProfile.addrStreet} No.{consumerProfile.addrNo}, {consumerProfile.addrKec} ({consumerProfile.landmark})</p>
                </div>
              </div>

              <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800 w-full sm:w-auto">
                <button 
                  onClick={() => setActiveTab('explore')}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${activeTab === 'explore' ? 'bg-amber-400 text-slate-950' : 'text-slate-300'}`}
                >
                  🍔 Marketplace
                </button>
                <button 
                  onClick={() => setActiveTab('cart')}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer relative ${activeTab === 'cart' ? 'bg-amber-400 text-slate-950' : 'text-slate-300'}`}
                >
                  🛒 Keranjang ({cart.reduce((a, c) => a + c.qty, 0)})
                </button>
                <button 
                  onClick={() => setActiveTab('orders')}
                  className={`flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${activeTab === 'orders' ? 'bg-amber-400 text-slate-950' : 'text-slate-300'}`}
                >
                  📦 Pesanan Saya
                </button>
              </div>
            </div>

            {activeTab === 'explore' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="text" 
                    placeholder="Cari makanan, sate, beras, atau warung di Pameungpeuk..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-xs text-white font-medium focus:outline-none focus:border-amber-400"
                  />
                  <div className="flex gap-2">
                    {['all', 'Kuliner', 'Sembako', 'Elektronik'].map((cat) => (
                      <button 
                        key={cat}
                        onClick={() => setSelectedStoreFilter(cat)}
                        className={`px-4 py-3 rounded-2xl text-xs font-black transition-all cursor-pointer ${selectedStoreFilter === cat ? 'bg-amber-400 text-slate-950' : 'bg-slate-900 text-slate-300 border border-slate-800'}`}
                      >
                        {cat === 'all' ? 'Semua' : cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {stores
                    .filter(s => selectedStoreFilter === 'all' || s.category === selectedStoreFilter)
                    .map((store) => (
                      <div key={store.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl">
                        <div className="flex items-center gap-4">
                          <img src={store.image} alt={store.name} className="w-16 h-16 rounded-2xl object-cover" />
                          <div>
                            <span className="text-[10px] bg-amber-400/10 text-amber-400 px-2 py-0.5 rounded-full font-bold">{store.category}</span>
                            <h4 className="font-black text-white text-base mt-1">{store.name}</h4>
                            <p className="text-xs text-slate-400">📍 {store.address} • ⭐ {store.rating}</p>
                          </div>
                        </div>

                        <div className="space-y-3 pt-3 border-t border-slate-800">
                          {store.products.map((prod) => (
                            <div key={prod.id} className="flex justify-between items-center bg-slate-950 p-3 rounded-2xl border border-slate-800/80">
                              <div className="flex items-center gap-3">
                                <img src={prod.image} alt={prod.name} className="w-12 h-12 rounded-xl object-cover" />
                                <div>
                                  <h5 className="font-bold text-white text-xs">{prod.name}</h5>
                                  <p className="text-[10px] text-slate-400">{prod.desc}</p>
                                  <span className="text-xs font-black text-amber-400 mt-1 block">Rp {prod.price.toLocaleString('id-ID')}</span>
                                </div>
                              </div>
                              <button 
                                onClick={() => {
                                  const existing = cart.find(item => item.productId === prod.id);
                                  if (existing) {
                                    setCart(cart.map(item => item.productId === prod.id ? { ...item, qty: item.qty + 1 } : item));
                                  } else {
                                    setCart([...cart, { productId: prod.id, storeId: store.id, storeName: store.name, name: prod.name, price: prod.price, qty: 1 }]);
                                  }
                                  showNotification(`🛒 Ditambahkan ke keranjang: ${prod.name}`);
                                }}
                                className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-3.5 py-2 rounded-xl text-xs font-black cursor-pointer shadow-md"
                              >
                                + Tambah
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'cart' && (
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl mx-auto space-y-6">
                <h3 className="text-lg font-black text-white">Keranjang Belanja Anda</h3>

                {cart.length === 0 ? (
                  <p className="text-xs text-slate-400 py-8 text-center">Keranjang masih kosong. Yuk pilih jajanan atau sembako di Marketplace!</p>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs">
                        <div>
                          <h4 className="font-bold text-white">{item.name}</h4>
                          <span className="text-slate-400">{item.storeName} • Rp {item.price.toLocaleString('id-ID')} x {item.qty}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-black text-amber-400">Rp {(item.price * item.qty).toLocaleString('id-ID')}</span>
                          <button 
                            onClick={() => setCart(cart.filter((_, i) => i !== idx))}
                            className="text-rose-400 font-bold hover:text-rose-300"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="pt-4 border-t border-slate-800 space-y-2">
                      <label className="font-bold text-slate-300 block text-xs">Pilih Kurir Pilihan (100% Ongkir untuk Kurir)</label>
                      <select 
                        value={selectedCourierId}
                        onChange={(e) => setSelectedCourierId(Number(e.target.value))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-medium"
                      >
                        {couriers.map(c => (
                          <option key={c.id} value={c.id}>{c.name} ({c.vehicle} - {c.plateNo})</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2 pt-2">
                      <label className="font-bold text-slate-300 block text-xs">Metode Pembayaran</label>
                      <div className="grid grid-cols-3 gap-2">
                        {['QRIS', 'Transfer Bank / E-Wallet', 'COD (Tunai)'].map(m => (
                          <button 
                            key={m}
                            onClick={() => setCheckoutData({...checkoutData, paymentMethod: m})}
                            className={`p-3 rounded-xl text-xs font-bold border transition-all cursor-pointer ${checkoutData.paymentMethod === m ? 'bg-amber-400 text-slate-950 border-amber-400' : 'bg-slate-950 text-slate-300 border-slate-800'}`}
                          >
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>

                    {(checkoutData.paymentMethod === 'QRIS' || checkoutData.paymentMethod === 'Transfer Bank / E-Wallet') && (
                      <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                        <label className="font-bold text-slate-300 block text-xs">Pilih Jenis Bank / E-Wallet Tujuan (No. Rek: 081321312304)</label>
                        <select 
                          value={checkoutData.selectedBank}
                          onChange={(e) => setCheckoutData({...checkoutData, selectedBank: e.target.value})}
                          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white font-medium"
                        >
                          {adminBanks.map((b) => (
                            <option key={b.id} value={b.name}>
                              {b.name} (No: {b.accNo} - A/N {b.holder})
                            </option>
                          ))}
                        </select>

                        {checkoutData.paymentMethod === 'QRIS' && (
                          <div className="text-center pt-2 space-y-2">
                            <p className="text-[10px] text-amber-400">Scan QRIS di bawah ini atau upload bukti transfer:</p>
                            <img src={adminBank.qrisImage} alt="QRIS Official" className="w-40 h-40 mx-auto rounded-xl border border-slate-700 bg-white p-2" />
                          </div>
                        )}

                        <div>
                          <label className="font-bold text-slate-300 block text-xs mb-1">Upload Bukti Foto Transfer / QRIS</label>
                          <input 
                            type="text" 
                            placeholder="Link Foto Bukti Transfer (Contoh: https://imgur.com/bukti.jpg)"
                            value={checkoutData.paymentProof}
                            onChange={(e) => setCheckoutData({...checkoutData, paymentProof: e.target.value})}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                          />
                        </div>
                      </div>
                    )}

                    <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
                      <div className="flex justify-between text-slate-400">
                        <span>Subtotal Barang:</span>
                        <span>Rp {cart.reduce((a, c) => a + (c.price * c.qty), 0).toLocaleString('id-ID')}</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Ongkos Kirim Kurir:</span>
                        <span>Rp 8.000</span>
                      </div>
                      <div className="flex justify-between font-black text-white text-sm pt-2 border-t border-slate-800">
                        <span>Total Pembayaran:</span>
                        <span className="text-amber-400">Rp {(cart.reduce((a, c) => a + (c.price * c.qty), 0) + 8000).toLocaleString('id-ID')}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        const subtotal = cart.reduce((a, c) => a + (c.price * c.qty), 0);
                        const total = subtotal + 8000;
                        const assignedCourier = couriers.find(c => c.id === selectedCourierId) || couriers[0];
                        const payMethodLabel = `${checkoutData.paymentMethod} (${checkoutData.selectedBank} - 081321312304)`;
                        
                        const newOrder = {
                          id: `WG-${Math.floor(1000 + Math.random() * 9000)}`,
                          storeId: cart[0].storeId,
                          storeName: cart[0].storeName,
                          customerName: consumerProfile.name,
                          items: [...cart],
                          total,
                          subtotal,
                          ongkir: 8000,
                          courierId: assignedCourier.id,
                          courierName: assignedCourier.name,
                          paymentMethod: payMethodLabel,
                          paymentStatus: checkoutData.paymentMethod === 'COD (Tunai)' ? 'COD Belum Lunas' : 'Menunggu Verifikasi Pembayaran Admin',
                          status: checkoutData.paymentMethod === 'COD (Tunai)' ? 'Sedang Diantar oleh Kurir' : 'Menunggu Verifikasi Pembayaran Admin',
                          paymentProof: checkoutData.paymentProof || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=300',
                          timestamp: '2026-11-01 ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
                        };
                        setOrders([newOrder, ...orders]);
                        setLedgerEntries([
                          {
                            id: Date.now(),
                            date: newOrder.timestamp,
                            desc: `Pesanan ${newOrder.id} (${newOrder.storeName})`,
                            paymentAccount: `${checkoutData.selectedBank} (No. Rek: 081321312304)`,
                            warungCut: subtotal * 0.9,
                            platformCut: subtotal * 0.1,
                            courierFee: 8000,
                            total
                          },
                          ...ledgerEntries
                        ]);
                        setAdminTotalProfit(prev => prev + (subtotal * 0.1));
                        setCart([]);
                        setActiveTab('orders');
                        showNotification('🎉 Pesanan berhasil dibuat! Silakan cek status di tab Pesanan Saya.');
                      }}
                      className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black py-3.5 rounded-xl text-xs cursor-pointer uppercase tracking-wider"
                    >
                      Buat Pesanan Sekarang →
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'orders' && (
              <div className="space-y-4 max-w-2xl mx-auto">
                <h3 className="text-lg font-black text-white">Daftar Pesanan & Tracking</h3>
                {orders.map(ord => {
                  const isVerified = ord.status !== 'Menunggu Verifikasi Pembayaran Admin' && ord.status !== 'Menunggu Konfirmasi Warung';
                  return (
                    <div key={ord.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-xl text-xs">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-mono font-black text-amber-400">{ord.id}</span>
                          <h4 className="font-bold text-white text-sm mt-0.5">{ord.storeName}</h4>
                        </div>
                        <span className="bg-amber-400/10 text-amber-400 px-3 py-1 rounded-full font-bold">{ord.status}</span>
                      </div>

                      <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                        <p className="text-slate-300 font-bold">Kurir Pengantar: <span className="text-cyan-400">{ord.courierName}</span></p>
                        <p className="text-slate-300 font-bold">Metode Bayar: <span className="text-amber-400">{ord.paymentMethod}</span></p>
                        <p className="text-slate-300 font-bold">Status Pembayaran: <span className="text-emerald-400">{ord.paymentStatus}</span></p>
                        <p className="text-slate-400 font-mono text-[10px]">Waktu Pemesanan: {ord.timestamp}</p>
                      </div>

                      <div className="flex gap-2 items-center">
                        <a 
                          href={`https://wa.me/6281321312304?text=Halo%20Kurir%20${ord.courierName},%20saya%20pesanan%20${ord.id}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-400 hover:text-slate-950 py-2.5 rounded-xl font-bold text-center transition-all"
                        >
                          💬 Chat Kurir via WhatsApp
                        </a>

                        <button 
                          disabled={isVerified}
                          onClick={() => {
                            if (isVerified) return;
                            setOrders(orders.map(o => o.id === ord.id ? { ...o, status: 'Dibatalkan Konsumen' } : o));
                            showNotification(`❌ Pesanan ${ord.id} berhasil dibatalkan.`);
                          }}
                          className={`px-4 py-2.5 rounded-xl font-bold transition-all ${
                            isVerified 
                              ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                              : 'bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white cursor-pointer'
                          }`}
                          title={isVerified ? 'Pesanan sudah diverifikasi / diproses, tidak dapat dibatalkan' : 'Batalkan pesanan (Belum direspon > 1 jam)'}
                        >
                          {isVerified ? '🔒 Tidak Dapat Batal' : '❌ Batalkan Pesanan'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* 3. WARUNG DASHBOARD */}
        {activeRole === 'warung' && (
          <div className="space-y-6">
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex justify-between items-center">
              <div>
                <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold">Mitra Warung Aktif</span>
                <h3 className="text-xl font-black text-white mt-1">Dashboard Warung / Toko</h3>
              </div>
            </div>

            {/* Total Profit Warung */}
            <div className="bg-gradient-to-r from-emerald-950 to-slate-900 p-6 rounded-3xl border border-emerald-500/30 flex justify-between items-center shadow-xl">
              <div>
                <p className="text-xs text-emerald-400 font-bold uppercase tracking-wider">Total Keuntungan & Saldo Bersih Warung</p>
                <h2 className="text-3xl font-black text-white mt-1">Rp {stores[0]?.earnings?.toLocaleString('id-ID') || '45.000'}</h2>
                <p className="text-[10px] text-slate-400 mt-1">Hak pendapatan 90% dari setiap pesanan sukses.</p>
              </div>
              <button 
                onClick={() => showNotification('💸 Pengajuan Tarik Saldo berhasil dikirim ke Admin!')}
                className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 px-5 py-3 rounded-2xl font-black text-xs cursor-pointer shadow-lg"
              >
                Tarik Saldo
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h4 className="font-black text-white text-sm">Pesanan Masuk (Order Fulfillment)</h4>
                {orders.map(ord => (
                  <div key={ord.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="font-mono font-bold text-amber-400">{ord.id}</span>
                      <span className="text-emerald-400 font-bold">Rp {ord.total.toLocaleString('id-ID')}</span>
                    </div>
                    <p className="text-slate-300">Pembeli: <strong>{ord.customerName}</strong></p>
                    <div className="flex gap-2 pt-2">
                      <button 
                        onClick={() => {
                          setOrders(orders.map(o => o.id === ord.id ? { ...o, status: 'Sedang Disiapkan Warung' } : o));
                          showNotification(`✅ Pesanan ${ord.id} diterima & sedang disiapkan!`);
                        }}
                        className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2 rounded-xl font-black cursor-pointer"
                      >
                        Terima & Proses Pesanan
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 4. COURIER DASHBOARD */}
        {activeRole === 'courier' && (
          <div className="space-y-6">
            <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 flex justify-between items-center">
              <div>
                <span className="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-xs font-bold">Kurir Partner Aktif</span>
                <h3 className="text-xl font-black text-white mt-1">Dashboard Kurir (100% Hak Ongkir)</h3>
              </div>
            </div>

            {/* Total Profit Kurir */}
            <div className="bg-gradient-to-r from-cyan-950 to-slate-900 p-6 rounded-3xl border border-cyan-500/30 flex justify-between items-center shadow-xl">
              <div>
                <p className="text-xs text-cyan-400 font-bold uppercase tracking-wider">Total Keuntungan & Saldo Ongkir Kurir</p>
                <h2 className="text-3xl font-black text-white mt-1">Rp {couriers[0]?.earnings?.toLocaleString('id-ID') || '144.000'}</h2>
                <p className="text-[10px] text-slate-400 mt-1">100% biaya pengiriman menjadi hak penuh kurir.</p>
              </div>
              <button 
                onClick={() => showNotification('💸 Penarikan saldo ongkir berhasil diproses!')}
                className="bg-cyan-400 hover:bg-cyan-300 text-slate-950 px-5 py-3 rounded-2xl font-black text-xs cursor-pointer shadow-lg"
              >
                Tarik Saldo Ongkir
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-900 p-6 rounded-3xl border border-slate-800 space-y-4">
                <h4 className="font-black text-white text-sm">Tugas Pengantaran Aktif</h4>
                {orders.map(ord => (
                  <div key={ord.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="font-mono font-bold text-amber-400">{ord.id} ({ord.storeName})</span>
                      <span className="text-cyan-400 font-bold">Ongkir: Rp {ord.ongkir.toLocaleString('id-ID')}</span>
                    </div>
                    <p className="text-slate-300">Status: {ord.status}</p>
                    <button 
                      onClick={() => {
                        setOrders(orders.map(o => o.id === ord.id ? { ...o, status: 'Pesanan Selesai & Diantar' } : o));
                        showNotification(`✅ Pengantaran ${ord.id} selesai! Ongkir 100% masuk saldo.`);
                      }}
                      className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2 rounded-xl font-black cursor-pointer w-full"
                    >
                      Selesaikan Pengantaran
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. ADMIN PORTAL */}
        {activeRole === 'admin' && (
          <div className="space-y-6">
            
            {!adminVerified ? (
              <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl max-w-md mx-auto space-y-6 shadow-2xl">
                <div className="text-center space-y-2">
                  <span className="text-3xl">🔐</span>
                  <h3 className="text-xl font-black text-white">Keamanan Portal Admin</h3>
                  <p className="text-xs text-slate-400">Masukkan 6-Digit PIN Admin untuk melanjutkan verifikasi WhatsApp ({adminPhone}).</p>
                </div>

                {adminStep === 'pin' ? (
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (adminPinInput === '123456') {
                      setAdminStep('verification');
                      showNotification('📲 PIN benar! Lanjutkan verifikasi WhatsApp admin.');
                    } else {
                      showNotification('❌ PIN Admin salah! (Coba: 123456)');
                    }
                  }} className="space-y-4 text-xs">
                    <input 
                      type="password" 
                      placeholder="••••••"
                      maxLength="6"
                      value={adminPinInput}
                      onChange={(e) => setAdminPinInput(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-4 py-3 text-center text-xl tracking-widest text-white font-black"
                      required
                    />
                    <button type="submit" className="w-full bg-amber-400 text-slate-950 py-3 rounded-2xl font-black cursor-pointer">
                      Verifikasi 6-Digit PIN →
                    </button>
                  </form>
                ) : (
                  <div className="space-y-4 text-xs text-center">
                    <p className="text-slate-300">Kode OTP verifikasi telah dikirim ke WhatsApp admin: <strong className="text-amber-400">{adminPhone}</strong></p>
                    <button 
                      onClick={() => {
                        setAdminVerified(true);
                        showNotification('🔓 Akses Admin Diberikan!');
                      }}
                      className="w-full bg-emerald-500 text-slate-950 py-3 rounded-2xl font-black cursor-pointer"
                    >
                      Konfirmasi Verifikasi WhatsApp (Lanjut)
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* Admin Subtabs */}
                <div className="flex flex-wrap bg-slate-900 p-2 rounded-2xl border border-slate-800 gap-2">
                  {[
                    { id: 'ledger', label: 'Buku Besar & Keuangan' },
                    { id: 'commission', label: '⚙️ Bagi Hasil (%)' },
                    { id: 'evaluation', label: '🚫 Evaluasi Akun' },
                    { id: 'verification', label: '✅ Verifikasi Mitra' },
                    { id: 'bankaccounts', label: '🏦 Kelola Rekening & E-Wallet' },
                    { id: 'logs', label: '📜 Log Aktivitas' },
                    { id: 'broadcast', label: '📢 Broadcast Info' },
                    { id: 'profile', label: '⚙️ Profil Admin' }
                  ].map(tab => (
                    <button 
                      key={tab.id}
                      onClick={() => setAdminSubTab(tab.id)}
                      className={`py-3 px-4 rounded-xl text-xs font-black transition-all cursor-pointer ${adminSubTab === tab.id ? 'bg-amber-400 text-slate-950' : 'text-slate-300 hover:bg-slate-800'}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* TOTAL PROFIT DASHBOARD CARD FOR ADMIN */}
                <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-indigo-950 p-6 rounded-3xl border border-amber-500/30 flex justify-between items-center shadow-xl">
                  <div>
                    <span className="text-[10px] bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full font-black uppercase tracking-wider">Dashboard Keuntungan Platform</span>
                    <h3 className="text-3xl font-black text-white mt-2">Rp {adminTotalProfit.toLocaleString('id-ID')}</h3>
                    <p className="text-xs text-slate-300 mt-1">Total komisi 10% dari seluruh transaksi sukses di WarungGo Pameungpeuk.</p>
                  </div>
                </div>

                {/* SUBTAB: LEDGER / BUKU BESAR */}
                {adminSubTab === 'ledger' && (
                  <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-black text-white">Buku Besar Keuangan & Rekening Pembayaran Konsumen</h3>
                      <button 
                        onClick={handlePrintLedger}
                        className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2 rounded-xl text-xs font-black cursor-pointer shadow-lg"
                      >
                        🖨️ Cetak PDF & Print Buku Besar
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-slate-300">
                        <thead className="bg-slate-950 text-amber-400 font-bold border-b border-slate-800">
                          <tr>
                            <th className="p-3">Waktu & Tanggal</th>
                            <th className="p-3">Deskripsi Transaksi</th>
                            <th className="p-3">Rekening / E-Wallet Pembayaran</th>
                            <th className="p-3">Warung (90%)</th>
                            <th className="p-3">Platform (10%)</th>
                            <th className="p-3">Kurir (100% Ongkir)</th>
                            <th className="p-3">Total</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          {ledgerEntries.map(l => (
                            <tr key={l.id} className="hover:bg-slate-950/50">
                              <td className="p-3 font-mono text-amber-400">{l.date}</td>
                              <td className="p-3 font-bold text-white">{l.desc}</td>
                              <td className="p-3 font-bold text-cyan-400">{l.paymentAccount || 'BCA (081321312304)'}</td>
                              <td className="p-3">Rp {l.warungCut.toLocaleString('id-ID')}</td>
                              <td className="p-3">Rp {l.platformCut.toLocaleString('id-ID')}</td>
                              <td className="p-3">Rp {l.courierFee.toLocaleString('id-ID')}</td>
                              <td className="p-3 font-black text-emerald-400">Rp {l.total.toLocaleString('id-ID')}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* SUBTAB: COMMISSION SETTINGS */}
                {adminSubTab === 'commission' && (
                  <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 max-w-xl space-y-6">
                    <h3 className="text-lg font-black text-white">Pengaturan Persentase Bagi Hasil (%)</h3>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      showNotification('✅ Persentase bagi hasil warung dan kurir berhasil diperbarui!');
                    }} className="space-y-4 text-xs">
                      <div>
                        <label className="font-bold text-slate-300 block mb-1">Persentase Pendapatan Warung (%)</label>
                        <input type="number" defaultValue="90" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold" />
                      </div>
                      <div>
                        <label className="font-bold text-slate-300 block mb-1">Persentase Komisi Platform (%)</label>
                        <input type="number" defaultValue="10" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold" />
                      </div>
                      <div>
                        <label className="font-bold text-slate-300 block mb-1">Hak Ongkir Kurir (%)</label>
                        <input type="number" defaultValue="100" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold" />
                      </div>
                      <button type="submit" className="w-full bg-amber-400 text-slate-950 py-3 rounded-xl font-black cursor-pointer">
                        Simpan Pengaturan Bagi Hasil
                      </button>
                    </form>
                  </div>
                )}

                {/* SUBTAB: EVALUATION */}
                {adminSubTab === 'evaluation' && (
                  <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
                    <h3 className="text-lg font-black text-white">Evaluasi & Penguncian Akun (Warung Tidak Respon / Kurir Tidak Disiplin)</h3>
                    
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold text-amber-400">Daftar Mitra Warung</h4>
                      {stores.map(st => (
                        <div key={st.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-between items-center text-xs">
                          <div>
                            <h5 className="font-bold text-white text-sm">{st.name}</h5>
                            <span className="text-slate-400">Status: {st.status} • Telp: {st.phone}</span>
                          </div>
                          <button 
                            onClick={() => {
                              setStores(stores.filter(s => s.id !== st.id));
                              showNotification(`🔒 Warung ${st.name} dikunci dan disembunyikan dari konsumen!`);
                            }}
                            className="bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer"
                          >
                            🔒 Kunci & Sembunyikan Warung
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4 pt-6 border-t border-slate-800">
                      <h4 className="text-sm font-bold text-cyan-400">Daftar Kurir Partner</h4>
                      {couriers.map(cr => (
                        <div key={cr.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-between items-center text-xs">
                          <div>
                            <h5 className="font-bold text-white text-sm">{cr.name} ({cr.vehicle} - {cr.plateNo})</h5>
                            <span className="text-slate-400">Status: {cr.status}</span>
                          </div>
                          <button 
                            onClick={() => {
                              setCouriers(couriers.filter(c => c.id !== cr.id));
                              showNotification(`🔒 Kurir ${cr.name} dikunci dan dinonaktifkan!`);
                            }}
                            className="bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer"
                          >
                            🔒 Kunci & Nonaktifkan Kurir
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SUBTAB: VERIFICATION */}
                {adminSubTab === 'verification' && (
                  <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 text-xs">
                    <h3 className="text-lg font-black text-white">Verifikasi Pendaftaran Mitra Baru & Pembayaran Konsumen</h3>
                    
                    <div className="space-y-4">
                      <h4 className="font-bold text-amber-400">Verifikasi Pembayaran Konsumen (QRIS / Transfer)</h4>
                      {orders.filter(o => o.status.includes('Menunggu Verifikasi Pembayaran')).length === 0 ? (
                        <p className="text-slate-400">Tidak ada pembayaran konsumen yang menunggu verifikasi.</p>
                      ) : (
                        orders.filter(o => o.status.includes('Menunggu Verifikasi Pembayaran')).map(ord => (
                          <div key={ord.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-between items-center">
                            <div>
                              <h5 className="font-bold text-white">{ord.id} - {ord.customerName} ({ord.storeName})</h5>
                              <p className="text-slate-400 mt-0.5">Total: <strong>Rp {ord.total.toLocaleString('id-ID')}</strong> | Metode: {ord.paymentMethod}</p>
                              {ord.paymentProof && (
                                <a href={ord.paymentProof} target="_blank" rel="noreferrer" className="text-amber-400 underline mt-1 block font-bold">
                                  🔍 Lihat Bukti Foto Pembayaran / QRIS
                                </a>
                              )}
                            </div>
                            <button 
                              onClick={() => {
                                setOrders(orders.map(item => item.id === ord.id ? { ...item, status: 'Sedang Diantar oleh Kurir', paymentStatus: 'Lunas & Terverifikasi Admin' } : item));
                                showNotification(`✅ Pembayaran pesanan ${ord.id} berhasil diverifikasi!`);
                              }}
                              className="bg-emerald-500 text-slate-950 px-4 py-2 rounded-xl font-black cursor-pointer"
                            >
                              ✅ Verifikasi & Setujui
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* SUBTAB: BANK ACCOUNTS */}
                {adminSubTab === 'bankaccounts' && (
                  <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 text-xs">
                    <h3 className="text-lg font-black text-white">Kelola Daftar Rekening & E-Wallet Pembayaran Konsumen</h3>
                    <p className="text-slate-400">Daftar bank dan e-wallet di bawah ini akan otomatis muncul sebagai pilihan dropdown pada saat konsumen melakukan checkout pembayaran.</p>

                    {/* Form Tambah / Edit Rekening */}
                    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-4">
                      <h4 className="font-bold text-amber-400 text-sm">➕ Tambah Rekening / E-Wallet Baru</h4>
                      <form onSubmit={(e) => {
                        e.preventDefault();
                        if (!newBankForm.name || !newBankForm.accNo) return;
                        setAdminBanks([
                          ...adminBanks,
                          { id: Date.now(), name: newBankForm.name, accNo: newBankForm.accNo, holder: newBankForm.holder || 'PT WarungGo Pameungpeuk' }
                        ]);
                        setNewBankForm({ name: '', accNo: '081321312304', holder: 'PT WarungGo Pameungpeuk' });
                        showNotification('✅ Rekening / E-Wallet baru berhasil ditambahkan!');
                      }} className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div>
                          <label className="font-bold text-slate-300 block mb-1">Nama Bank / E-Wallet</label>
                          <input 
                            type="text" 
                            placeholder="Contoh: SeaBank / OVO"
                            value={newBankForm.name}
                            onChange={(e) => setNewBankForm({...newBankForm, name: e.target.value})}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                            required
                          />
                        </div>
                        <div>
                          <label className="font-bold text-slate-300 block mb-1">Nomor Rekening / No. HP</label>
                          <input 
                            type="text" 
                            placeholder="081321312304"
                            value={newBankForm.accNo}
                            onChange={(e) => setNewBankForm({...newBankForm, accNo: e.target.value})}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                            required
                          />
                        </div>
                        <div>
                          <label className="font-bold text-slate-300 block mb-1">Atas Nama (A/N)</label>
                          <div className="flex gap-2">
                            <input 
                              type="text" 
                              placeholder="PT WarungGo Pameungpeuk"
                              value={newBankForm.holder}
                              onChange={(e) => setNewBankForm({...newBankForm, holder: e.target.value})}
                              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-white font-medium"
                              required
                            />
                            <button type="submit" className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-4 py-2 rounded-xl font-black cursor-pointer shrink-0">
                              Tambah
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {adminBanks.map((b) => (
                        <div key={b.id} className="bg-slate-950 p-4 rounded-2xl border border-slate-800 flex justify-between items-center">
                          <div>
                            <span className="font-black text-amber-400 uppercase tracking-wider">{b.name}</span>
                            <h4 className="font-bold text-white text-sm mt-0.5">No: {b.accNo}</h4>
                            <span className="text-slate-400">A/N: {b.holder}</span>
                          </div>
                          <button 
                            onClick={() => {
                              setAdminBanks(adminBanks.filter(item => item.id !== b.id));
                              showNotification(`🗑️ Rekening ${b.name} berhasil dihapus.`);
                            }}
                            className="bg-rose-500/10 hover:bg-rose-500 text-rose-400 hover:text-white px-3 py-1.5 rounded-xl font-bold cursor-pointer"
                          >
                            Hapus
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SUBTAB: LOGS */}
                {adminSubTab === 'logs' && (
                  <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6 text-xs">
                    <h3 className="text-lg font-black text-white">Log Aktivitas Seluruh Role (Konsumen, Warung, Kurir)</h3>
                    <div className="space-y-3">
                      {activityLogs.map(log => (
                        <div key={log.id} className="flex justify-between items-center bg-slate-950 p-4 rounded-2xl border border-slate-800">
                          <div>
                            <span className="bg-amber-400 text-slate-950 font-black px-2 py-0.5 rounded mr-2">{log.role}</span>
                            <span className="text-white font-medium">{log.action}</span>
                          </div>
                          <span className="text-amber-400 font-mono font-bold">{log.timestamp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* SUBTAB: BROADCAST */}
                {adminSubTab === 'broadcast' && (
                  <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 max-w-xl space-y-6 text-xs">
                    <h3 className="text-lg font-black text-white">Kirim Informasi / Broadcast ke Semua Role</h3>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      if (!broadcastMessage) return;
                      const nowStr = '2026-11-01 ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                      setBroadcasts([{ id: Date.now(), text: broadcastMessage, timestamp: nowStr }, ...broadcasts]);
                      setBroadcastMessage('');
                      showNotification('📢 Broadcast berhasil dikirim!');
                    }} className="space-y-4">
                      <textarea 
                        rows="3"
                        placeholder="Tulis informasi atau pengumuman penting untuk warga Pameungpeuk..."
                        value={broadcastMessage}
                        onChange={(e) => setBroadcastMessage(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white font-medium"
                        required
                      />
                      <button type="submit" className="w-full bg-amber-400 text-slate-950 py-3 rounded-xl font-black cursor-pointer">
                        Kirim Broadcast Sekarang
                      </button>
                    </form>
                  </div>
                )}

                {/* SUBTAB: ADMIN PROFILE */}
                {adminSubTab === 'profile' && (
                  <div className="bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-800 max-w-xl space-y-6 text-xs">
                    <h3 className="text-lg font-black text-white">Edit Profil Admin, WhatsApp, Rekening & QRIS</h3>
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      showNotification('✅ Profil admin berhasil diperbarui!');
                    }} className="space-y-4">
                      <div>
                        <label className="font-bold text-slate-300 block mb-1">Nomor WhatsApp Admin</label>
                        <input 
                          type="text" 
                          value={adminPhone}
                          onChange={(e) => setAdminPhone(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white font-bold"
                          required
                        />
                      </div>
                      <button type="submit" className="w-full bg-amber-400 text-slate-950 py-3 rounded-xl font-black cursor-pointer">
                        Simpan Profil Admin
                      </button>
                    </form>
                  </div>
                )}

              </div>
            )}
          </div>
        )}

      </main>

    </div>
  );
}