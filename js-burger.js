 document.addEventListener("DOMContentLoaded", function() {
        const hamburger = document.getElementById('hamburger');
        const offScreenMenu = document.querySelector('.off-screen-menu');
        const closeMenu = document.getElementById('close-menu');

        // تحقق من وجود العناصر أولاً
        if (hamburger && offScreenMenu && closeMenu) {
            // إضافة أحداث الهمبرغر
            hamburger.addEventListener('click', () => {
                offScreenMenu.classList.toggle('active');
            });

            closeMenu.addEventListener('click', () => {
                offScreenMenu.classList.remove('active');
            });
        }
    });
