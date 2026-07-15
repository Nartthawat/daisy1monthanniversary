
document.addEventListener('DOMContentLoaded', ()=>{
  const intro = document.getElementById('intro');
  const who = document.getElementById('who');
  const profileButtons = document.querySelectorAll('.profile');


  const showWho = ()=>{
    intro.style.display='none';
    who.classList.add('visible');
    who.setAttribute('aria-hidden','false');
  };


  const logo = intro.querySelector('.logo');
  let fired=false;
  logo.addEventListener('animationend', ()=>{ fired=true; setTimeout(showWho,120); });
  setTimeout(()=>{ if(!fired) showWho(); }, 2000);


  const transitionToHome = () => {

    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '0';
    

    setTimeout(() => {
      window.location.href = 'main.html';
    }, 500);
  };

  const savedProfile = localStorage.getItem('selectedProfile') || 'Daisy';
  profileButtons.forEach(btn => {
    const profileKey = btn.dataset.profile || btn.dataset.name || 'Daisy';
    if (btn.classList.contains('add')) return;
    if (profileKey === savedProfile) {
      btn.classList.add('selected');
    } else {
      btn.classList.remove('selected');
    }
  });


  profileButtons.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      if(btn.classList.contains('add')||btn.classList.contains('disabled')) return;
      const profileKey = btn.dataset.profile || btn.dataset.name || 'Daisy';
      localStorage.setItem('selectedProfile', profileKey);
      profileButtons.forEach(otherBtn => {
        otherBtn.classList.toggle('selected', otherBtn === btn);
      });
      btn.classList.add('selected');
      
      setTimeout(()=>{
        btn.classList.remove('selected');
        who.style.transform='scale(1.02)';
        setTimeout(()=> who.style.transform='scale(1)',220);
        

        transitionToHome();
        
      },420);
    });
  });
});