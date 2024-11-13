Trong phần cấu hình dự án của Cloudflare Pages, đặt Build Output Directory là src/frontend/out (hoặc là thư mục mà Next.js sẽ xuất bản sau khi build).

Cấu hình script build cho frontend trong Cloudflare như sau:
npm install && npm run build --prefix src/frontend

Cấu hình này sẽ chỉ build và deploy phần Next.js trên Cloudflare.
