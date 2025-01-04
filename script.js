// التأكد من تحميل الصفحة بالكامل
window.onload = function () {
    const searchInput = document.getElementById('search');
    const suggestionsBox = document.getElementById("suggestions");
    const events = document.querySelectorAll(".event");

    // قائمة الإنجازات
    const data = Array.from(events).map(event => ({
        title: event.querySelector("h3").textContent,
        link: event.querySelector("a").href,
        description: event.querySelector("p").textContent,
    }));

    // تحديث الاقتراحات
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        suggestionsBox.innerHTML = ""; // تنظيف الاقتراحات

        if (query) {
            const filteredData = data.filter(item =>
                item.title.toLowerCase().includes(query) ||
                item.description.toLowerCase().includes(query)
            );

            filteredData.forEach(item => {
                const suggestion = document.createElement("div");
                suggestion.classList.add("suggestion");
                suggestion.innerHTML = `<a href="${item.link}">${item.title}</a>`;
                suggestionsBox.appendChild(suggestion);
            });

            suggestionsBox.style.display = "block";
        } else {
            suggestionsBox.style.display = "none";
        }
    });

    // إخفاء الاقتراحات عند النقر خارج مربع البحث
    document.addEventListener("click", (e) => {
        if (!searchInput.contains(e.target) && !suggestionsBox.contains(e.target)) {
            suggestionsBox.style.display = "none";
        }
    });

    // دالة للبحث في صفحات HTML أخرى باستخدام AJAX
    function searchInOtherPages(searchQuery) {
        const pages = ['years/2016.html', 'years/2017.html', 'years/2018.html']; // استبدل بالصفحات التي تحتاجها

        pages.forEach(function (page) {
            fetch(page)
                .then(response => response.text())
                .then(data => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(data, 'text/html');

                    const eventElements = doc.querySelectorAll('.event');

                    eventElements.forEach(function (event) {
                        const title = event.querySelector('h3').textContent.toLowerCase();
                        const description = event.querySelector('p').textContent.toLowerCase();

                        if (title.includes(searchQuery) || description.includes(searchQuery)) {
                            console.log('وجدت تطابق في: ' + title);
                        }
                    });
                })
                .catch(err => console.log('خطأ في تحميل الصفحة: ' + err));
        });
    }

    // البحث عند الكتابة في حقل البحث
    searchInput.addEventListener('input', function () {
        const searchQuery = this.value.toLowerCase();
        const eventElements = document.querySelectorAll('.event');

        eventElements.forEach(function (event) {
            const title = event.querySelector('h3').textContent.toLowerCase();
            const description = event.querySelector('p').textContent.toLowerCase();

            if (title.includes(searchQuery) || description.includes(searchQuery)) {
                event.style.display = 'block';
            } else {
                event.style.display = 'none';
            }
        });

        searchInOtherPages(searchQuery); // البحث في صفحات أخرى
    });

    // دالة لجلب قيمة المعامل من الـ URL
    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    // دالة لعرض نتائج البحث
    function searchResults(contentData) {
        const searchTerm = getQueryParam('query') ? getQueryParam('query').toLowerCase() : '';
        const searchResultsDiv = document.getElementById('search-results');

        if (!searchTerm) {
            searchResultsDiv.innerHTML = '';
            return;
        }

        const results = [];

        contentData.forEach(page => {
            if (page.title.toLowerCase().includes(searchTerm) || page.content.toLowerCase().includes(searchTerm)) {
                const snippet = page.content.toLowerCase().includes(searchTerm)
                    ? page.content.substring(page.content.toLowerCase().indexOf(searchTerm), 200) + "..."
                    : "";

                results.push(`
                    <div>
                        <a href="${page.url}?search=${searchTerm}">${page.title}</a>
                        <p>${snippet}</p>
                    </div>
                `);
            }
        });

        if (results.length > 0) {
            searchResultsDiv.innerHTML = results.join('');
        } else {
            searchResultsDiv.innerHTML = '<div>لا توجد نتائج لبحثك</div>';
        }
    }

    // تحميل البيانات عند تحميل الصفحة
    fetch('../all/content.json')  // تأكد من أن المسار صحيح
        .then(response => response.json())
        .then(data => searchResults(data))
        .catch(error => console.error('Error loading content:', error));
};

// دالة لتوجيه المستخدم إلى صفحة البحث
function redirectToSearchPage() {
    const searchTerm = document.getElementById('search').value.trim();
    if (searchTerm === "") {
        alert("يرجى إدخال كلمة للبحث");
        return;
    }

    window.location.href = `/2030web/all/search.html?query=${searchTerm}`;
}
// حدد مربع الإدخال
const searchInput = document.getElementById('search');

// أضف مستمع لحدث "keydown"
searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") { // تحقق إذا كان المفتاح المضغوط هو Enter
        event.preventDefault(); // منع السلوك الافتراضي (مثل إرسال النموذج)
        redirectToSearchPage(); // استدعاء دالة البحث
    }
});

// دالة البحث
function redirectToSearchPage() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm === "") {
        alert("يرجى إدخال كلمة للبحث");
        return;
    }
    // توجيه المستخدم إلى صفحة البحث مع الكلمة المفتاحية
    window.location.href = "/2030web/all/search.html?query=" + searchTerm;
}


// التفاعل مع القائمة الجانبية
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

// إغلاق القائمة عند الضغط على الطبقة الشفافة
document.getElementById('overlay').addEventListener('click', function () {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
});

// التفاعل مع البرجر
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById('hamburger');
    const offScreenMenu = document.querySelector('.off-screen-menu');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const closeMenu = document.getElementById('close-menu');

    hamburger.addEventListener('click', () => {
        offScreenMenu.classList.toggle('active');
        hamburgerIcon.classList.toggle('active');
    });

    closeMenu.addEventListener('click', () => {
        offScreenMenu.classList.remove('active');
        hamburgerIcon.classList.remove('active');
    });

    document.getElementById('overlay').addEventListener('click', function () {
        offScreenMenu.classList.remove('active');
        hamburgerIcon.classList.remove('active');
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.getElementById('hamburger');
    const offScreenMenu = document.querySelector('.off-screen-menu');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const overlay = document.getElementById('overlay');
    const closeMenu = document.getElementById('close-menu');
    
    // التفاعل مع البرجر
    hamburger.addEventListener('click', () => {
        offScreenMenu.classList.toggle('active');
        hamburgerIcon.classList.toggle('active');
        overlay.classList.toggle('active');  // إضافة التأثير على الطبقة الشفافة
    });

    // التفاعل مع زر الإغلاق عند النقر
    closeMenu.addEventListener('click', () => {
        offScreenMenu.classList.remove('active');
        hamburgerIcon.classList.remove('active');
        overlay.classList.remove('active');  // إزالة التأثير على الطبقة الشفافة
    });

    // التفاعل مع النقر خارج القائمة لإغلاقها
    overlay.addEventListener('click', () => {
        offScreenMenu.classList.remove('active');
        hamburgerIcon.classList.remove('active');
        overlay.classList.remove('active');  // إزالة التأثير على الطبقة الشفافة
    });
});
// تحديد العناصر
document.addEventListener("DOMContentLoaded", function() {
    const hamburger = document.getElementById('hamburger');
    const offScreenMenu = document.querySelector('.off-screen-menu');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const closeMenu = document.getElementById('close-menu');

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
