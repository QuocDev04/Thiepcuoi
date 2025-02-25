// Đặt ngày đích (ngày cưới)
const weddingDate = new Date('2025-03-08T00:00:00').getTime();

// Lưu giá trị trước đó để so sánh
let previousSeconds = -1;
let previousMinutes = -1;
let previousHours = -1;
let previousDays = -1;

// Cập nhật đếm ngược mỗi giây
const countdown = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    if (distance > 0) {
        // Tính toán thời gian
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Cập nhật với hiệu ứng flip nếu giá trị thay đổi
        if (seconds !== previousSeconds) {
            flipNumber('seconds', seconds);
            previousSeconds = seconds;
        }
        if (minutes !== previousMinutes) {
            flipNumber('minutes', minutes);
            previousMinutes = minutes;
        }
        if (hours !== previousHours) {
            flipNumber('hours', hours);
            previousHours = hours;
        }
        if (days !== previousDays) {
            flipNumber('days', days);
            previousDays = days;
        }
    } else {
        clearInterval(countdown);
        ['days', 'hours', 'minutes', 'seconds'].forEach(id => {
            document.getElementById(id).innerHTML = '00';
        });
    }
}, 1000);

function formatNumber(number) {
    return number < 10 ? '0' + number : number.toString();
}

function flipNumber(id, number) {
    const element = document.getElementById(id);
    const formattedNumber = formatNumber(number);

    // Tạo các phần tử cho hiệu ứng flip
    const current = element.innerHTML;
    const flipCard = document.createElement('div');
    flipCard.className = 'flip-card';
    
    const top = document.createElement('div');
    top.className = 'top';
    top.innerHTML = current;
    
    const bottom = document.createElement('div');
    bottom.className = 'bottom';
    bottom.innerHTML = formattedNumber;
    
    const flipTop = document.createElement('div');
    flipTop.className = 'flip-top';
    flipTop.innerHTML = current;
    
    const flipBottom = document.createElement('div');
    flipBottom.className = 'flip-bottom';
    flipBottom.innerHTML = formattedNumber;

    // Xóa nội dung cũ
    element.innerHTML = '';
    
    // Thêm các phần tử mới
    flipCard.appendChild(top);
    flipCard.appendChild(flipTop);
    flipCard.appendChild(flipBottom);
    flipCard.appendChild(bottom);
    element.appendChild(flipCard);

    // Kích hoạt animation
    requestAnimationFrame(() => {
        flipCard.classList.add('flip');
    });

    // Dọn dẹp sau khi animation hoàn thành
    setTimeout(() => {
        element.innerHTML = formattedNumber;
    }, 300);
}

// Thêm CSS cho hiệu ứng flip
const style = document.createElement('style');
style.textContent = `
    .countdown-item span {
        position: relative;
        display: inline-block;
        min-width: 60px;
        height: 80px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        perspective: 400px;
        overflow: hidden;
    }

    .flip-card {
        position: relative;
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
    }

    .top, .bottom, .flip-top, .flip-bottom {
        position: absolute;
        width: 100%;
        height: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2.5rem;
        font-weight: bold;
        color: white;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(5px);
    }

    .top, .flip-top {
        background: rgba(255, 255, 255, 0.15);
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        transform-origin: bottom;
    }

    .bottom, .flip-bottom {
        bottom: 0;
        background: rgba(255, 255, 255, 0.1);
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        transform-origin: top;
    }

    .flip-top {
        z-index: 2;
        transform-origin: bottom;
    }

    .flip-bottom {
        z-index: 1;
        transform-origin: top;
    }

    .flip .flip-top {
        animation: flip-top 0.3s ease-in;
        animation-fill-mode: forwards;
    }

    .flip .flip-bottom {
        animation: flip-bottom 0.3s ease-out;
        animation-fill-mode: forwards;
        animation-delay: 0.15s;
    }

    @keyframes flip-top {
        0% {
            transform: rotateX(0deg);
        }
        100% {
            transform: rotateX(-90deg);
        }
    }

    @keyframes flip-bottom {
        0% {
            transform: rotateX(90deg);
        }
        100% {
            transform: rotateX(0deg);
        }
    }

    .countdown-item {
        text-align: center;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        padding: 20px;
        border-radius: 15px;
        min-width: 120px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: transform 0.3s ease;
    }

    .countdown-item:hover {
        transform: translateY(-5px);
    }

    .countdown-item p {
        margin-top: 10px;
        color: rgba(255, 255, 255, 0.8);
        font-size: 0.9rem;
    }

    @media (max-width: 768px) {
        .countdown-item span {
            height: 60px;
            min-width: 50px;
        }

        .top, .bottom, .flip-top, .flip-bottom {
            font-size: 2rem;
        }
    }
`;
document.head.appendChild(style);

