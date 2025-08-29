
let chats = [];

function addChat() {
  const side = document.querySelector('input[name="side"]:checked').value;
  const profile = document.getElementById('profile').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!profile || !message) {
    alert("프로필과 내용을 모두 입력해주세요.");
    return;
  }

  chats.push({ side, profile, message });
  updatePreview();
  updateOutput();
}

function resetChat() {
  chats = [];
  updatePreview();
  updateOutput();

  document.getElementById('profile').value = "";
  document.getElementById('message').value = "";
}

function updatePreview() {
  const container = document.getElementById("preview");
  container.innerHTML = "";

  chats.forEach(chat => {
    const row = document.createElement("div");
    row.className = `chat-row ${chat.side}`;

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
