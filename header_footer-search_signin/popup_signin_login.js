// LẤY CÁC PHẦN TỬ CẦN DÙNG
const popupOverlay = document.getElementById("popupOverlay");
const popupClose = document.getElementById("popupClose");
const openPopupBtn = document.querySelector(".popup-signin");

const tabBtns = document.querySelectorAll(".tab-btn");
const signinForm = document.getElementById("signinForm");
const signupForm = document.getElementById("signupForm");

const toggleEyeIcons = document.querySelectorAll(".toggle-eye");
const switchLinks = document.querySelectorAll(".switch-link");

// 1. MỞ POPUP KHI BẤM NÚT "JOIN"
openPopupBtn.addEventListener("click", function (e) {
  e.preventDefault(); // chặn thẻ <a> nhảy trang
  popupOverlay.classList.add("active");
});

// 2. ĐÓNG POPUP KHI BẤM NÚT X 
popupClose.addEventListener("click", function () {
  popupOverlay.classList.remove("active");
});

// 3. ĐÓNG POPUP KHI BẤM RA NGOÀI
popupOverlay.addEventListener("click", function (e) {
  // chỉ đóng nếu bấm đúng vào lớp nền, không phải bấm vào popup-box
  if (e.target === popupOverlay) {
    popupOverlay.classList.remove("active");
  }
});

// 4. CHUYỂN TAB SIGN IN / SIGN UP
tabBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const tabName = btn.getAttribute("data-tab"); // "signin" hoặc "signup"

    // xoá active ở tất cả tab
    tabBtns.forEach(function (item) {
      item.classList.remove("active");
    });
    // gán active cho tab vừa bấm
    btn.classList.add("active");

    // ẩn cả 2 form trước
    signinForm.classList.remove("active");
    signupForm.classList.remove("active");

    // hiện form tương ứng
    if (tabName === "signin") {
      signinForm.classList.add("active");
    } else {
      signupForm.classList.add("active");
    }
  });
});

// 5. CHUYỂN TAB BẰNG DÒNG CHỮ "Sign up now" / "Sign in"
switchLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    const tabName = link.getAttribute("data-tab");

    // tìm nút tab tương ứng rồi bấm giùm nó luôn cho đỡ lặp code
    tabBtns.forEach(function (btn) {
      if (btn.getAttribute("data-tab") === tabName) {
        btn.click();
      }
    });
  });
});

// 6. ẨN / HIỆN MẬT KHẨU
toggleEyeIcons.forEach(function (icon) {
  icon.addEventListener("click", function () {
    const inputId = icon.getAttribute("data-target");
    const input = document.getElementById(inputId);

    if (input.type === "password") {
      input.type = "text";
      icon.classList.remove("fa-eye");
      icon.classList.add("fa-eye-slash");
    } else {
      input.type = "password";
      icon.classList.remove("fa-eye-slash");
      icon.classList.add("fa-eye");
    }
  });
});

// 7. XỬ LÝ KHI BẤM NÚT SIGN IN / SIGN UP 
signinForm.addEventListener("submit", function (e) {
  e.preventDefault(); // chặn load lại trang
  alert("Đăng nhập thành công!");
  popupOverlay.classList.remove("active");
});

signupForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const password = document.getElementById("signupPassword").value;
  const confirm = document.getElementById("signupConfirm").value;

  if (password !== confirm) {
    alert("Mật khẩu nhập lại không khớp!");
    return;
  }

  alert("Đăng ký thành công!");
  popupOverlay.classList.remove("active");
});