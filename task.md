# Tasks: Cosmic Premium Portfolio Visual & Motion Upgrades (Phases 1-12)

Nhật ký đầy đủ và chi tiết các công việc đã thực hiện qua tất cả các giai đoạn (Phases 1-12) của dự án Portfolio.

---

- `[x]` **Phase 1: Layout & Component Restructure** (Tái cấu trúc thư mục & phân tách cấu phần)
  - `[x]` Chuyển đổi và dọn dẹp cấu trúc dự án React + TS + Vite sang PhongDev architecture.
  - `[x]` Phân tách tệp dữ liệu tĩnh tại `src/data/portfolio.ts` để quản lý thông tin chủ sở hữu, dự án và học thuật.
  - `[x]` Tổ chức cấu trúc routing và phân định rõ ràng các tệp mã nguồn tiện ích (`src/components/utilities`).

- `[x]` **Phase 2: Visual Styling & Typography** (Thiết lập hệ thống font chữ & màu sắc cao cấp)
  - `[x]` Tích hợp và cấu hình font chữ từ Google Fonts: `Syne` cho tiêu đề lớn hiển thị, `Plus Jakarta Sans` cho văn bản nội dung, `Cormorant Garamond` cho kicker nghiêng mềm mại và `JetBrains Mono` cho mã nguồn/metadata.
  - `[x]` Định nghĩa hệ màu sắc trong `src/styles/tokens.css` theo quy tắc phân bổ tỷ lệ: 75% Dark base (`#0a0d16` / `#05070c`), 15% Text/Secondary, 7% Orange Accent (`#f25c05`), 3% Cyber Mint Cyan Accent (`#0df5d5`).

- `[x]` **Phase 3: GSAP Scroll Animations & Reveals** (Tích hợp hoạt ảnh và chuyển động cuộn)
  - `[x]` Cài đặt thư viện GSAP và `@gsap/react` làm engine hoạt ảnh chính.
  - `[x]` Đăng ký plugin `ScrollTrigger` để điều khiển xuất hiện chữ, trượt mask tiêu đề (`[data-reveal-title]`) và stagger xuất hiện card dự án (`[data-project-card]`).

- `[x]` **Phase 4: Verification & Build** (Đóng gói và xác minh nền tảng)
  - `[x]` Biên dịch thử nghiệm lần đầu bằng `npm run build` để tối ưu hóa bundle.
  - `[x]` Dọn dẹp các thư viện cũ không cần thiết và loại bỏ warning.

- `[x]` **Phase 5: Cosmic Cyber-Chroma Visual Direction Upgrade** (Nâng cấp lớp nền và hiệu ứng phát sáng)
  - `[x]` Tạo lớp phát sáng mờ ảo ở nền (`Background Halo Glow`) nằm phía sau mô hình 3D, sử dụng radial gradient pha trộn giữa xanh dương và cam để tăng chiều sâu thị giác.
  - `[x]` Tinh chỉnh độ tương phản của chữ trên nền tối để đảm bảo tiêu chuẩn tương phản và khả năng đọc (A11y).

- `[x]` **Phase 6: Cinematic Scrollytelling & Smooth Motion Upgrade** (Ghim màn hình & gạt lề)
  - `[x]` Cấu hình cơ chế Pinning (ghim) màn hình trên Desktop cho phần About (`#about`) và Contact (`#contact`) bằng ScrollTrigger để cuộn hết hoạt ảnh phụ trước khi cuộn tiếp.
  - `[x]` Tích hợp hoạt ảnh dịch chuyển trục X sơ khởi của mô hình 3D để gạt mô hình sang lề đối diện khi chữ xuất hiện.

- `[x]` **Phase 7: Muted Cyber-Chroma Visual Polish** (Kiểm soát độ rực neon)
  - `[x]` Giảm độ mờ đục và độ rực của các viền neon (Cyan/Orange) xuống mức dịu nhẹ (opacity 15%), tránh hiện tượng quá tải màu sắc công nghệ (cyberpunk overload).
  - `[x]` Áp dụng lớp kính mờ `backdrop-blur-md` kết hợp màu nền bề mặt mềm (`var(--surface-glass)`) cho các card dự án.

- `[x]` **Phase 8: Hero Section Color Harmony** (Đồng bộ hóa màu sắc Hero)
  - `[x]` Đồng bộ hóa chữ hiển thị đè của tên OWNER (`NGUYEN THANH PHONG`) thành dạng chữ rỗng viền mờ (text stroke) pha trộn dải màu gradient mượt.
  - `[x]` Cân chỉnh màu cam trên nút bấm hành động `HIRE ME` và dải chạy ticker chân trang (`footer`).

- `[x]` **Phase 9: Spline Model Alignment & Frame Cut** (Cân chỉnh trục quay & tỷ lệ Monitor 3D)
  - `[x]` Khắc phục lỗi lệch trục quay của cụm `Monitor` so với `Body` của mô hình 3D (đồng bộ góc xoay Y về chính xác `0.630 rad`).
  - `[x]` Phóng to tỷ lệ bao của canvas lên **20%** (`scale: 1.62`) và dịch chuyển tịnh tiến tọa độ dọc `y: 8vh` để cân đối bố cục.
  - `[x]` Tối ưu hóa hàm hover theo dõi chuột trên máy tính, giảm scrub HMR từ 1 xuống 0.5 giúp màn hình quay theo con trỏ chuột không bị trễ hay nặng nề.

