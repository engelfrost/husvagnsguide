(() => {
  const prefix = 'husvagnsguide:checklist:';

  function itemText(box) {
    const item = box.closest('li');
    if (!item) return '';
    return item.innerText.replace(/\s+/g, ' ').trim();
  }

  function keyFor(box, index) {
    return `${prefix}${location.pathname}:${index}:${itemText(box)}`;
  }

  function enableChecklists() {
    document.querySelectorAll('input[type="checkbox"]').forEach((box, index) => {
      const key = keyFor(box, index);
      const saved = localStorage.getItem(key);

      box.disabled = false;
      box.removeAttribute('disabled');

      if (saved !== null) box.checked = saved === 'true';

      box.addEventListener('change', () => {
        localStorage.setItem(key, String(box.checked));
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', enableChecklists);
  } else {
    enableChecklists();
  }
})();
