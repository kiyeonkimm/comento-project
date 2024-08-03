document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const passwordConfirmInput = document.getElementById("passwordConfirm");
  const button = document.getElementById("button");
  const checkUsernameButton = document.getElementById("checkUsernameButton");
  const usernameCheckMessage = document.getElementById("usernameCheck");

  let isUsernameValid = false;
  let isPasswordValid = false;
  let isPasswordConfirmValid = false;
  let isUsernameChecked = false;

  // 중복 아이디 예시
  const existingUsernames = ["user1", "user2", "user3"];

  // 에러 메시지 표시
  function showError(input, errorID) {
    const errorElement = document.getElementById(errorID);
    errorElement.style.display = "block";
    input.style.border = "1px solid #f74747";
  }

  // 에러 메시지 숨기기
  function hideError(input, errorID) {
    const errorElement = document.getElementById(errorID);
    errorElement.style.display = "none";
    input.style.border = "1px solid #ccc";
  }

  // 아이디 유효성 검사
  function checkUsernameValid() {
    const usernameValue = usernameInput.value.trim();

    isUsernameValid = false;
    hideError(usernameInput, "UsernameEmptyError");

    if (!usernameValue) {
      showError(usernameInput, "UsernameEmptyError");
    } else {
      isUsernameValid = true;
    }
    submitButtonState();
  }

  function handleUsernameCheck() {
    const usernameValue = usernameInput.value.trim();

    isUsernameChecked = false;
    usernameCheckMessage.style.display = "none";

    if (!usernameValue) {
      showError(usernameInput, "UsernameEmptyError");
      isUsernameChecked = false;
    } else if (existingUsernames.includes(usernameValue)) {
      usernameCheckMessage.style.display = "block";
      usernameCheckMessage.style.color = "red";
      usernameCheckMessage.textContent = "아이디가 이미 사용 중입니다.";
      isUsernameChecked = false;
    } else {
      usernameCheckMessage.style.display = "block";
      usernameCheckMessage.style.color = "green";
      usernameCheckMessage.textContent = "사용 가능한 아이디입니다.";
      isUsernameChecked = true;
    }
    submitButtonState();
  }

  // 비밀번호 유효성 검사
  function checkPasswordValid() {
    const passwordValue = passwordInput.value.trim();

    isPasswordValid = false;
    hideError(passwordInput, "passwordEmptyError");
    hideError(passwordInput, "passwordInvalidError");

    if (!passwordValue) {
      showError(passwordInput, "passwordEmptyError");
    } else if (passwordValue.length < 8) {
      showError(passwordInput, "passwordInvalidError");
    } else {
      isPasswordValid = true;
    }
    submitButtonState();
  }

  // 비밀번호 확인 유효성 검사
  function checkPasswordConfirmValid() {
    const passwordValue = passwordInput.value.trim();
    const passwordConfirmValue = passwordConfirmInput.value.trim();

    isPasswordConfirmValid = false;
    hideError(passwordConfirmInput, "passwordConfirmInitError");
    hideError(passwordConfirmInput, "passwordConfirmIncorrectError");

    if (!isPasswordValid) {
      showError(passwordConfirmInput, "passwordConfirmInitError");
    } else if (
      !passwordConfirmValue ||
      passwordValue !== passwordConfirmValue
    ) {
      showError(passwordConfirmInput, "passwordConfirmIncorrectError");
    } else {
      isPasswordConfirmValid = true;
    }
    submitButtonState();
  }

  // 버튼 활성화 상태 확인
  function submitButtonState() {
    let isFormValid =
      isUsernameValid &&
      isPasswordValid &&
      isPasswordConfirmValid &&
      isUsernameChecked;
    button.disabled = !isFormValid;
  }

  const submit = function (event) {
    event.preventDefault();
    if (
      isUsernameValid &&
      isPasswordValid &&
      isPasswordConfirmValid &&
      isUsernameChecked
    ) {
      alert("가입이 완료되었습니다.");
    } else {
      alert("입력한 정보를 다시 확인해주세요.");
    }
  };

  // 이벤트 리스너 추가
  if (usernameInput) {
    usernameInput.addEventListener("focusout", checkUsernameValid);
  }
  if (checkUsernameButton) {
    checkUsernameButton.addEventListener("click", handleUsernameCheck);
  }
  if (passwordInput) {
    passwordInput.addEventListener("focusout", checkPasswordValid);
  }
  if (passwordConfirmInput) {
    passwordConfirmInput.addEventListener("input", checkPasswordConfirmValid);
  }
  if (signupForm) {
    signupForm.addEventListener("submit", submit);
  }
});
