(function () {
  var API_BASE = window.BRAINLAB_API || '';

  function escapeHtml(str) {
    return String(str == null ? '' : str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }


  function render(items) {
    var container = document.querySelector('.research-cards');
    if (!container || !items.length) return;

    container.innerHTML = items.map(function (item) {
      return '<a href="research-area.html" class="research-card">' +
        '<div class="research-card-image-wrapper">' +
        '<img src="' + escapeHtml(item.image || '') + '" alt="' + escapeHtml(item.title) + '" class="research-card-image">' +
        '</div>' +
        '<div class="research-card-content">' +
        '<h3 class="research-card-title">' + escapeHtml(item.title) + '</h3>' +
        '<p class="research-card-text">' + escapeHtml(item.description) + '</p>' +
        '</div>' +
        '</a>';
    }).join('');
  }

  document.addEventListener('DOMContentLoaded', function () {
    fetch(API_BASE + '/api/research')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (Array.isArray(data) && data.length) render(data);
      })
      .catch(function () {});
  });
})();
