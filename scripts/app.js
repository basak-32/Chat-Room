const mssgForm = document.querySelector('.new-chat');
const nameForm = document.querySelector('.new-name');
const convoBody = document.querySelector('.btns-and-convo');


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


// updateUI();


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