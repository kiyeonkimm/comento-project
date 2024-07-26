let batteryLevel = 100;
let alarms = [];
let intervalId;

function updateClock() {
  const clock = document.getElementById("clock");
  const now = new Date();
  clock.textContent = now.toLocaleTimeString("en-GB");

  if (batteryLevel > 0) {
    batteryLevel -= 1;
    document.getElementById(
      "battery"
    ).textContent = `Battery: ${batteryLevel}%`;
  } else {
    clearInterval(intervalId);
    clock.style.color = "black";
    clock.style.backgroundColor = "black";
  }

  checkAlarms(now);
  updateMessage(now);
}

function checkAlarms(now) {
  const currentTime = now.toTimeString().substring(0, 8);
  alarms.forEach((alarm) => {
    if (alarm.time === currentTime && !alarm.triggered) {
      alert(`Alarm! It's ${alarm.time}`);
      alarm.triggered = true;
    }
  });
}

function updateMessage(now) {
  const message = document.getElementById("message");
  const day = now.getDay();
  if (day === 0 || day === 6) {
    message.textContent = "즐거운 주말!";
  } else {
    message.textContent = "좋은 하루 보내세요!";
  }
}

function setAlarm() {
  const alarmTime = document.getElementById("alarmTime").value;
  console.log("Setting alarm for:", alarmTime); // 디버깅 메시지 추가
  if (alarmTime && alarms.length < 3) {
    alarms.push({ time: alarmTime, triggered: false });
    updateAlarmList();
  } else {
    console.log("Failed to set alarm:", alarmTime); // 디버깅 메시지 추가
    alert("Invalid alarm time or maximum alarms reached.");
  }
}

function updateAlarmList() {
  const alarmList = document.getElementById("alarmList");
  alarmList.innerHTML = "";
  alarms.forEach((alarm, index) => {
    const alarmDiv = document.createElement("div");
    alarmDiv.className = "alarm";
    alarmDiv.textContent = `Alarm ${index + 1}: ${alarm.time}`;
    alarmList.appendChild(alarmDiv);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  intervalId = setInterval(updateClock, 1000);
});
