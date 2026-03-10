// Education page accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const courseHeaders = document.querySelectorAll('.course-header');
    
    courseHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const courseItem = this.parentElement;
            const courseContent = courseItem.querySelector('.course-content');
            const icon = this.querySelector('.course-icon');
            
            // Toggle active class
            const isActive = courseItem.classList.contains('active');
            
            // Close all other courses
            document.querySelectorAll('.course-item').forEach(item => {
                if (item !== courseItem) {
                    item.classList.remove('active');
                    item.querySelector('.course-content').style.maxHeight = null;
                }
            });
            
            // Toggle current course
            if (isActive) {
                courseItem.classList.remove('active');
                courseContent.style.maxHeight = null;
            } else {
                courseItem.classList.add('active');
                courseContent.style.maxHeight = courseContent.scrollHeight + 'px';
            }
        });
    });
});
