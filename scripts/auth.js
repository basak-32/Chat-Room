let currentUsername = '';
let currentRoom = '';
let currentUserId = '';

const accountDetails = document.querySelector('.account-details');

auth.onAuthStateChanged(user => {
  setUpNavLinks(user);
  
  if (user) {
    // console.log(user.uid);
    currentUserId = user.uid;

    db.collection('users').doc(user.uid).get().then(doc => {
      // console.log(doc.data().username);
      currentUsername = doc.data().username;
      currentRoom = doc.data().current_room;

      accountDetails.innerHTML = `
        Logged in as: 
        <span class="text-primary">${currentUsername}</span>
      `;
    })


    chatList.innerHTML = '';

    db.collection('chats').orderBy('created_at').get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        renderChats(doc);
      });
    })

    // db.collection('chats').orderBy('created_at').onSnapshot(snapshot => {
    //   // console.log(snapshot.docChanges());
    //   let changes = snapshot.docChanges();
    
    //   changes.forEach(change => {
    //     // console.log(change);
    //     if (change.type == 'added') {
    //       renderChats(change.doc);
    //     }
    //   })
    // })
  } else {
    // console.log('user logged out!!');
    // chatList.innerHTML = '<h5 class="text-center">Login to join conversation..</h5>';
  }
})


const signupBtn = document.querySelector('#signup-button');
const signupForm = document.querySelector('#signup-form');
const errorMssg = document.querySelector('.error-message');

signupBtn.addEventListener('click', event => {
  errorMssg.textContent = '';

  const email = signupForm.email.value.trim();
  const username = signupForm.username.value.trim();
  const age = signupForm.age.value.trim();
  const password = signupForm.password.value.trim();

  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    // console.log(cred.user);
    return db.collection('users').doc(cred.user.uid).set({
      username: username,
      age: age,
      room: 'general'
    })
  }).catch(error => {
    // console.log(error);
    errorMssg.textContent = `*${error.message}`;
  })
  // console.log(email, username, age, password);
  signupForm.reset();
})


// login
const loginBtn = document.querySelector('#login-button');
const loginForm = document.querySelector('#login-form');

loginBtn.addEventListener('click', event => {
  errorMssg.textContent = '';

  const email = loginForm.email.value.trim();
  const password = loginForm.password.value.trim();

  auth.signInWithEmailAndPassword(email, password).then(cred => {
    // console.log(cred.user);
  }).catch(error => {
    errorMssg.textContent = `*${error.message}`;
  });

  loginForm.reset();
})



// logout
const logout = document.querySelector('#logout');

logout.addEventListener('click', event => {
  auth.signOut()
})