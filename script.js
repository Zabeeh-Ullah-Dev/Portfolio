// theme toggle
  const html = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const knob = document.getElementById('knob');
  function setTheme(t){
    html.setAttribute('data-theme', t);
    knob.textContent = t === 'dark' ? '🌙' : '☀';
    localStorage.setItem('zu-theme', t);
  }
  toggle.addEventListener('click', ()=>{
    const cur = html.getAttribute('data-theme');
    setTheme(cur === 'dark' ? 'light' : 'dark');
  });
  const saved = localStorage.getItem('zu-theme');
  if(saved) setTheme(saved);

  // mobile menu
  function toggleMenu(){ document.getElementById('navMenu').classList.toggle('open'); }
  function closeMenu(){ document.getElementById('navMenu').classList.remove('open'); }

  // typed text
  const lines = ["BS CS student, 5th semester.", "Front-end + WordPress + PHP/MySQL.", "Building clean, working web experiences."];
  let li = 0, ci = 0, deleting = false;
  const typedEl = document.getElementById('typedText');
  function type(){
    const current = lines[li];
    if(!deleting){
      ci++;
      typedEl.textContent = current.slice(0, ci);
      if(ci === current.length){ deleting = true; setTimeout(type, 1400); return; }
    } else {
      ci--;
      typedEl.textContent = current.slice(0, ci);
      if(ci === 0){ deleting = false; li = (li+1) % lines.length; }
    }
    setTimeout(type, deleting ? 35 : 55);
  }
  type();

  // reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in'); });
  }, {threshold:0.15});
  revealEls.forEach(el=>io.observe(el));

  // skill bars fill on view
  const bars = document.querySelectorAll('.bar-fill');
  const barIo = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.style.width = e.target.dataset.level + '%';
      }
    });
  }, {threshold:0.4});
  bars.forEach(b=>barIo.observe(b));

  // vine draw + dots on scroll
  const vinePath = document.getElementById('vinePath');
  const len = vinePath.getTotalLength();
  vinePath.style.strokeDasharray = len;
  vinePath.style.strokeDashoffset = len;
  const dots = [document.getElementById('vd1'),document.getElementById('vd2'),document.getElementById('vd3'),document.getElementById('vd4')];
  window.addEventListener('scroll', ()=>{
    const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    const offset = len - (len * Math.min(scrollPercent * 1.15, 1));
    vinePath.style.strokeDashoffset = offset;
    dots.forEach((d, i)=>{
      const threshold = (i+1) * 0.18;
      d.style.opacity = scrollPercent > threshold ? 1 : 0;
    });
  });
