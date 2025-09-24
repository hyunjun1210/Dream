document.addEventListener("DOMContentLoaded", () => {
    const box = document.getElementById('container');
    const fullpages = document.querySelectorAll(".fullpage");
    const pageIndicator = document.getElementById('page-indicator').querySelector('ul');
    const links = document.querySelectorAll(".list p");
    const tocContainer = document.getElementById('toc-container');
    const tocToggle = document.getElementById('toc-toggle');
    const tocLinks = document.querySelectorAll('.toc-list a');
    const tocListItems = document.querySelectorAll('.toc-list li');
    
    const pageCount = fullpages.length;
    let currentPage = 0;
    let isScrolling = false;

    // ✨ 버튼에 표시될 텍스트 배열
    const buttonTitles = [
        "목차", // 섹션 1 (Index 0)
        "목차", // 섹션 2 (Index 1)
        "팀원 소개", // 섹션 3 (Index 2)
        "창업 계획 및 창업 아이템", // 섹션 4 (Index 3)
        "재무 및 자금 계획", // 섹션 5 (Index 4)
        "미래에 대한 계획", // 섹션 6 (Index 5)
        "목차"  // 섹션 7 (Index 6)
    ];

    // Dynamically create indicator dots
    for (let i = 0; i < pageCount; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-index', i);
        pageIndicator.appendChild(dot);
    }
    const indicatorDots = pageIndicator.querySelectorAll('li');

    // Scroll event listener
    document.addEventListener("wheel", (event) => {
        if (isScrolling) return;

        let nextPageIndex = currentPage;
        if (event.deltaY > 0 && currentPage < pageCount - 1) {
            nextPageIndex++;
        } else if (event.deltaY < 0 && currentPage > 0) {
            nextPageIndex--;
        }
        
        scrollToPage(nextPageIndex);
    });

    // 목차 links click event from the second page
    links.forEach(link => {
        link.addEventListener('click', event => {
            event.preventDefault();
            const targetIndex = parseInt(link.dataset.index);
            scrollToPage(targetIndex);
        });
    });

    // Indicator dots click event
    indicatorDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const targetIndex = parseInt(dot.dataset.index);
            scrollToPage(targetIndex);
        });
    });

    // Main scroll function
    function scrollToPage(pageIndex) {
        if (isScrolling || pageIndex < 0 || pageIndex >= pageCount) return;

        isScrolling = true;
        currentPage = pageIndex;

        box.style.transform = `translateY(-${currentPage * 100}vh)`;
        updateIndicator();
        updateTocVisibility();
        updateActiveTocLink();
        updateTocButtonText(); // ✨ 목차 버튼 텍스트 업데이트 함수 호출

        setTimeout(() => {
            isScrolling = false;
        }, 650);
    }

    function updateIndicator() {
        indicatorDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentPage);
        });
    }

    // --- Table of Contents Functionality ---
    tocToggle.addEventListener('click', () => {
        tocContainer.classList.toggle('collapsed');
    });

    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetIndex = Array.from(fullpages).findIndex(page => page.id === targetId);
            if (targetIndex !== -1) {
                scrollToPage(targetIndex);
            }
        });
    });
    
    function updateTocVisibility() {
        if (currentPage >= 2 && currentPage <= 5) {
            tocContainer.classList.add('visible');
        } else {
            tocContainer.classList.remove('visible');
        }
    }

    function updateActiveTocLink() {
        tocListItems.forEach(item => item.classList.remove('active'));
        if (currentPage >= 2 && currentPage <= 5) {
            const activeLink = document.querySelector(`.toc-list a[href="#box${currentPage + 1}"]`);
            if (activeLink) {
                activeLink.parentElement.classList.add('active');
            }
        }
    }
    
    // ✨ 새로 추가된 목차 버튼 텍스트 업데이트 함수
    function updateTocButtonText() {
        // 텍스트 변경 애니메이션 (fade out -> change -> fade in)
        tocToggle.style.opacity = '0';
        setTimeout(() => {
            tocToggle.textContent = buttonTitles[currentPage];
            tocToggle.style.opacity = '1';
        }, 250); // CSS transition 시간과 맞추기
    }

    // Initialize first page
    scrollToPage(0);
});