// js/main.js

/**
 * 1. HÀM RENDER (Hiển thị danh sách sàn)
 * @param {Array} data - Mảng dữ liệu các sàn cần hiển thị
 */
/**
 /**
 * 1. HÀM RENDER (CẬP NHẬT: Tên sàn cũng là link đăng ký)
 */
// js/main.js
// js/main.js

function renderExchanges(data) {
    const container = document.getElementById('exchange-grid');
    
    if (!container) return;

    container.innerHTML = '';
    container.className = 'row g-4';

    if (data.length === 0) {
        container.innerHTML = `
            <div class="col-12 text-center py-5">
                <p class="text-muted">Không tìm thấy kết quả phù hợp.</p>
            </div>`;
        return;
    }

    let htmlContent = '';
    data.forEach(item => {
        // 1. Xác định nhãn Hoàn phí
        let refundLabel = 'Hoàn phí:';
        if (item.tag === 'forex') refundLabel = 'Backcom:';
        if (item.tag === 'dex') refundLabel = 'Tiện ích:';

        // 2. Xử lý link hướng dẫn
        const guideHtml = item.linkGuide && item.linkGuide !== '#' 
            ? `<a href="${item.linkGuide}" class="guide-link">Xem hướng dẫn chi tiết &rarr;</a>`
            : `<span class="guide-link text-muted" style="cursor:default; opacity:0.5">Đang cập nhật hướng dẫn</span>`;

        // 3. XỬ LÝ BADGE & NGÔI SAO ƯU TIÊN
        let badgeContent = item.badge; 
        if (item.isPriority) {
            badgeContent = `<i class="fa-solid fa-star text-warning me-1"></i> ${item.badge}`;
        }

        // 4. MỚI: TÍNH TOÁN DÒNG VÍ DỤ (Phí 100$ hoàn X$)
        let exampleLine = '';
        if (item.refundRate.includes('%')) {
            // Lấy số từ chuỗi "50%" -> 50
            const rateNum = parseInt(item.refundRate);
            if (!isNaN(rateNum)) {
                // Tính toán: 100 * tỷ lệ
                const refundAmount = Math.round(100 * (rateNum / 100));
                
                // Tạo dòng HTML hiển thị
                exampleLine = `
                    <div class="text-center mb-3" style="font-size: 0.9rem; color: #666;">
                        (Ví dụ: Phí 100$ sẽ được hoàn <span class="fw-bold text-success">${refundAmount}$</span>)
                    </div>
                `;
            }
        } else {
            // Nếu không phải % (ví dụ Web3 Tối ưu Gas), có thể để trống hoặc hiện text khác
            // Ở đây ta để trống để giữ giao diện sạch
            exampleLine = '<div class="mb-3"></div>';
        }

        htmlContent += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="exchange-card h-100 d-flex flex-column">
                    <div class="exchange-logo-container">
                        <span class="exchange-badge shadow-sm">${badgeContent}</span>
                        <div class="exchange-logo-box">
                            <a href="${item.linkReg}" target="_blank">
                                <img src="${item.logo}" alt="${item.name}">
                            </a>
                        </div>
                    </div>

                    <div class="p-4 pt-3 flex-grow-1 d-flex flex-column">
                        <h4 class="fw-bold text-center mb-1">
                            <a href="${item.linkReg}" target="_blank" class="text-decoration-none" style="color: var(--brand-navy); transition: color 0.2s;" onmouseover="this.style.color='#F26D21'" onmouseout="this.style.color='#1D3E61'">
                                ${item.name}
                            </a>
                        </h4>
                        
                        <div class="text-center mb-1">
                            <span class="refund-highlight">
                                ${refundLabel} ${item.refundRate}
                            </span>
                        </div>

                        ${exampleLine}
                        
                        <div class="mb-3">
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <span class="text-muted small">${item.codeLabel}:</span>
                            </div>
                            <div class="referral-code d-flex justify-content-between align-items-center cursor-pointer" onclick="copyToClipboard('${item.code}')" title="Sao chép mã">
                                <span class="fw-bold text-orange text-truncate me-2">${item.code}</span>
                                <i class="fa-regular fa-copy text-muted"></i>
                            </div>
                        </div>

                        <div class="mt-auto pt-2 text-center">
                            <a href="${item.linkReg}" target="_blank" class="btn-register text-decoration-none">
                                Đăng ký ngay
                            </a>
                            ${guideHtml}
                        </div>
                    </div>
                </div>
            </div>
        `;
    });

    container.innerHTML = htmlContent;
}

/**
 * 2. HÀM LỌC (FILTER)
 */
function filterExchange(tag) {
    const allButtons = document.querySelectorAll('.filter-btn');
    
    allButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline-secondary'); // Đổi về màu xám khi không chọn
        
        // Kiểm tra nút đang bấm
        if (btn.getAttribute('onclick').includes(`'${tag}'`)) {
            btn.classList.add('active');
            btn.classList.remove('btn-outline-secondary');
            btn.classList.add('btn-primary'); // Màu cam khi chọn
        }
    });

    if (tag === 'all') {
        renderExchanges(exchangesData);
    } else {
        const filtered = exchangesData.filter(item => item.tag === tag);
        renderExchanges(filtered);
    }
}

/**
 * 3. HÀM COPY
 */
function copyToClipboard(text) {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
        alert('Đã sao chép mã: ' + text);
    }).catch(err => {
        console.error('Không thể sao chép', err);
    });
}

// KHỞI CHẠY
document.addEventListener('DOMContentLoaded', () => {
    renderExchanges(exchangesData);
});

document.addEventListener('DOMContentLoaded', () => {
    // Tìm thẻ a có id="linkzalo"
    const zaloLink = document.getElementById("linkzalo");
    
    if (zaloLink) {
        // Kiểm tra nếu là thiết bị di động
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // Chuyển link sang deep link mở App Zalo
            // Thay SĐT của bạn vào đây nếu chưa đúng
            zaloLink.href = "https://zalo.me/0965657519"; 
        }
    }
});