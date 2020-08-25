const nameForm = document.querySelector('.new-name');
const convoBody = document.querySelector('.btns-and-convo');
const chatList = document.querySelector('.chat-list');
const roomsButtons = document.querySelector('.chat-rooms');
const mssgForm = document.querySelector('.new-chat');



if (localStorage.getItem('username')) {
  nameForm.classList.add('d-none');
  convoBody.classList.remove('d-none');
}

nameForm.addEventListener('submit', event => {
  event.preventDefault();

  const username = nameForm.name.value.trim();

  localStorage.setItem('username', username);

  nameForm.name.value = '';

  nameForm.classList.add('d-none');
  convoBody.classList.remove('d-none');
})


const renderChats = (doc) => {
  if (doc.data().room === localStorage.getItem('room')) {
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

    if (doc.data().username === localStorage.getItem('username')) {
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


if (!localStorage.getItem('room')) {
  localStorage.setItem('room', 'general');
}

db.collection('chats').orderBy('created_at').onSnapshot(snapshot => {
  // console.log(snapshot.docChanges());
  let changes = snapshot.docChanges();

  changes.forEach(change => {
    // console.log(change);
    if (change.type == 'added') {
      renderChats(change.doc);
    }
  })
})

// db.collection('chats').get().then(snapshot => {
//   snapshot.docs.forEach(doc => {
//     renderChats(doc);
//   });
// })

roomsButtons.addEventListener('click', event => {
  // console.log(event.target.id);
  localStorage.setItem('room', event.target.id);

  chatList.innerHTML = '';
  db.collection('chats').where('room', '==', localStorage.getItem('room')).orderBy('created_at').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
      renderChats(doc);
    });
  })
})


mssgForm.addEventListener('submit', event => {
  event.preventDefault();

  const message = mssgForm.message.value.trim();
  // console.log(message);
  mssgForm.message.value = '';

  const now = new Date();

  db.collection('chats').add({
    username: localStorage.getItem('username'),
    room: localStorage.getItem('room'),
    message: message,
    created_at: firebase.firestore.Timestamp.fromDate(now)
  })
})





// const mssgForm = document.querySelector('.new-chat');
// const nameForm = document.querySelector('.new-name');
// const convoBody = document.querySelector('.btns-and-convo');
// const roomsButtons = document.querySelector('.chat-rooms');


// if (localStorage.getItem('username')) {
//   nameForm.classList.add('d-none');
//   convoBody.classList.remove('d-none');
// }

// nameForm.addEventListener('submit', event => {
//   event.preventDefault();

//   const username = nameForm.name.value.trim();
//   console.log(username);
//   nameForm.reset();

//   chatroom.changeName(username);

//   localStorage.setItem('username', username);

//   nameForm.classList.add('d-none');
//   convoBody.classList.remove('d-none');
// })


// // updateUI();


// mssgForm.addEventListener('submit', event => {
//   event.preventDefault();

//   message = mssgForm.message.value.trim();
//   // console.log(message);
//   chatroom.addChat(message)
//   .then(() => {
//     mssgForm.reset();
//   })
//   .catch(error => console.log(error));
// })


// roomsButtons.addEventListener('click', event => {
//   if (event.target.id === 'general') {

//     // console.log(event.target.id);
//     let room = event.target.id;

//     // console.log(list.innerHTML);
//     list.innerHTML = '';

//     localStorage.setItem('room', room);

//     chatroom.changeRoom(room);

//     updateUI();
//   } else if (event.target.id === 'sports') {

//     // console.log(event.target.id);
//     let room = event.target.id;

//     // console.log(list.innerHTML);
//     list.innerHTML = '';

//     localStorage.setItem('room', room);

//     chatroom.changeRoom(room);

//     updateUI();
//   } else if (event.target.id === 'music') {

//     // console.log(event.target.id);
//     let room = event.target.id;

//     // console.log(list.innerHTML);
//     list.innerHTML = '';

//     localStorage.setItem('room', room);

//     chatroom.changeRoom(room);

//     updateUI();
//   } else if (event.target.id === 'coding') {

//     // console.log(event.target.id);
//     let room = event.target.id;

//     // console.log(list.innerHTML);
//     list.innerHTML = '';

//     localStorage.setItem('room', room);

//     chatroom.changeRoom(room);

//     updateUI();
//   }
// });