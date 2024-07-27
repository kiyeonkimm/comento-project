let batteryLevel = 100;
let alarms = [];
let intervalId;

function updateClock() {
  const clock = document.getElementById("clock");
  const now = new Date();
  const date = now.toLocaleDateString("en-GB");
  const time = now.toLocaleTimeString("en-GB");
  clock.textContent = `${date} ${time}`;

  if (batteryLevel > 0) {
    batteryLevel -= 1;
    document.getElementById("battery").textContent = `배터리: ${batteryLevel}%`;
  } else {
    clearInterval(intervalId);
    clock.style.color = "black";
    clock.style.backgroundColor = "black";
  }
}

function setAlarm() {
  const alarmTime = document.getElementById("alarmTime").value;
  if (alarmTime && alarms.length < 3) {
    alarms.push({ time: alarmTime, triggered: false });
    updateAlarmList();
  } else {
    alert("최대 알람 수를 초과하였습니다.");
  }
}

function updateAlarmList() {
  const alarmList = document.getElementById("alarmList");
  alarmList.innerHTML = "";
  alarms.forEach((alarm, index) => {
    const alarmDiv = document.createElement("div");
    alarmDiv.className = "alarm";
    alarmDiv.textContent = `알람 ${index + 1}: ${alarm.time}`;
    alarmList.appendChild(alarmDiv);
  });
}

function chargeBattery() {
  batteryLevel = 100;
  document.getElementById("battery").textContent = `배터리: ${batteryLevel}%`;
}

document.addEventListener("DOMContentLoaded", () => {
  intervalId = setInterval(updateClock, 1000);
});
