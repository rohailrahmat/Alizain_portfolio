/* ---- CURSOR ---- */
const dot=document.getElementById('curDot'),ring=document.getElementById('curRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px';});
document.addEventListener('mousedown',()=>ring.classList.add('click'));
document.addEventListener('mouseup',()=>ring.classList.remove('click'));
(function loop(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(loop);})();
document.querySelectorAll('a,button,.svc-card,.skill-pill').forEach(el=>{
  el.addEventListener('mouseenter',()=>ring.classList.add('expand'));
  el.addEventListener('mouseleave',()=>ring.classList.remove('expand'));
});
document.querySelectorAll('.work-card').forEach(el=>{
  el.addEventListener('mouseenter',()=>{ring.classList.add('project-hover');dot.style.opacity='0';});
  el.addEventListener('mouseleave',()=>{ring.classList.remove('project-hover');dot.style.opacity='1';});
});

/* ---- BUTTON HOVERS ---- */
// Removed magnetic effect for stability as per user request

/* ---- NAV SCROLL ---- */
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>nav.classList.toggle('scrolled',window.scrollY>60));

/* ---- MOBILE MENU ---- */
function openMobile(){document.getElementById('mobileMenu').classList.add('open');document.body.style.overflow='hidden';}
function closeMobile(){document.getElementById('mobileMenu').classList.remove('open');document.body.style.overflow='';}
document.getElementById('menuClose').onclick=closeMobile;

/* ---- GSAP HERO ---- */
gsap.registerPlugin(ScrollTrigger);
const tl=gsap.timeline({defaults:{ease:'power4.out'}});
tl.to('.hero-eyebrow',{opacity:1,y:0,duration:.8,delay:.3})
  .to('.hero-h1',{opacity:1,y:0,duration:1.1},'-=.5')
  .to('.hero-subtitle',{opacity:1,y:0,duration:.8},'-=.7')
  .to('.hero-desc',{opacity:1,y:0,duration:.8},'-=.5')
  .to('.hero-actions',{opacity:1,y:0,duration:.8},'-=.5')
  .to('.hero-stats-row',{opacity:1,y:0,duration:.8},'-=.4')
  .to('.hero-right',{opacity:1,x:0,duration:1.2},'-=.9');

/* ---- SCROLL REVEAL ---- */
const reveals=document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale');
const io=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target);}
  });
},{threshold:.1,rootMargin:'0px 0px -40px 0px'});
reveals.forEach(el=>io.observe(el));

/* ---- STAGGER DELAYS ---- */
document.querySelectorAll('.services-grid .svc-card').forEach((c,i)=>c.style.transitionDelay=`${i*.08}s`);
document.querySelectorAll('.work-grid .work-card').forEach((c,i)=>c.style.transitionDelay=`${i*.1}s`);
document.querySelectorAll('.skills-grid .skill-pill').forEach((c,i)=>c.style.transitionDelay=`${i*.06}s`);

/* ---- FORM ---- */
function handleForm(e){
  e.preventDefault();
  const btn=document.getElementById('submitBtn');
  const msg=document.getElementById('formSuccess');
  btn.innerHTML='<i class="fa-solid fa-check"></i> Message Sent!';
  btn.style.background='#3d9e5f';
  msg.style.display='block';
  setTimeout(()=>{
    btn.innerHTML='<i class="fa-solid fa-paper-plane"></i> Send Message';
    btn.style.background='';
    msg.style.display='none';
    e.target.reset();
  },4000);
}

/* ---- THEME LOGIC ---- */
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);
  
  // Update active button
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.classList.contains(`t-${theme}`)) btn.classList.add('active');
  });

  // Update hero glow based on theme
  const glow = document.querySelector('.hero-glow');
  if (glow) {
    let glowColor = 'rgba(0, 255, 198, 0.08)';
    if (theme === 'purple') glowColor = 'rgba(168, 85, 247, 0.08)';
    if (theme === 'minimal') glowColor = 'rgba(255, 111, 97, 0.08)';
    glow.style.background = `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`;
  }
}

// Initialize theme
const savedTheme = localStorage.getItem('portfolio-theme') || 'purple';
setTheme(savedTheme);