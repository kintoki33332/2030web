document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.getElementById('hamburger');
    const offScreenMenu = document.querySelector('.off-screen-menu');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const closeMenu = document.getElementById('close-menu');
    const overlay = document.getElementById('overlay');
    const hamburgerMenu = document.querySelector('.hamburger-menu');

    // التفاعل مع البرجر عند النقر
    hamburger.addEventListener('click', () => {
        offScreenMenu.classList.toggle('active');
        hamburgerIcon.classList.toggle('active');
        overlay.classList.toggle('active'); // تفعيل الطبقة الشفافة
    });

    // التفاعل مع زر الإغلاق عند النقر
    closeMenu.addEventListener('click', () => {
        offScreenMenu.classList.remove('active');
        hamburgerIcon.classList.remove('active');
        overlay.classList.remove('active'); // إخفاء الطبقة الشفافة
    });

    // التفاعل مع النقر على الطبقة الشفافة لإغلاق القائمة
    overlay.addEventListener('click', () => {
        offScreenMenu.classList.remove('active');
        hamburgerIcon.classList.remove('active');
        overlay.classList.remove('active');
    });

    // وظيفة للتحقق من حجم الشاشة
    function checkScreenSize() {
        if (window.innerWidth <= 768) {  // إذا كانت الشاشة أصغر من أو تساوي 768px (الجوال)
            hamburgerMenu.style.display = 'flex';  // إظهار البرغر
        } else {
            hamburgerMenu.style.display = 'none';  // إخفاء البرغر
            offScreenMenu.classList.remove('active');  // التأكد من إخفاء القائمة في حال كان المستخدم على الديسكتوب
        }
    }

    // استدعاء الوظيفة عند تحميل الصفحة
    window.addEventListener('load', checkScreenSize);

    // استدعاء الوظيفة عند تغيير حجم الشاشة
    window.addEventListener('resize', checkScreenSize);
});
