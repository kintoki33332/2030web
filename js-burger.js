document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.getElementById('hamburger');
    const offScreenMenu = document.querySelector('.off-screen-menu');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const closeMenu = document.getElementById('close-menu');
    const langBtn = document.querySelector('.lang-btn'); // تحديد زر اللغة

    // التفاعل مع البرجر عند النقر
    hamburger.addEventListener('click', () => {
        offScreenMenu.classList.toggle('active');
        hamburgerIcon.classList.toggle('active');
        langBtn.style.display = offScreenMenu.classList.contains('active') ? 'block' : 'none'; // إظهار أو إخفاء زر اللغة
    });

    // التفاعل مع زر الإغلاق عند النقر
    closeMenu.addEventListener('click', () => {
        offScreenMenu.classList.remove('active');
        hamburgerIcon.classList.remove('active');
        langBtn.style.display = 'none'; // إخفاء زر اللغة عند غلق المنيو
    });

    // التفاعل مع النقر خارج القائمة لإغلاقها
    document.addEventListener('click', function(event) {
        if (!offScreenMenu.contains(event.target) && !hamburger.contains(event.target)) {
            offScreenMenu.classList.remove('active');
            hamburgerIcon.classList.remove('active');
            langBtn.style.display = 'none'; // إخفاء زر اللغة عند النقر خارج المنيو
        }
    });
});
