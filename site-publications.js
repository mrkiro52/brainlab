(function () {
  var API_BASE = window.BRAINLAB_API || '';

  function formatYear(dateStr) {
    if (!dateStr) return '';
    var d = new Date(dateStr);
    return isNaN(d.getFullYear()) ? dateStr : String(d.getFullYear());
  }

  function renderPublications(items) {
    var container = document.querySelector('.pubs-list');
    if (!container) return;

    if (!items.length) {
      container.innerHTML = '<p style="text-align:center;padding:2rem;">No publications yet.</p>';
      return;
    }

    container.innerHTML = items.map(function (item) {
      var authors = Array.isArray(item.authors) ? item.authors : (item.authors || '').split(',').map(function(a){ return a.trim(); });
      var year = formatYear(item.date);
      var authorsHtml = authors.map(function (a, i) {
        return '<span class="pub-author">' + a + '</span>' +
          (i < authors.length - 1 ? '<span class="pub-separator">·</span>' : '');
      }).join('');
      var badgesHtml = (item.venue ? '<span class="pub-badge conference">' + item.venue + '</span>' : '') +
        (item.level ? '<span class="pub-badge level-a">' + item.level + '</span>' : '');
      var tagsHtml = (item.category ? '<span class="pub-tag">' + item.category + '</span>' : '') +
        (year ? '<span class="pub-tag">' + year + '</span>' : '');

      return '<a href="publication-detail.html" class="pub-item">' +
        '<div class="pub-item-header">' +
        '<h3 class="pub-item-title">' + item.title + '</h3>' +
        '<div class="pub-badges">' + badgesHtml + '</div>' +
        '</div>' +
        '<div class="pub-item-authors">' + authorsHtml + '</div>' +
        '<p class="pub-item-description">' + item.description + '</p>' +
        '<div class="pub-item-meta">' +
        '<div class="pub-tags">' + tagsHtml + '</div>' +
        '<img src="assets/arrowtopright.svg" alt="Arrow" class="pub-arrow">' +
        '</div>' +
        '</a>';
    }).join('');
  }

  document.addEventListener('DOMContentLoaded', function () {
    fetch(API_BASE + '/api/publications')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (Array.isArray(data) && data.length) renderPublications(data);
      })
      .catch(function () {});
  });
})();
