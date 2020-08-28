const convoBody = document.querySelector('.btns-and-convo');
const chatList = document.querySelector('.chat-list');
const roomsButtons = document.querySelector('.chat-rooms');
const mssgForm = document.querySelector('.new-chat');


const chatAndAll = document.querySelector('.chat-and-all');


const loggedInNavLinks = document.querySelectorAll('.logged-in');
const loggedOutNavLinks = document.querySelectorAll('.logged-out');
const joinConversation = document.querySelector('.join-conversation');

const setUpNavLinks = (user) => {
  if (user) {
    chatAndAll.classList.remove('d-none');
    joinConversation.classList.add('d-none');

    loggedInNavLinks.forEach(link => {
      link.classList.remove('d-none');
    });
    loggedOutNavLinks.forEach(link => {
      link.classList.add('d-none');
    })
   } else {
    chatAndAll.classList.add('d-none');
    joinConversation.classList.remove('d-none');

    loggedInNavLinks.forEach(link => {
      link.classList.add('d-none');
    });
    loggedOutNavLinks.forEach(link => {
      link.classList.remove('d-none');
    })
  }
}




const renderChats = (doc) => {
  if (doc.data().room === currentRoom) {
    let li = document.createElement('li');
    let username = document.createElement('span');
    let message = document.createElement('span');
    let time = document.createElement('div');

    const currentTime = Date.now() / 1000;
    const mssgTime = doc.data().created_at.seconds;
    const secondsAgo = currentTime - mssgTime;

    let ago = 0;
    let unit = '';
    if (secondsAgo / 60 < 1) {
      ago = secondsAgo;
      unit = 'seconds';
    } else if (secondsAgo / (60 * 60) < 1) {
      ago = secondsAgo / 60;
      unit = 'minutes';
    } else if (secondsAgo / (60 * 60 * 24) < 1) {
      ago = secondsAgo / (60 * 60);
      unit = 'hours';
    } else if (secondsAgo / (60 * 60 * 24 * 7) < 1) {
      ago = secondsAgo / (60 * 60 * 24);
      unit = 'days';
    } else if (secondsAgo / (60 * 60 * 24 * 7 * 4) < 1) {
      ago = secondsAgo / (60 * 60 * 24 * 7);
      unit = 'weeks';
    } else if (secondsAgo / (60 * 60 * 24 * 7 * 4 * 12) < 1) {
      ago = secondsAgo / (60 * 60 * 24 * 7 * 4);
      unit = 'months';
    } else if (secondsAgo / (60 * 60 * 24 * 7 * 4 * 12) >= 1) {
      ago = secondsAgo / (60 * 60 * 24 * 7 * 4 * 12);
      unit = 'years';
    }

    time.textContent = `${Math.round(ago)} ${unit} ago`;
    time.classList.add('text-muted');


    li.setAttribute('mssg-id', doc.id);

    username.textContent = doc.data().username;
    username.classList.add('username');

    message.textContent = doc.data().message;

    if (doc.data().username === currentUsername) {
      li.appendChild(message);
      li.classList.add('me');
    } else {
      li.appendChild(username);
      li.appendChild(message);
    }

    li.appendChild(time);

    chatList.appendChild(li);
  }
}



roomsButtons.addEventListener('click', event => {
  // console.log(event.target.id);
  if (event.target.id) {
    currentRoom = event.target.id;
    // localStorage.setItem('room', event.target.id);
    db.collection('users').doc(currentUserId).get().then(doc => {
      const age = doc.data().age;
      const current_room = doc.data().current_room;
      const username = doc.data().username;
  
      db.collection('users').doc(currentUserId).set({
      age: age,
      current_room: event.target.id,
      username: username
      }).then(() => {
        chatList.innerHTML = '';
        db.collection('chats').orderBy('created_at').get().then(snapshot => {
          snapshot.docs.forEach(doc => {
            renderChats(doc);
          });
        })
      })
    })
  }
})


mssgForm.addEventListener('submit', event => {
  event.preventDefault();

  const message = mssgForm.message.value.trim();
  // console.log(message);
  mssgForm.message.value = '';

  const now = new Date();

  db.collection('chats').add({
    username: currentUsername,
    room: currentRoom,
    message: message,
    created_at: firebase.firestore.Timestamp.fromDate(now)
  }).then(chat => {
    // console.log(chat.id);
    db.collection('chats').doc(chat.id).get().then(doc => {
      // console.log(doc.data());
      renderChats(doc);
    })
  })
})




