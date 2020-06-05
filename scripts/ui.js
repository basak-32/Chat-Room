const list = document.querySelector('.chat-list');

const addMssg = (mssgObj) => {
  // let time = dateFns.distanceInWordsToNow(
  //   mssgObj.created_at.toDate(),
  //   { addSuffix: true }
  // );

  // console.log(Date.now());
  const now = Date.now() / 1000;
  // console.log(now);

  mssgTime = mssgObj.created_at.seconds;
  // console.log(mssgTime);

  const secondsAgo = now - mssgTime;
  // console.log(timeAgo);

  const minutesAgo = secondsAgo/60;

  let time = 0;
  let unit = '';
  if (secondsAgo / 60 < 1) {
    time = secondsAgo;
    unit = 'seconds';
  } else if (secondsAgo / (60 * 60) < 1) {
    time = secondsAgo / 60;
    unit = 'minutes';
  } else if (secondsAgo / (60 * 60 * 24) < 1) {
    time = secondsAgo / (60 * 60);
    unit = 'hours';
  } else if (secondsAgo / (60 * 60 * 24 * 7) < 1) {
    time = secondsAgo / (60 * 60 * 24);
    unit = 'days';
  } else if (secondsAgo / (60 * 60 * 24 * 7 * 4) < 1) {
    time = secondsAgo / (60 * 60 * 24 * 7);
    unit = 'weeks';
  } else if (secondsAgo / (60 * 60 * 24 * 7 * 4 * 12) < 1) {
    time = secondsAgo / (60 * 60 * 24 * 7 * 4);
    unit = 'months';
  } else if (secondsAgo / (60 * 60 * 24 * 7 * 4 * 12) >= 1) {
    time = secondsAgo / (60 * 60 * 24 * 7 * 4 * 12);
    unit = 'years';
  }


  let html = '';

  // console.log(mssgObj.username);
  if (mssgObj.username === localStorage.getItem('username')) {
    // console.log(mssgObj.username);
    // console.log(list);

    html = `
      <li class="me">
        
        <span class="mssg">${mssgObj.message}</span>
        <div class="time text-muted">${Math.round(time)} ${unit} ago</div>
      </li>
      <div class="hr"></div>
    `
  } else {
    html = `
      <li>
        <span class="username mr-1">${mssgObj.username}:</span>
        <span class="mssg">${mssgObj.message}</span>
        <div class="time text-muted">${Math.round(time)} ${unit} ago</div>
      </li>
      <div class="hr"></div>
    `
  } 
  list.innerHTML += html;
}



// const updateUI = () => {
//   db.collection('chats').orderBy("created_at", "asc").get()
//   .then(snapshot => {
//     // console.log(snapshot.docs[0].data());
//     snapshot.docs.forEach(doc => {
//       console.log(doc.data());
//       addMssg(doc.data());
//     })
//   }).catch(error => console.log(error));
// }


const updateUI = () => {
  db.collection('chats').orderBy("created_at", "asc").onSnapshot(snapshot => {
    // console.log(snapshot.docChanges());
    // console.log(snapshot.docChanges()[0].doc.data());
    snapshot.docChanges().forEach(change => {
      // console.log(change.doc.data());
      // console.log(change.doc.data().room);
      if (change.type === 'added' && change.doc.data().room === localStorage.getItem('room')) {
        addMssg(change.doc.data());
      }
    })
  })
}
