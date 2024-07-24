let my_money = 10000; // 초기 잔액
document.getElementById("my_money").innerText = my_money;

// 모든 버튼에 클릭 이벤트 리스너 추가
const buttons = document.querySelectorAll(".product button");
buttons.forEach(function (button) {
  button.addEventListener("click", function () {
    const priceText = this.previousElementSibling.innerText; // 가격 텍스트 가져오기
    const price = parseInt(priceText.replace("원", "").replace(/,/g, ""), 10); // 가격 숫자로 변환

    if (my_money >= price) {
      my_money -= price; // 잔액 차감
      document.getElementById("my_money").innerText = my_money; // 잔액 업데이트
      alert("구매가 완료되었습니다!"); // 구매 완료 메시지
    } else {
      alert("잔액이 부족합니다!"); // 잔액 부족 메시지
    }
  });
});
