/* ==========================================================================
   MAIN.JS - XỬ LÝ CHUNG (RENDER, MENU ACTIVE, COPY, ZALO)
   ========================================================================== */

/**
 * 1. HÀM RENDER (Hiển thị danh sách sàn)
 */
function renderExchanges(data) {
    const container = document.getElementById('exchange-grid');
    if (!container) return; // Nếu không có container (ở trang con) thì thoát

    container.innerHTML = '';
    container.className = 'row g-4';

    if (!data || data.length === 0) {
        container.innerHTML = `<div class="col-12 text-center py-5"><p class="text-muted">Không tìm thấy kết quả.</p></div>`;
        return;
    }

    let htmlContent = '';
    data.forEach(item => {
        // Logic nhãn
        let refundLabel = 'Hoàn phí:';
        if (item.tag === 'forex') refundLabel = 'Backcom:';
        if (item.tag === 'dex') refundLabel = 'Hoàn phí:';

        // Logic hướng dẫn
        const guideHtml = item.linkGuide && item.linkGuide !== '#' 
            ? `<a href="${item.linkGuide}" class="guide-link">Xem hướng dẫn chi tiết &rarr;</a>`
            : `<span class="guide-link text-muted" style="cursor:default; opacity:0.5">Đang cập nhật hướng dẫn</span>`;

        // Logic Badge
        let badgeContent = item.badge; 
        if (item.isPriority) badgeContent = `<i class="fa-solid fa-star text-warning me-1"></i> ${item.badge}`;

        // Logic Ví dụ hoàn tiền
        let exampleLine = '<div class="mb-3"></div>';
        if (item.refundRate.includes('%')) {
            const rateNum = parseInt(item.refundRate);
            if (!isNaN(rateNum)) {
                const refundAmount = Math.round(100 * (rateNum / 100));
                exampleLine = `<div class="text-center mb-3" style="font-size: 0.9rem; color: #666;">(Ví dụ: Phí 100$ sẽ được hoàn <span class="fw-bold text-success">${refundAmount}$</span>)</div>`;
            }
        }

        htmlContent += `
            <div class="col-12 col-md-6 col-lg-4">
                <div class="exchange-card h-100 d-flex flex-column">
                    <div class="exchange-logo-container">
                        <span class="exchange-badge shadow-sm">${badgeContent}</span>
                        <div class="exchange-logo-box">
                            <a href="${item.linkReg}" target="_blank"><img src="${item.logo}" alt="${item.name}"></a>
                        </div>
                    </div>
                    <div class="p-4 pt-3 flex-grow-1 d-flex flex-column">
                        <h4 class="fw-bold text-center mb-1">
                            <a href="${item.linkReg}" target="_blank" class="text-decoration-none" style="color: var(--brand-navy); transition: color 0.2s;" onmouseover="this.style.color='#F26D21'" onmouseout="this.style.color='#1D3E61'">${item.name}</a>
                        </h4>
                        <div class="text-center mb-1"><span class="refund-highlight">${refundLabel} ${item.refundRate}</span></div>
                        ${exampleLine}
                        <div class="mb-3">
                            <div class="d-flex justify-content-between align-items-center mb-1"><span class="text-muted small">${item.codeLabel}:</span></div>
                            <div class="referral-code d-flex justify-content-between align-items-center cursor-pointer" onclick="copyToClipboard('${item.code}')" title="Sao chép mã">
                                <span class="fw-bold text-orange text-truncate me-2">${item.code}</span>
                                <i class="fa-regular fa-copy text-muted"></i>
                            </div>
                        </div>
                        <div class="mt-auto pt-2 text-center">
                            <a href="${item.linkReg}" target="_blank" class="btn-register text-decoration-none">Đăng ký ngay</a>
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
        btn.classList.remove('active', 'btn-primary');
        btn.classList.add('btn-outline-secondary');
        if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(`'${tag}'`)) {
            btn.classList.add('active', 'btn-primary');
            btn.classList.remove('btn-outline-secondary');
        }
    });

    if (typeof exchangesData !== 'undefined') {
        const filtered = (tag === 'all') ? exchangesData : exchangesData.filter(item => item.tag === tag);
        renderExchanges(filtered);
    }
}

/**
 * 3. CÁC HÀM TIỆN ÍCH (COPY, ZALO)
 */
function copyToClipboard(text) {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => alert('Đã sao chép mã: ' + text)).catch(err => console.error(err));
}
function copyCode(text) { copyToClipboard(text); }

function activateZaloScript() {
    const zaloLink = document.getElementById("linkzalo");
    if (zaloLink && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        zaloLink.href = "https://zalo.me/0965657519"; 
    }
}

/**
 * 4. HÀM ĐÁNH DẤU MENU ACTIVE (QUAN TRỌNG - ĐÃ SỬA LẠI)
 * Logic: Lấy tên file cuối cùng của URL và so sánh với tên file trong href
 */
function highlightActiveMenu() {
    // Lấy tên file hiện tại trên thanh địa chỉ (VD: thong-tin.html)
    let currentFile = window.location.pathname.split("/").pop();
    
    // Nếu là trang chủ (không có tên file), gán mặc định là index.html
    if (currentFile === "" || currentFile === "/") currentFile = "index.html";

    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (!linkHref) return;

        // Lấy tên file từ link trong menu (bỏ ../ hay ./ đi)
        // VD: "../thong-tin.html" -> "thong-tin.html"
        const linkFile = linkHref.split("/").pop();

        // So sánh: Nếu trùng tên file thì thêm class active
        // Bỏ qua các link neo (#)
        if (!linkHref.startsWith("#") && currentFile === linkFile) {
            link.classList.add('active');
        }
    });
}

/**
 * 5. KHỞI CHẠY CHUNG
 */
document.addEventListener("DOMContentLoaded", function () {
    // A. Render dữ liệu (nếu ở trang chủ)
    if (typeof exchangesData !== 'undefined') {
        renderExchanges(exchangesData);
    }

    // B. Load Component Thông Minh
    const isSubPage = window.location.pathname.includes("/huong-dan/");
    const pathPrefix = isSubPage ? "../" : "";

    function loadComponent(placeholderId, fileName) {
        const placeholder = document.getElementById(placeholderId);
        if (!placeholder) return;

        fetch(pathPrefix + "components/" + fileName)
            .then(res => {
                if (!res.ok) throw new Error(`Lỗi tải: ${fileName}`);
                return res.text();
            })
            .then(data => {
                let fixedData = data;
                
                // Xử lý đường dẫn cho Trang Con
                if (isSubPage) {
                    fixedData = fixedData.replaceAll('src="images/', 'src="../images/');
                    fixedData = fixedData.replaceAll('href="/"', 'href="../index.html"');
                    fixedData = fixedData.replaceAll('href="/#', 'href="../index.html#');
                    fixedData = fixedData.replaceAll('href="css/', 'href="../css/');
                    
                    // Sửa các link menu cụ thể để nó trỏ đúng ra ngoài
                    fixedData = fixedData.replaceAll('href="index.html"', 'href="../index.html"');
                    fixedData = fixedData.replaceAll('href="thong-tin.html"', 'href="../thong-tin.html"');
                    // Thêm các trang khác nếu có (VD: lien-he.html, tin-tuc.html...)
                } else {
                    // Trang chủ: Đảm bảo link về chính nó đúng
                    fixedData = fixedData.replaceAll('href="/"', 'href="index.html"');
                }

                placeholder.innerHTML = fixedData;

                // SAU KHI LOAD HEADER -> Kích hoạt đánh dấu Menu
                if (fileName === "header.html") highlightActiveMenu();

                // SAU KHI LOAD SOCIALS -> Kích hoạt Zalo
                if (fileName === "floating-socials.html") activateZaloScript();
            })
            .catch(err => console.error(err));
    }

    loadComponent("header-placeholder", "header.html");
    loadComponent("footer-placeholder", "footer.html");
    loadComponent("floating-socials-placeholder", "floating-socials.html");
});