(function () {
  var API_BASE = window.BRAINLAB_API || '';

  var ARROW_SVG = '<svg class="project-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">' +
    '<path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';

  function renderProjects(projects) {
    var container = document.querySelector('.projects-list');
    if (!container || !projects.length) {
      initAccordion();
      return;
    }

    container.innerHTML = projects.map(function (proj) {
      var statusClass = proj.status === 'completed' ? 'completed' : 'active';
      var statusLabel = proj.status === 'completed' ? 'Completed' : 'Active';
      var statusI18n = proj.status === 'completed' ? 'proj.status.completed' : 'proj.status.active';
      var yearRange = proj.startYear + (proj.endYear ? ' — ' + proj.endYear : '');
      var descParagraphs = (proj.description || '').split('\n\n').filter(Boolean).map(function (p) {
        return '<p class="project-text">' + p.trim() + '</p>';
      }).join('');
      var teamHtml = proj.team && proj.team.length
        ? '<div class="project-team"><h4 class="project-section-title" data-i18n="proj.lead">Project Lead</h4>' +
          '<div class="project-team-members">' +
          proj.team.map(function (m) { return '<span class="project-member">' + m + '</span>'; }).join('') +
          '</div></div>'
        : '';
      var imgHtml = proj.image
        ? '<div class="project-description-image"><img src="' + proj.image + '" alt="' + proj.title + '" class="project-img"></div>'
        : '';

      return '<div class="project-item">' +
        '<button class="project-header">' +
        '<div class="project-header-left">' +
        '<h3 class="project-title">' + proj.title + '</h3>' +
        '<span class="project-status ' + statusClass + '" data-i18n="' + statusI18n + '">' + statusLabel + '</span>' +
        '</div>' +
        '<div class="project-header-right">' +
        '<span class="project-year">' + yearRange + '</span>' +
        ARROW_SVG +
        '</div>' +
        '</button>' +
        '<div class="project-content">' +
        '<div class="project-description">' +
        imgHtml +
        '<div class="project-description-text">' +
        '<h4 class="project-section-title" data-i18n="proj.overview">Project Overview</h4>' +
        descParagraphs +
        '</div>' +
        '</div>' +
        teamHtml +
        '</div>' +
        '</div>';
    }).join('');

    if (window.i18n && window.i18n.apply) window.i18n.apply();
    initAccordion();
  }

  function initAccordion() {
    document.querySelectorAll('.project-header').forEach(function (header) {
      if (header._accordionBound) return;
      header._accordionBound = true;
      header.addEventListener('click', function () {
        var projectItem = this.parentElement;
        var projectContent = projectItem.querySelector('.project-content');
        var isActive = projectItem.classList.contains('active');

        document.querySelectorAll('.project-item').forEach(function (item) {
          if (item !== projectItem) {
            item.classList.remove('active');
            var c = item.querySelector('.project-content');
            if (c) c.style.maxHeight = null;
          }
        });

        if (isActive) {
          projectItem.classList.remove('active');
          projectContent.style.maxHeight = null;
        } else {
          projectItem.classList.add('active');
          projectContent.style.maxHeight = projectContent.scrollHeight + 'px';
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    fetch(API_BASE + '/api/projects')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (Array.isArray(data) && data.length) {
          renderProjects(data);
        } else {
          initAccordion();
        }
      })
      .catch(function () { initAccordion(); });
  });
})();