function updateCountdown() {
    const weddingDate = new Date('2025-03-08T00:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

// Cập nhật mỗi giây
setInterval(updateCountdown, 1000);
// Chạy ngay khi tải trang
updateCountdown();

// Xử lý hiệu ứng fade-in khi scroll
const observerOptions = {
    root: null,
    threshold: 0.1, // Hiệu ứng sẽ kích hoạt khi phần tử hiện 10%
    rootMargin: "0px 0px -50px 0px" // Kích hoạt sớm hơn một chút
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Ngừng theo dõi sau khi đã hiển thị
            observer.unobserve(entry.target);
        }
    });
};

// Khởi tạo Intersection Observer
const observer = new IntersectionObserver(observerCallback, observerOptions);

// Theo dõi tất cả các phần tử có class fade-in-section
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in-section');
    fadeElements.forEach(element => observer.observe(element));
});

// Fallback cho trình duyệt không hỗ trợ Intersection Observer
if (!('IntersectionObserver' in window)) {
    const fadeElements = document.querySelectorAll('.fade-in-section');
    fadeElements.forEach(element => {
        element.classList.add('is-visible');
    });
}

// Thêm hàm tạo trái tim bay
function createFloatingHeart() {
    const heart = document.createElement('i');
    heart.className = 'fas fa-heart floating-heart';
    
    // Random màu sắc
    const colors = ['color1', 'color2', 'color3'];
    heart.classList.add(colors[Math.floor(Math.random() * colors.length)]);
    
    // Random vị trí bắt đầu
    const startPosition = Math.random() * window.innerWidth;
    heart.style.left = `${startPosition}px`;
    
    // Random kích thước
    const size = Math.random() * (30 - 10) + 10;
    heart.style.fontSize = `${size}px`;
    
    // Random thời gian animation
    const animationDuration = Math.random() * (8 - 4) + 4;
    heart.style.animationDuration = `${animationDuration}s`;
    
    // Thêm vào body
    document.body.appendChild(heart);
    
    // Xóa heart sau khi animation kết thúc
    heart.addEventListener('animationend', () => {
        heart.remove();
    });
}

// Tạo trái tim mới mỗi 300ms
let heartInterval;

function startFloatingHearts() {
    // Xóa interval cũ nếu có
    if (heartInterval) {
        clearInterval(heartInterval);
    }
    // Tạo interval mới
    heartInterval = setInterval(createFloatingHeart, 300);
}

// Khởi tạo ngay khi trang load xong
window.addEventListener('load', function() {
    startFloatingHearts();
    adjustHeartDensity();
});

// Tạo một trái tim ngay lập tức để kiểm tra
createFloatingHeart();

// Tối ưu hiệu năng bằng cách tạm dừng animation khi tab không active
document.addEventListener('visibilitychange', function() {
    const hearts = document.querySelectorAll('.floating-heart');
    if (document.hidden) {
        hearts.forEach(heart => {
            heart.style.animationPlayState = 'paused';
        });
    } else {
        hearts.forEach(heart => {
            heart.style.animationPlayState = 'running';
        });
    }
});

// Điều chỉnh số lượng trái tim dựa trên kích thước màn hình
function adjustHeartDensity() {
    const width = window.innerWidth;
    if (width < 768) {
        // Giảm tần suất tạo trái tim trên mobile
        clearInterval(heartInterval);
        heartInterval = setInterval(createFloatingHeart, 500);
    } else {
        clearInterval(heartInterval);
        heartInterval = setInterval(createFloatingHeart, 300);
    }
} 