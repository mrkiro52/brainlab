// Projects page accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const projectHeaders = document.querySelectorAll('.project-header');
    
    projectHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const projectItem = this.parentElement;
            const projectContent = projectItem.querySelector('.project-content');
            const icon = this.querySelector('.project-icon');
            
            // Toggle active class
            const isActive = projectItem.classList.contains('active');
            
            // Close all other projects
            document.querySelectorAll('.project-item').forEach(item => {
                if (item !== projectItem) {
                    item.classList.remove('active');
                    item.querySelector('.project-content').style.maxHeight = null;
                }
            });
            
            // Toggle current project
            if (isActive) {
                projectItem.classList.remove('active');
                projectContent.style.maxHeight = null;
            } else {
                projectItem.classList.add('active');
                projectContent.style.maxHeight = projectContent.scrollHeight + 'px';
            }
        });
    });
});
