// Navbar scroll effect and active link
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar')
    const scrollIndicator = document.getElementById('scrollIndicator')
    const scrollTop = window.pageYOffset
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = (scrollTop / docHeight) * 100

    // Update scroll indicator SOLO se esiste
    if (scrollIndicator) {
        scrollIndicator.style.transform = `scaleX(${scrollPercent / 100})`
    }

    // Update navbar background
    if (scrollTop > 50) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)'
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)'
    }

    // Update active nav link
    const sections = document.querySelectorAll('section')
    const navLinks = document.querySelectorAll('.nav-link')

    let current = ''
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100
        const sectionHeight = section.clientHeight
        if (scrollTop >= sectionTop && scrollTop < sectionTop + sectionHeight) {
            current = section.getAttribute('id')
        }
    })

    navLinks.forEach((link) => {
        link.classList.remove('active')
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active')
        }
    })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute('href'))
        if (target) {
            const offsetTop = target.offsetTop - 80
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth',
            })
        }
    })
})

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
}

const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards'
        }
    })
}, observerOptions)

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function () {
    const animateElements = document.querySelectorAll(
        '.gallery-item, .team-card, .pricing-card, .contact-card, .card'
    )
    animateElements.forEach((el) => {
        el.style.opacity = '0'
        el.style.transform = 'translateY(30px)'
        observer.observe(el)
    })
})

// Mobile menu auto-close
document.querySelectorAll('.navbar-nav .nav-link').forEach((link) => {
    link.addEventListener('click', () => {
        const navbarCollapse = document.querySelector('.navbar-collapse')
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse)
            bsCollapse.hide()
        }
    })
})

// Add loading animation
window.addEventListener('load', function () {
    document.body.style.opacity = '1'
})
