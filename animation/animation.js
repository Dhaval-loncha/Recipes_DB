document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.roledown');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.roleup');

    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.rleft');

    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.rright');

    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.role-up');

    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});

// document.addEventListener('skillsLoaded', function() {
//     const skillItems = document.querySelectorAll('.recipe-item');
//     let lastScrollTop = 0;

//     const observerOptions = {
//         threshold: 0.3
//     };

//     const observer = new IntersectionObserver((entries, observer) => {
//         const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
//         const isScrollingDown = currentScrollTop > lastScrollTop;
//         lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; // For Mobile or negative scrolling

//         entries.forEach((entry, index) => {
//             if (entry.isIntersecting) {
//                 const delay = isScrollingDown ? index * 500 : (skillItems.length - index - 1) * 500;
//                 setTimeout(() => {
//                     entry.target.classList.add('visible');
//                 }, delay); // Delay for each subsequent item
//             } else {
//                 entry.target.classList.remove('visible');
//             }
//         });
//     }, observerOptions);

//     skillItems.forEach(skill => {
//         observer.observe(skill);
//     });
// });