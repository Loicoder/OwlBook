// Biến để lưu danh sách sách sau khi tải về
let danhSachSach = [];

// Lấy các thẻ HTML cần dùng
const searchToggle = document.getElementById("searchToggle"); // nút bấm icon kính lúp
const searchBox = document.getElementById("searchBox"); // ô chứa input tìm kiếm
const searchInput = document.getElementById("searchInput"); // ô nhập chữ

// Tạo 1 thẻ div để hiển thị kết quả tìm kiếm, rồi bỏ vào trong searchBox
const ketQuaBox = document.createElement("div");
ketQuaBox.className = "search-results";
searchBox.appendChild(ketQuaBox);

// Tải dữ liệu sách từ file JSON
fetch("books_data.json")
  .then((response) => response.json())
  .then((data) => {
    danhSachSach = data; // lưu dữ liệu vào biến để dùng sau này
    console.log("Đã tải xong dữ liệu sách:", danhSachSach.length, "cuốn");
  })
  .catch((error) => {
    console.log("Lỗi khi tải file books_data.json:", error);
  });

// Bấm icon kính lúp thì hiện/ẩn ô tìm kiếm
searchToggle.addEventListener("click", function () {
  searchBox.classList.toggle("active"); // bật/tắt class "active"
  searchInput.focus(); // tự động click vào ô input
});

// Mỗi khi gõ chữ vào ô input thì lọc sách
searchInput.addEventListener("input", function () {
  const tuKhoa = searchInput.value.trim(); // lấy chữ vừa gõ, bỏ khoảng trắng thừa

  // Nếu không gõ gì thì xóa kết quả và dừng lại
  if (tuKhoa === "") {
    ketQuaBox.innerHTML = "";
    return;
  }

  // Lọc danh sách sách: giữ lại cuốn nào có tên, tác giả hoặc thể loại chứa từ khóa
  const ketQua = danhSachSach.filter(function (sach) {
    const tenSach = sach.title.toLowerCase();
    const tenTacGia = sach.author.toLowerCase();
    const theLoai = sach.category.toLowerCase(); // thêm dòng này để tìm theo thể loại
    const tuKhoaThuong = tuKhoa.toLowerCase();

    return (
      tenSach.includes(tuKhoaThuong) ||
      tenTacGia.includes(tuKhoaThuong) ||
      theLoai.includes(tuKhoaThuong) // thêm điều kiện tìm theo thể loại
    );
  });

  hienThiKetQua(ketQua); // gọi hàm hiển thị kết quả ra màn hình
});

// Hàm hiển thị kết quả tìm kiếm ra màn hình
function hienThiKetQua(danhSachKetQua) {
  // Xóa kết quả cũ trước khi hiển thị kết quả mới
  ketQuaBox.innerHTML = "";

  // Nếu không tìm thấy cuốn sách nào
  if (danhSachKetQua.length === 0) {
    ketQuaBox.innerHTML = "<p class='khong-co-ket-qua'>Không tìm thấy sách nào</p>";
    return;
  }

  // Duyệt qua từng cuốn sách tìm được và tạo HTML để hiển thị
  danhSachKetQua.forEach(function (sach) {
    const dong = document.createElement("div");
    dong.className = "ket-qua-item";

    dong.innerHTML = `
      <img src="${sach.cover_image}" alt="${sach.title}" width="40">
      <span>${sach.title} - ${sach.author}</span>
    `;

    ketQuaBox.appendChild(dong);
  });
}