- `[x]` **Phase 10: moncy.dev Premium Motion & Micro-Interactions Upgrade** (Xử lý chữ xáo trộn & hút nam châm)
  - `[x]` Viết component `<ScrambleText />` tại `src/components/utilities/ScrambleText.tsx` chạy bằng `requestAnimationFrame` tạo hoạt ảnh xáo trộn ký tự ngẫu nhiên đầy công nghệ khi hover.
  - `[x]` Thiết lập hook `useMagneticElements.ts` tại `src/hooks/useMagneticElements.ts` tạo lực hút nam châm mượt mà (bán kính 65px, lực kéo 35%, nảy bung elastic khi rời đi) cho các social icons và nút CTA.

- `[x]` **Phase 11: moncy.dev-inspired Career Timeline Section & Scroll Animations** (Xây dựng Timeline cuộn động)
  - `[x]` Mở rộng dữ liệu `EXPERIENCE` thành 3 dấu mốc lịch sử thực tế trong `src/data/portfolio.ts`.
  - `[x]` Tạo đường kẻ tiến trình trục dọc phát sáng dài ra (`scaleY` từ 0 lên 1) cùng chấm sáng tracer chạy dọc (`top` từ 0% lên 100%) đồng bộ theo ScrollTrigger cuộn chuột.
  - `[x]` Lập trình hoạt ảnh trượt reveal chữ từ 2 bên và chuyển node phát sáng cam khi chấm sáng chạy qua.

- `[x]` **Phase 12: Asymmetric Layout & Spacing Polish** (Loại bỏ lề cứng & Thiết lập 60/40 phản chiếu)
  - `[x]` Gỡ bỏ hoàn toàn giới hạn cứng `max-w-7xl` của nội dung để mở rộng bề rộng hiển thị (fluid edge-to-edge).
  - `[x]` Đồng bộ timeline di chuyển mô hình 3D theo 4 chặng zigzag: `Center (Hero) -> Right (About) -> Left (Projects) -> Right (Career) -> Center-Right (Contact)`.
  - `[x]` Định cấu trúc lại Projects: model bên Trái (40%), danh sách card xếp dọc bên Phải (55%).
  - `[x]` Định cấu trúc lại Career: timeline asymmetric dồn bên Trái (55%), model bên Phải (40%).
  - `[x]` Định cấu trúc lại Contact: Certifications và Contact dồn bên Trái (55%) chia cột dọc, model bên Phải (40%).
  - `[x]` Đóng gói thử nghiệm sản phẩm thành công bằng `npm.cmd run build` đạt chất lượng cao, không phát sinh lỗi biên dịch.

- `[x]` **Phase 13: Preloader Transition Flash Fix (FOUC)** (Sửa lỗi giật nháy màn hình preloader)
  - `[x]` Cấu hình thuộc tính CSS mặc định ẩn/thu nhỏ cho các phần tử logo, bezel, chữ và slogan của branding climax để tránh flash unstyled.
  - `[x]` Đảm bảo `.loader-kicker` và `.loader-hud-container` ẩn theo mặc định trước khi GSAP kích hoạt.
  - `[x]` Đóng gói và chạy thử nghiệm biên dịch bằng `npm.cmd run build` để kiểm tra độ tin cậy.

- `[x]` **Phase 14: Section Typography Scale Adjustment** (Điều chỉnh kích thước font chữ các Section)
  - `[x]` Cập nhật tiêu đề trong `TechnicalProfileSection.tsx` về dải kích thước `text-4xl` đến `xl:text-8xl`.
  - `[x]` Cập nhật tiêu đề trong `ProjectsSection.tsx` về dải kích thước `text-4xl` đến `xl:text-8xl`.
  - `[x]` Cập nhật tiêu đề trong `CareerSection.tsx` về dải kích thước `text-4xl` đến `xl:text-8xl`.
  - `[x]` Cập nhật tiêu đề trong `ContactSection.tsx` về dải kích thước `text-4xl` đến `xl:text-8xl`.
  - `[x]` Đóng gói và chạy thử nghiệm biên dịch bằng `npm.cmd run build` để kiểm tra độ tin cậy.

- `[x]` **Phase 15: Centered Career Timeline Upgrade (moncy.dev style)** (Nâng cấp dòng thời gian Career)
  - `[x]` Cấu hình lại Grid và ẩn tính năng lệch trái asymmetric trong `hero.css`.
  - `[x]` Chuyển đổi cấu trúc DOM trong `CareerSection.tsx` dồn H3 và Công ty sang cột trái, năm ở giữa và mô tả ở cột phải.
  - `[x]` Tháo gỡ các thẻ card bao quanh mô tả để tạo không gian mở, tối giản và phóng khoáng.
  - `[x]` Sửa lỗi hiển thị sai lệch cột/swapped columns trên Desktop bằng cách sửa lỗi cú pháp `grid-template-cols` thành `grid-template-columns` và gán thuộc tính `grid-column` cho các khối con.
  - `[x]` Đóng gói và chạy thử nghiệm biên dịch bằng `npm.cmd run build` để xác minh độ tin cậy.
