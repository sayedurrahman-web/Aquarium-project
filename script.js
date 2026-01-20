
document.addEventListener('click', function(e){
    if(e.target.matches('.open-modal')){
        const id = e.target.getAttribute('data-target');
        document.getElementById(id).classList.add('open');
    }
    if(e.target.matches('.close') || e.target.matches('.modal')){
        const modal = e.target.closest('.modal') || e.target;
        modal.classList.remove('open');
    }
    if(e.target.matches('.book-now')){
        window.location.href='tickets.html';
    }
    if(e.target.matches('.subscribe')){
        window.location.href='membership.html';
    }
});

// Simple gallery modal
document.querySelectorAll('.gallery-grid img, .card img').forEach(img=>{
    img.addEventListener('click', e=>{
        const src = e.target.getAttribute('data-src') || e.target.src;
        const title = e.target.getAttribute('data-title') || '';
        const desc = e.target.getAttribute('data-desc') || '';
        document.getElementById('modal-img').src = src;
        document.getElementById('modal-title').innerText = title;
        document.getElementById('modal-desc').innerText = desc;
        document.getElementById('image-modal').classList.add('open');
    });
});

// Image hover tooltip for images with data-title
(function(){
  let tooltip = null;
  function ensureTooltip(){
    if (!tooltip){
      tooltip = document.createElement('div');
      tooltip.className = 'image-tooltip';
      document.body.appendChild(tooltip);
    }
  }
  document.addEventListener('mouseover', function(e){
    const img = e.target.closest('img[data-title]');
    if (img){
      ensureTooltip();
      tooltip.textContent = img.getAttribute('data-title') || img.getAttribute('alt') || 'View';
      tooltip.classList.add('visible');
      // position immediately
      const rect = img.getBoundingClientRect();
      tooltip.style.left = (rect.left + rect.width/2) + 'px';
      tooltip.style.top = (rect.top + 6) + 'px';
      function moveHandler(ev){
        // keep tooltip near cursor but slightly above
        tooltip.style.left = (ev.clientX) + 'px';
        tooltip.style.top = (ev.clientY - 12) + 'px';
      }
      img._moveHandler = moveHandler;
      document.addEventListener('mousemove', moveHandler);
      img._leaveHandler = function(){
        if (tooltip){
          tooltip.classList.remove('visible');
        }
        document.removeEventListener('mousemove', moveHandler);
        img.removeEventListener('mouseleave', img._leaveHandler);
      };
      img.addEventListener('mouseleave', img._leaveHandler);
    }
  });
})();
