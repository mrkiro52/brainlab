(function () {
  var API_BASE = window.BRAINLAB_API || '';

  var CATEGORY_ORDER = ['Leadership', 'Senior Researchers', 'Researchers', 'PhD Students'];

  var CATEGORY_I18N = {
    'Leadership': 'team.category.leadership',
    'Senior Researchers': 'team.category.senior',
    'Researchers': 'team.category.researchers',
    'PhD Students': 'team.category.phd'
  };

  function renderTeam(members) {
    var section = document.querySelector('.team-section');
    if (!section || !members.length) return;

    var grouped = {};
    members.forEach(function (m) {
      var cat = m.category || 'Researchers';
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(m);
    });

    var cats = CATEGORY_ORDER.filter(function (c) { return grouped[c]; }).concat(
      Object.keys(grouped).filter(function (c) { return CATEGORY_ORDER.indexOf(c) === -1; })
    );

    var container = section.querySelector('.container');
    if (!container) return;

    container.innerHTML = cats.map(function (cat) {
      var i18nKey = CATEGORY_I18N[cat] || '';
      var membersHtml = grouped[cat].map(function (m) {
        return '<div class="team-card" data-member="' + m.id + '">' +
          '<div class="team-card-image-wrapper">' +
          '<img src="' + m.photoUrl + '" alt="' + m.name + '" class="team-card-image">' +
          '</div>' +
          '<div class="team-card-content">' +
          '<h3 class="team-card-name">' + m.name + '</h3>' +
          '<p class="team-card-position">' + m.position + '</p>' +
          '</div>' +
          '</div>';
      }).join('');

      return '<div class="team-category">' +
        '<h2 class="category-title"' + (i18nKey ? ' data-i18n="' + i18nKey + '"' : '') + '>' + cat + '</h2>' +
        '<div class="team-grid">' + membersHtml + '</div>' +
        '</div>';
    }).join('');

    if (window.i18n && window.i18n.apply) window.i18n.apply();
  }

  document.addEventListener('DOMContentLoaded', function () {
    fetch(API_BASE + '/api/team')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (Array.isArray(data) && data.length) renderTeam(data);
      })
      .catch(function () {});
  });
})();
