// js/data.js

const exchangesData = [
    // --- 1. BINANCE (Đã thêm ƯU TIÊN) ---
    {
        id: "binance",
        name: "Binance",
        tag: "cex",
        isPriority: true, // <--- Đã bật ngôi sao ưu tiên
        logo: "images/binance.png", // Đã sửa đường dẫn ảnh
        colorBg: "#1e2329",
        badge: "Ưu Tiên",
        refundRate: "20%",
        type: "Tự Động Hàng Ngày",
        codeLabel: "Mã giới thiệu",
        code: "HOANPHITIS",
        linkReg: "https://www.binance.com/join?ref=HOANPHITIS",
        linkGuide: "huong-dan/binance.html" // Đã ẩn video
    },

    // --- 2. BINGX ---
    {
        id: "bingx",
        name: "BingX",
        tag: "cex",
        isPriority: true,
        logo: "images/bingx.png",
        colorBg: "#0056b3",
        badge: "CEX",
        refundRate: "50%",
        type: "Tự Động Hàng Ngày",
        codeLabel: "Mã giới thiệu",
        code: "TradingInsight",
        linkReg: "https://bingx.com/vi-vn/partner/TradingInsight",
        linkGuide: "huong-dan/bingx.html"
    },

        // --- 8. BINANCE WEB3 (Mới) ---
    {
        id: "binance-web3",
        name: "Binance Web3",
        tag: "dex", // Tag DEX để lọc
        isPriority: true, // <--- Đã bật ngôi sao ưu tiên
        logo: "images/binance.png",
        colorBg: "#1e2329",
        badge: "WEB3",
        refundRate: "30%",
        type: "Ví Web3 / DeFi",
        codeLabel: "Mã mời",
        code: "BSQ3495A",
        linkReg: "https://web3.binance.com/referral?ref=BSQ3495A",
        linkGuide: "https://web3.binance.com/referral?ref=BSQ3495A"
    },
    // --- 4. OKX ---
    {
        id: "okx",
        name: "OKX",
        tag: "cex",
        isPriority: true,
        logo: "images/okx.png",
        colorBg: "#000000",
        badge: "CEX",
        refundRate: "50%",
        type: "Tự Động Hàng Ngày",
        codeLabel: "Mã giới thiệu",
        code: "tradinginsight",
        linkReg: "https://www.okx.com/vi/join/tradinginsight",
        linkGuide: "huong-dan/okx.html"
    },






    // --- 9. OKX WEB3 (Mới) ---
    // {
    //     id: "okx-web3",
    //     name: "OKX Web3",
    //     tag: "dex",
    //     isPriority: true,
    //     logo: "images/okx_wallet.jpg",
    //     colorBg: "#000000",
    //     badge: "WEB3",
    //     refundRate: "50%",
    //     type: "Ví Web3 / DeFi",
    //     codeLabel: "Mã mời",
    //     code: "tradinginsight",
    //     linkReg: "https://www.okx.com/web3",
    //     // linkGuide: "huong-dan/okx.html"
    // },

    // --- 10. MEXC WEB3 (Mới) ---
    // {
    //     id: "mexc-web3",
    //     name: "MEXC Web3",
    //     tag: "dex",
    //     isPriority: true,
    //     logo: "images/mexc_dex.png",
    //     colorBg: "#0e8529",
    //     badge: "WEB3",
    //     refundRate: "50%",
    //     type: "Ví Web3 / DeFi",
    //     codeLabel: "Mã mời",
    //     code: "mexc-18epb",
    //     linkReg: "https://www.mexc.com/web3",
    //     // linkGuide: "huong-dan/mexc.html"
    // },

    // --- 3. BITGET ---
    {
        id: "bitget",
        name: "Bitget",
        tag: "cex",
        isPriority: false,
        logo: "images/bitget.png",
        colorBg: "#00f0ff",
        badge: "CEX",
        refundRate: "50%",
        type: "Tự Động Hàng Ngày",
        codeLabel: "Mã giới thiệu",
        code: "MR08MJ",
        linkReg: "https://partner.bitget.com/bg/MR08MJ",
        linkGuide: "huong-dan/bitget.html"
    },
    
    // --- 7. EXNESS ---
        {
        id: "exness",
        name: "Exness",
        tag: "forex",
        isPriority: true,
        logo: "images/exness.png",
        colorBg: "#FFCC00",
        badge: "Forex Top 1",
        refundRate: "100%", // Backcom
        type: "Tự Động Hàng Ngày",
        codeLabel: "Mã đối tác",
        code: "z95z0g4oje",
        linkReg: "https://one.exnessonelink.com/a/z95z0g4oje",
        linkGuide: "huong-dan/exness.html"
    },

    // --- 5. MEXC ---
    {
        id: "mexc",
        name: "MEXC",
        tag: "cex",
        isPriority: false,
        logo: "images/mexc.png",
        colorBg: "#0056b3",
        badge: "CEX",
        refundRate: "50%",
        type: "Tự Động Hàng Ngày",
        codeLabel: "Mã giới thiệu",
        code: "mexc-18epb",
        linkReg: "https://www.mexc.com/vi-VN/acquisition/custom-sign-up?shareCode=mexc-18epb",
        linkGuide: "huong-dan/mexc.html"
    },

    // --- 6. BYBIT ---
    {
        id: "bybit",
        name: "Bybit",
        tag: "cex",
        isPriority: false,
        logo: "images/bybit.png",
        colorBg: "#17181e",
        badge: "CEX",
        refundRate: "50%",
        type: "Tự Động Hàng Ngày",
        codeLabel: "Mã giới thiệu",
        code: "HOANPHITIS",
        linkReg: "https://partner.bybit.com/b/HOANPHITIS",
        linkGuide: "huong-dan/bybit.html"
    },
];