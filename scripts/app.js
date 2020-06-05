const mssgForm = document.querySelector('.new-chat');
const nameForm = document.querySelector('.new-name');
const convoBody = document.querySelector('.btns-and-convo');
const roomsButtons = document.querySelector('.chat-rooms');


if (localStorage.getItem('username')) {
  nameForm.classList.add('d-none');
  convoBody.classList.remove('d-none');
}

nameForm.addEventListener('submit', event => {
  event.preventDefault();

  const username = nameForm.name.value.trim();
  console.log(username);
  nameForm.reset();

  chatroom.changeName(username);

  localStorage.setItem('username', username);

  nameForm.classList.add('d-none');
  convoBody.classList.remove('d-none');
})


updateUI();


mssgForm.addEventListener('submit', event => {
  event.preventDefault();

  message = mssgForm.message.value.trim();
  // console.log(message);
  chatroom.addChat(message)
  .then(() => {
    mssgForm.reset();
  })
  .catch(error => console.log(error));
})


roomsButtons.addEventListener('click', event => {
  if (event.target.id === 'general') {

    // console.log(event.target.id);
    let room = event.target.id;

    // console.log(list.innerHTML);
    list.innerHTML = '';

    localStorage.setItem('room', room);

    chatroom.changeRoom(room);

    updateUI();
  } else if (event.target.id === 'sports') {

    // console.log(event.target.id);
    let room = event.target.id;

    // console.log(list.innerHTML);
    list.innerHTML = '';

    localStorage.setItem('room', room);

    chatroom.changeRoom(room);

    updateUI();
  } else if (event.target.id === 'music') {

    // console.log(event.target.id);
    let room = event.target.id;

    // console.log(list.innerHTML);
    list.innerHTML = '';

    localStorage.setItem('room', room);

    chatroom.changeRoom(room);

    updateUI();
  } else if (event.target.id === 'coding') {

    // console.log(event.target.id);
    let room = event.target.id;

    // console.log(list.innerHTML);
    list.innerHTML = '';

    localStorage.setItem('room', room);

    chatroom.changeRoom(room);

    updateUI();
  }
});