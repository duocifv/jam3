exports.cookieConfig = {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production", // Chỉ bật trong môi trường production
    secure: false,
    sameSite: 'Lax',
    sameSite: "Strict", // Chặn CSRF
    maxAge: 7 * 24 * 60 * 60 * 1000, // Thời gian sống 7 ngày
};
