const list = document.querySelector('.chat-list');

const addMssg = (mssgObj) => {
  // let time = dateFns.distanceInWordsToNow(
  //   mssgObj.created_at.toDate(),
  //   { addSuffix: true }
  // );
  let html = `
    <li>
      <span class="username mr-1">${mssgObj.username}:</span>
      <span class="mssg">${mssgObj.message}</span>
      <div class="time text-muted">${mssgObj.created_at.toDate()}</div>
    </li>
    <div class="hr"></div>
  `
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


db.collection('chats').orderBy("created_at", "asc").onSnapshot(snapshot => {
  // console.log(snapshot.docChanges());
  // console.log(snapshot.docChanges()[0].doc.data());
  snapshot.docChanges().forEach(change => {
    // console.log(change.doc.data());
    if (change.type === 'added') {
      addMssg(change.doc.data());
    }
  })
})