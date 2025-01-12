document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.getElementById('hamburger');
    const offScreenMenu = document.querySelector('.off-screen-menu');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const closeMenu = document.getElementById('.close-menu');

    // التفاعل مع البرجر عند النقر
    hamburger.addEventListener('click', () => {
        offScreenMenu.classList.toggle('active');
        hamburgerIcon.classList.toggle('active');
    });

    // التفاعل مع زر الإغلاق عند النقر
    closeMenu.addEventListener('click', () => {
        offScreenMenu.classList.remove('active');
        hamburgerIcon.classList.remove('active');
    });
});
 // التفاعل مع النقر خارج القائمة لإغلاقها
 document.addEventListener('click', function(event) {
    // التأكد من أن النقر لم يكن داخل القائمة أو البرجر
    if (!offScreenMenu.contains(event.target) && !hamburger.contains(event.target)) {
        offScreenMenu.classList.remove('active');
        hamburgerIcon.classList.remove('active');
        overlay.classList.remove('active'); // إزالة الطبقة الشفافة }
    }
}
)
