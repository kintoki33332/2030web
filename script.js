// التأكد من تحميل الصفحة بالكامل
window.onload = function() {
    const searchInput = document.getElementById('search');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchQuery = this.value.toLowerCase();
            const eventElements = document.querySelectorAll('.event');
            
            // البحث داخل الصفحة الحالية
            eventElements.forEach(function(event) {
                const title = event.querySelector('h3').textContent.toLowerCase();
                const description = event.querySelector('p').textContent.toLowerCase();
                
                if (title.includes(searchQuery) || description.includes(searchQuery)) {
                    event.style.display = 'block';
                } else {
                    event.style.display = 'none';
                }
            });
            
            // بعد البحث في الصفحة الحالية، سنبحث في صفحات أخرى باستخدام AJAX
            searchInOtherPages(searchQuery);
        });
    }
};

// دالة للبحث في صفحات HTML أخرى باستخدام AJAX
function searchInOtherPages(searchQuery) {
    // قائمة من الروابط التي تحتوي على صفحات أخرى تريد البحث فيها
    const pages = ['years/2016.html', 'years/2017.html', 'years/2018.html'];  // استبدل بالصفحات التي تحتاجها
    
    pages.forEach(function(page) {
        fetch(page)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(data, 'text/html');
                
                const eventElements = doc.querySelectorAll('.event');
                
                eventElements.forEach(function(event) {
                    const title = event.querySelector('h3').textContent.toLowerCase();
                    const description = event.querySelector('p').textContent.toLowerCase();
                    
                    if (title.includes(searchQuery) || description.includes(searchQuery)) {
                        // إذا وجد تطابق، يمكن أن تظهر أو تتم معالجته هنا
                        console.log('وجدت تطابق في: ' + title);  // أو يمكنك إضافته إلى صفحة النتائج
                    }
                });
            })
            .catch(err => console.log('خطأ في تحميل الصفحة: ' + err));
    });
}
document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
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
    function redirectToSearchPage() {
      let searchTerm = document.getElementById('search').value.trim().toLowerCase();
      if (searchTerm === "") {
          alert("يرجى إدخال كلمة للبحث");
          return;
      }
  
      // توجيه المستخدم إلى صفحة البحث مع الكلمة المفتاحية
      window.location.href = `all/search.html?query=${searchTerm}`;
  }
  
  // دالة لجلب قيمة المعامل من الـ URL
  function getQueryParam(param) {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get(param);
  }
  
  function searchResults(contentData) {
      let searchTerm = getQueryParam('query') ? getQueryParam('query').toLowerCase() : '';
      let searchResultsDiv = document.getElementById('search-results');
  
      if (!searchTerm) {
          searchResultsDiv.innerHTML = '';
          return;
      }
  
      let results = [];
  
      // البحث في البيانات
      contentData.forEach(page => {
          if (page.title.toLowerCase().includes(searchTerm) || page.content.toLowerCase().includes(searchTerm)) {
              let snippet = page.content.toLowerCase().includes(searchTerm)
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
  
  window.onload = function() {
      fetch('../all/content.json')  // تأكد من أن المسار صحيح
          .then(response => response.json())
          .then(data => searchResults(data))
          .catch(error => console.error('Error loading content:', error));
        }
      }
    );
    function redirectToSearchPage() {
      let searchTerm = document.getElementById('search').value.trim();
      if (searchTerm === "") {
          alert("يرجى إدخال كلمة للبحث");
          return;
      }
  
      // توجيه المستخدم إلى صفحة البحث مع كلمة البحث في الرابط
      window.location.href = `all/search.html?query=${searchTerm}`;
  }
  