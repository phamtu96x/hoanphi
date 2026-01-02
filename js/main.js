// js/main.js

// 1. HÀM RENDER GIAO DIỆN (Tự động vẽ HTML)
function renderExchanges(data) {
    const container = document.getElementById('exchange-list-container');
    if (!container) return; // Nếu không tìm thấy chỗ chứa thì dừng

    container.innerHTML = ''; // Xóa sạch nội dung cũ

    data.forEach(item => {
        // Xử lý nhãn ưu tiên (Ngôi sao)
        let priorityBadge = '';
        if (item.isPriority) {
            // Forex nền tối, Crypto nền sáng mờ
            const badgeClass = item.tag === 'forex' ? 'bg-dark bg-opacity-50' : 'bg-white bg-opacity-25';
            priorityBadge = `
                <span class="badge ${badgeClass} text-white position-absolute top-0 start-0 mt-2 ms-2 d-flex align-items-center px-2 py-1 rounded-pill shadow-sm" style="font-size: 11px; backdrop-filter: blur(2px);">
                    <i class="bi bi-star-fill text-warning me-1"></i> Ưu tiên
                </span>
            `;
        }

        // Màu chữ cho Badge loại sàn
        const badgeColorClass = item.tag === 'forex' ? 'text-dark' : '';

        // HTML chuẩn (Form nhỏ gọn, Text căn giữa trục tâm)
        const html = `
            <div class="col-lg-4 col-md-6 exchange-item-target" data-tag="${item.tag}" >
                <div class="exchange-card h-200 border rounded-4 overflow-hidden shadow-sm">
                    <div class="exchange-logo-container d-flex align-items-center justify-content-center position-relative" style="background-color: ${item.colorBg}; height: 100px;">
                        ${priorityBadge}
                        <span class="exchange-badge ${badgeColorClass}" style="font-size: 10px; padding: 4px 8px;">${item.badge}</span>
                        
                        <div class="exchange-logo-box bg-white rounded-3 p-1">
                            <a href="${item.linkReg}" target="_blank" class="d-block">
                                <img src="${item.logo}" alt="${item.name}" style="width: 40px;">
                            </a>
                        </div>
                    </div>
                    
                    <div class="p-3 bg-white text-center">
                        <h5 class="fw-bold mb-1">
                            <a href="${item.linkReg}" target="_blank" class="text-decoration-none text-dark">
                                ${item.name}
                            </a>
                        </h5>

                        <p class="text-success fw-bold small mb-3">Hoàn phí: ${item.refundRate}</p>

                        <div class="border border-dashed rounded bg-light mb-2 py-2 px-2">
                            <div class="row g-0 align-items-center">
                                <div class="col-3 text-start"><span class="text-muted small" style="font-size: 12px;">Loại:</span></div>
                                <div class="col-6 text-center"><span class="fw-bold text-dark small text-nowrap" style="font-size: 13px;">${item.type}</span></div>
                                <div class="col-3"></div>
                            </div>
                        </div>

                        <div class="border border-dashed rounded bg-light mb-3 py-2 px-2">
                            <div class="row g-0 align-items-center">
                                <div class="col-3 text-start"><span class="text-muted small" style="font-size: 12px;">CODE:</span></div>
                                <div class="col-6 text-center"><strong class="text-dark small text-nowrap" style="font-size: 13px;">${item.code}</strong></div>
                                <div class="col-3 text-end"><i class="bi bi-copy cursor-pointer text-primary" style="font-size: 13px;" onclick="copyToClipboard('${item.code}')"></i></div>
                            </div>
                        </div>

                        <a href="${item.linkReg}" target="_blank" class="btn btn-primary w-100 fw-bold btn-sm mb-2 py-2">Đăng ký ngay</a>
                        <a href="${item.linkGuide}" target="_blank" class="text-muted small text-decoration-underline" style="font-size: 12px;">Xem hướng dẫn chi tiết →</a>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += html;
    });
}

// 2. HÀM LỌC SÀN (Filter)
function appFilterExchange(category, clickedBtn) {
    // Đổi màu nút
    const allBtns = document.querySelectorAll('.filter-btn');
    allBtns.forEach(btn => {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline-secondary');
    });
    clickedBtn.classList.remove('btn-outline-secondary');
    clickedBtn.classList.add('btn-primary');

    // Lọc hiển thị
    const allItems = document.querySelectorAll('.exchange-item-target');
    allItems.forEach(item => {
        const itemTag = item.getAttribute('data-tag');
        if (category === 'all' || itemTag === category) {
            item.classList.remove('d-none');
            // Reset animation
            item.style.animation = 'none';
            item.offsetHeight; /* trigger reflow */
            item.style.animation = 'fadeIn 0.5s';
        } else {
            item.classList.add('d-none');
        }
    });
}

// 3. HÀM COPY CODE
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("Đã sao chép mã: " + text);
    }).catch(err => {
        console.error('Lỗi sao chép: ', err);
    });
}

// 4. HÀM LOAD COMPONENT (Header/Footer)
function loadComponent(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(error => console.error('Error loading component:', error));
}

// CHẠY KHI WEB TẢI XONG
document.addEventListener('DOMContentLoaded', () => {
    // Vẽ danh sách sàn nếu có dữ liệu
    if (typeof exchangesData !== 'undefined') {
        renderExchanges(exchangesData);
    }

    // Thêm keyframe animation cho bộ lọc
    const styleSheet = document.createElement("style");
    styleSheet.innerText = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(styleSheet);
});