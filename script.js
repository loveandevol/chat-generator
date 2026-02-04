let chats = [];
// 1. 방향별 프로필 URL을 저장할 변수
let leftProfile = "";
let rightProfile = "";

// 라디오 버튼 변경 감지 이벤트 리스너 추가
document.querySelectorAll('input[name="side"]').forEach(input => {
  input.addEventListener('change', (e) => {
    const profileInput = document.getElementById('profile');
    if (e.target.value === 'leftt') {
      rightProfile = profileInput.value; // 현재 입력을 저장
      profileInput.value = leftProfile;   // 저장된 왼쪽 URL 불러오기
    } else {
      leftProfile = profileInput.value;  // 현재 입력을 저장
      profileInput.value = rightProfile; // 저장된 오른쪽 URL 불러오기
    }
  });
});

function addChat() {
  const side = document.querySelector('input[name="side"]:checked').value;
  const profile = document.getElementById('profile').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!profile || !message) {
    alert("프로필과 내용을 모두 입력해주세요.");
    return;
  }

  // 현재 입력된 값을 각 방향 변수에 최신화
  if (side === 'leftt') leftProfile = profile;
  else rightProfile = profile;

  chats.push({ side, profile, message });
  updatePreview();
  updateOutput();
}

function resetChat() {
  chats = [];
  leftProfile = "";
  rightProfile = "";
  updatePreview();
  updateOutput();

  document.getElementById('profile').value = "";
  document.getElementById('message').value = "";
}

// 2. 삭제 기능 추가된 업데이트 함수
function updatePreview() {
  const container = document.getElementById("preview");
  container.innerHTML = "";

  chats.forEach((chat, index) => {
    const row = document.createElement("div");
    row.className = `chat-row ${chat.side}`;
    row.style.position = "relative"; // 삭제 버튼 배치를 위해 추가

    // 우클릭 이벤트 (삭제 버튼 생성)
    row.oncontextmenu = (e) => {
      e.preventDefault(); // 기본 우클릭 메뉴 방지
      
      // 이미 삭제 버튼이 있다면 제거
      const existingBtn = document.querySelector('.delete-btn');
      if (existingBtn) existingBtn.remove();

      const delBtn = document.createElement('button');
      delBtn.innerText = "삭제";
      delBtn.className = "delete-btn";
      delBtn.style.position = "absolute";
      delBtn.style.top = "0";
      delBtn.style.left = chat.side === 'leftt' ? "60px" : "auto";
      delBtn.style.right = chat.side === 'right' ? "60px" : "auto";
      delBtn.style.zIndex = "10";
      delBtn.style.backgroundColor = "#ff4d4d";

      delBtn.onclick = () => {
        chats.splice(index, 1);
        updatePreview();
        updateOutput();
      };

      row.appendChild(delBtn);

      // 바탕 클릭 시 삭제 버튼 사라지게 함
      setTimeout(() => {
        window.onclick = () => {
          delBtn.remove();
          window.onclick = null;
        };
      }, 0);
    };

    const bubble = document.createElement("div");
    bubble.className = `chat-bb ${chat.side}`;
    bubble.innerHTML = `<p>${chat.message}</p>`;

    const profile = document.createElement("div");
    profile.className = `chat-profile ${chat.side}`;
    profile.style.backgroundImage = `url('${chat.profile}')`;

    if (chat.side === "right") {
      row.append(bubble, profile);
    } else {
      row.append(profile, bubble);
    }

    container.appendChild(row);
  });
}

function updateOutput() {
  const html = chats.map(chat => {
    return `<div class="chat-row ${chat.side}">
  ${chat.side === "right"
      ? `<div class="chat-bb ${chat.side}"><p>${chat.message}</p></div>
  <div class="chat-profile ${chat.side}" style="background-image:url('${chat.profile}')"></div>`
      : `<div class="chat-profile ${chat.side}" style="background-image:url('${chat.profile}')"></div>
  <div class="chat-bb ${chat.side}"><p>${chat.message}</p></div>`}
</div>`;
  }).join("\n");

  document.getElementById("output").value = html;
}

function copyCode() {
  const output = document.getElementById("output");
  output.select();
  document.execCommand("copy");
  alert("코드가 복사되었습니다.");
}
