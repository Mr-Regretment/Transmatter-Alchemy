
(function(){
  const here = location.pathname.split('/').pop() || 'index.html';
  const sidebar = document.getElementById('sidebar');
  let lastChapter = null;
  NAV_DATA.forEach(p=>{
    if(p.chapter !== lastChapter){
      const h = document.createElement('div');
      h.className = 'chapter-label';
      h.textContent = p.chapter.replace(/&amp;/g,'&');
      sidebar.appendChild(h);
      lastChapter = p.chapter;
    }
    const a = document.createElement('a');
    a.href = p.file;
    a.className = 'navlink' + (p.file === here ? ' active' : '');
    a.textContent = p.label;
    sidebar.appendChild(a);
  });
  const themeBtn = document.createElement('button');
  themeBtn.className = 'themebtn';
  themeBtn.textContent = 'Toggle theme';
  themeBtn.onclick = function(){
    const root = document.documentElement;
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try{ localStorage.setItem('tm-theme', next); }catch(e){}
  };
  sidebar.appendChild(themeBtn);
  try{
    const saved = localStorage.getItem('tm-theme');
    if(saved) document.documentElement.setAttribute('data-theme', saved);
  }catch(e){}

  const idx = NAV_DATA.findIndex(p=>p.file===here);
  const prev = idx>0 ? NAV_DATA[idx-1] : null;
  const next = idx<NAV_DATA.length-1 ? NAV_DATA[idx+1] : null;
  const pn = document.getElementById('pagenav');
  if(pn){
    pn.innerHTML =
      (prev ? `<a href="${prev.file}">&larr; ${prev.label}</a>` : `<span></span>`) +
      (next ? `<a href="${next.file}">${next.label} &rarr;</a>` : `<span></span>`);
  }
})();
