const data = {
  "results":
  [
    {
    "room":{
      "name": "Product A",
      "id": 12456,
      "image_url": "https://picsum.photos/id/237/200/300",
      "participant": [
          {
            "id": "admin@mail.com",
            "name": "Admin",
            "role": 0
          },
          {
            "id": "agent@mail.com",
            "name": "Agent A",
            "role": 1
          },
          {
            "id": "customer@mail.com",
            "name": "king customer",
            "role": 2
          }
        ]
    },
    "comments": [
      {
        "id": 885512,
        "type": "text",
        "message": "Selamat malam",
        "sender": "customer@mail.com"
      },
      {
        "id": 885513,
        "type": "text",
        "message": "Malam",
        "sender": "agent@mail.com"
      },
      {
        "id": 885514,
        "type": "text",
        "message": "Ada yang bisa saya bantu?",
        "sender": "agent@mail.com"
      },
      {
        "id": 885515,
        "type": "text",
        "message": "Saya ingin mengirimkan bukti pembayaran, karena diaplikasi selalu gagal",
        "sender": "customer@mail.com"
      },
      {
        "id": 885516,
        "type": "text",
        "message": "Baik, silahkan kirimkan lampiran bukti pembayarannya",
        "sender": "agent@mail.com"
      },
      {
        "id": 885517,
        "type": "image",
        "url": "files/images/885517.png",
        "sender": "customer@mail.com"
      },
      {
        "id": 885518,
        "type": "pdf",
        "url": "files/pdf/885518.pdf",
        "sender": "customer@mail.com"
      },
      {
        "id": 885519,
        "type": "video",
        "url": "files/videos/885519.mp4",
        "sender": "customer@mail.com"
      },
    ]
  }
  ]
}

const room = data.results[0].room;
document.getElementById("roomName").textContent = room.name;
document.getElementById("roomImage").src = room.image_url;
const customer = room.participant.find(participant => participant.role === 2);

const participantsList = document.querySelector("#participants ul");
room.participant.forEach((participant) => {
  const li = document.createElement("li");
  li.textContent = `${participant.role === 0 ? "👨‍⚕️" : participant.role === 1 ? "👮‍♂️" : "👨‍💼"} ${participant.name} (${participant.role === 0 ? "Admin" : participant.role === 1 ? "Agent" : "You, Customer"})`;
  participantsList.appendChild(li);
});

const comments = data.results[0].comments;
const chatMessages = document.getElementById("chatMessages");

// Load comments
comments.forEach((comment) => {
  const messageDiv = document.createElement("div");
  messageDiv.className = `message ${comment.sender === customer.id ? "sent" : "received"}`;
  messageDiv.innerHTML = `<small><strong>${room.participant.find(participant => participant.id === comment.sender).name} says:</strong></small><br/><br/>`;
  if (comment.type == "text") {
    messageDiv.innerHTML += `${comment.message}`;
  } else if (comment.type == "image") {
    messageDiv.innerHTML += `<a href="${comment.url}" target="_blank"><img src="${comment.url}" height="150" /><br /><br /><div style="font-size: 10px;">Click to see full image</div></a>`;
  } else if (comment.type == "pdf") {
    messageDiv.innerHTML += `<embed src="${comment.url}" type="application/pdf" width="100%" height="500"></embed><br/><br/><a style="font-size: 10px;" href="${comment.url}" target="_blank">Click to see full PDF</a>`;
  } else if (comment.type == "video") {
    messageDiv.innerHTML += `<iframe width="300" height="200" src="${comment.url}" frameborder="0" allowfullscreen></iframe><br/><br/><div style="font-size: 10px;"><a href="${comment.url}" target="_blank">See video in new tab</a></div>`;
  } else {
    messageDiv.innerHTML += ``;
  }
  chatMessages.appendChild(messageDiv);
});


// Enter new texts
document.getElementById("sendMessage").addEventListener("click", () => {
  const input = document.getElementById("messageInput");
  const newMessage = input.value.trim();
  if (newMessage) {
    const messageDiv = document.createElement("div");
    messageDiv.className = "message sent";
    messageDiv.innerHTML = `<small><strong>You say:</strong></small><br/><br/>${newMessage}`;
    chatMessages.appendChild(messageDiv);
    input.value = "";
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }
});

document.getElementById("messageInput").addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.getElementById("sendMessage").click();
  }
});
