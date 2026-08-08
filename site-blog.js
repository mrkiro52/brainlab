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


  var MONTHS_EN = ['January','February','March','April','May','June',
    'July','August','September','October','November','December'];

  function formatDate(dateStr) {
    if (!dateStr) return '';
    var d = new Date(dateStr);
    if (isNaN(d)) return dateStr;
    return MONTHS_EN[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }

  function renderBlog(posts) {
    var container = document.querySelector('.blog-grid');
    if (!container || !posts.length) return;

    container.innerHTML = posts.map(function (post) {
      return '<a href="blog-post.html" class="blog-card">' +
        (post.image ? '<div class="blog-card-image-wrapper"><img src="' + escapeHtml(post.image) + '" alt="' + escapeHtml(post.title) + '" class="blog-card-image"></div>' : '') +
        '<div class="blog-card-content">' +
        '<div class="blog-card-meta">' +
        '<span class="blog-card-date">' + escapeHtml(formatDate(post.date)) + '</span>' +
        '<span class="blog-card-category">' + escapeHtml(post.category || '') + '</span>' +
        '</div>' +
        '<h3 class="blog-card-title">' + escapeHtml(post.title) + '</h3>' +
        '<p class="blog-card-excerpt">' + escapeHtml(post.excerpt || '') + '</p>' +
        '</div>' +
        '</a>';
    }).join('');
  }

  document.addEventListener('DOMContentLoaded', function () {
    fetch(API_BASE + '/api/blog')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (Array.isArray(data) && data.length) renderBlog(data);
      })
      .catch(function () {});
  });
})();
