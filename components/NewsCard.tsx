{isAdmin && (
  <div className="absolute top-4 right-4 z-30 flex gap-2">
    <button
      onClick={(e) => { 
        e.preventDefault(); 
        navigator.clipboard.writeText(article.link);
        alert("Link copied! Paste it into featuredArticles.ts or hiddenArticles.ts");
      }}
      className="bg-amber-600 hover:bg-amber-500 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1 transition-all"
    >
      <Star className="w-3 h-3" /> Promote
    </button>
    
    <button
      onClick={(e) => { 
        e.preventDefault(); 
        navigator.clipboard.writeText(article.link);
        alert("Link copied! Paste it into hiddenArticles.ts to hide globally");
      }}
      className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded-full transition-all"
    >
      Hide
    </button>
  </div>
)}