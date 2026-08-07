(function () {
  var API_BASE = window.BRAINLAB_API || '';

  var ARROW_SVG = '<svg class="course-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">' +
    '<path d="M6 9L12 15L18 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
    '</svg>';

  function renderCourses(courses) {
    var container = document.querySelector('.courses-list');
    if (!container || !courses.length) {
      initAccordion();
      return;
    }

    container.innerHTML = courses.map(function (course) {
      return '<div class="course-item">' +
        '<button class="course-header">' +
        '<div class="course-header-left">' +
        '<h3 class="course-title">' + course.title + '</h3>' +
        '<span class="course-level">' + (course.level || '') + '</span>' +
        '</div>' +
        '<div class="course-header-right">' +
        '<span class="course-duration">' + (course.duration || '') + '</span>' +
        ARROW_SVG +
        '</div>' +
        '</button>' +
        '<div class="course-content">' +
        '<div class="course-description">' +
        '<h4 class="course-section-title" data-i18n="edu.about">About the Course</h4>' +
        '<p class="course-text">' + (course.description || '') + '</p>' +
        '</div>' +
        '</div>' +
        '</div>';
    }).join('');

    if (window.i18n && window.i18n.apply) window.i18n.apply();
    initAccordion();
  }

  function initAccordion() {
    document.querySelectorAll('.course-header').forEach(function (header) {
      if (header._accordionBound) return;
      header._accordionBound = true;
      header.addEventListener('click', function () {
        var courseItem = this.parentElement;
        var courseContent = courseItem.querySelector('.course-content');
        var isActive = courseItem.classList.contains('active');

        document.querySelectorAll('.course-item').forEach(function (item) {
          if (item !== courseItem) {
            item.classList.remove('active');
            var c = item.querySelector('.course-content');
            if (c) c.style.maxHeight = null;
          }
        });

        if (isActive) {
          courseItem.classList.remove('active');
          courseContent.style.maxHeight = null;
        } else {
          courseItem.classList.add('active');
          courseContent.style.maxHeight = courseContent.scrollHeight + 'px';
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    fetch(API_BASE + '/api/courses')
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (Array.isArray(data) && data.length) {
          renderCourses(data);
        } else {
          initAccordion();
        }
      })
      .catch(function () { initAccordion(); });
  });
})();
