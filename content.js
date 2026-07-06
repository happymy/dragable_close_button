function createCloseButton() {
  if (document.getElementById('close-tab-button')) return;

  const button = document.createElement('div');
  button.id = 'close-tab-button';
  button.innerHTML = `
    <svg class="close-icon" viewBox="0 0 24 24">
      <path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
  `;

  document.body.appendChild(button);

  const pageKey = `close-button-position-${window.location.hostname}`;
  const savedPosition = localStorage.getItem(pageKey);
  if (savedPosition) {
    const { left, top } = JSON.parse(savedPosition);
    button.style.left = left + 'px';
    button.style.top = top + 'px';
    button.style.right = 'auto';
  }

  let isDragging = false;
  let hasDragged = false;
  let offsetX, offsetY;

  button.addEventListener('mousedown', function(e) {
    isDragging = true;
    hasDragged = false;
    offsetX = e.clientX - button.getBoundingClientRect().left;
    offsetY = e.clientY - button.getBoundingClientRect().top;
    button.style.cursor = 'grabbing';
  });

  document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    hasDragged = true;
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;
    const maxX = window.innerWidth - button.offsetWidth;
    const maxY = window.innerHeight - button.offsetHeight;
    button.style.left = Math.max(0, Math.min(x, maxX)) + 'px';
    button.style.top = Math.max(0, Math.min(y, maxY)) + 'px';
    button.style.right = 'auto';
  });

  document.addEventListener('mouseup', function() {
    isDragging = false;
    button.style.cursor = 'move';
    const pageKey = `close-button-position-${window.location.hostname}`;
    const position = {
      left: parseInt(button.style.left) || 0,
      top: parseInt(button.style.top) || 0
    };
    localStorage.setItem(pageKey, JSON.stringify(position));
  });

  button.addEventListener('click', function(e) {
    if (!hasDragged) {
      chrome.runtime.sendMessage({ action: "closeTab" });
    }
  });

  button.addEventListener('touchstart', function(e) {
    isDragging = true;
    hasDragged = false;
    const touch = e.touches[0];
    offsetX = touch.clientX - button.getBoundingClientRect().left;
    offsetY = touch.clientY - button.getBoundingClientRect().top;
  });

  document.addEventListener('touchmove', function(e) {
    if (!isDragging) return;
    hasDragged = true;
    e.preventDefault();
    const touch = e.touches[0];
    const x = touch.clientX - offsetX;
    const y = touch.clientY - offsetY;
    const maxX = window.innerWidth - button.offsetWidth;
    const maxY = window.innerHeight - button.offsetHeight;
    button.style.left = Math.max(0, Math.min(x, maxX)) + 'px';
    button.style.top = Math.max(0, Math.min(y, maxY)) + 'px';
    button.style.right = 'auto';
  }, { passive: false });

  document.addEventListener('touchend', function() {
    isDragging = false;
    const pageKey = `close-button-position-${window.location.hostname}`;
    const position = {
      left: parseInt(button.style.left) || 0,
      top: parseInt(button.style.top) || 0
    };
    localStorage.setItem(pageKey, JSON.stringify(position));
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createCloseButton);
} else {
  createCloseButton();
}

if (typeof MutationObserver !== 'undefined') {
  const observer = new MutationObserver(function() {
    if (!document.getElementById('close-tab-button')) {
      createCloseButton();
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
}
