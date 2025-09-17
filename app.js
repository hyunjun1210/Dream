document.addEventListener("DOMContentLoaded", () => {
    const box = document.getElementById('container');
    const page =  document.getElementById("page");
    const fullpage = box.querySelectorAll(".fullpage");
    const length = fullpage.length;
    let count = 0;
    let isScrolling = false;
    
    document.addEventListener("wheel", (event) => {
        if (isScrolling)
            return;
        isScrolling = true;
        if (event.deltaY > 0 && count  < length - 1)
        {
            count++;
        }
        else if (event.deltaY < 0 && count > 0)
        {
            count--;
        }
        page.textContent = `page ${count + 1}`
        scroll(count);

        setTimeout(() => {
            isScrolling = false;
        }, 800);
    });

    function scroll(currentCount)
    {
        box.style.transform = `translateY(-${currentCount * 100}vh)`;
    }
    
    scroll(0);
});