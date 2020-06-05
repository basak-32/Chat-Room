class Chatroom {
  constructor(room, username) {
    this.room = room;
    this.username = username;
    this.chats = db.collection('chats');
  }

  async addChat(message) {
    // format a chat object
    const now = new Date();
    const chat = {
      message: message,
      username: this.username,
      room: this.room,
      created_at: firebase.firestore.Timestamp.fromDate(now)
    };
    // save the chat document
    const response = await this.chats.add(chat);
    return response;
  }

  changeName(name) {
    this.username = name;
  }

  changeRoom(room) {
    this.room = room;
  }
}


const username = localStorage.getItem('username') ? localStorage.getItem('username') : 'Anonymous';
// console.log(username);

const room = localStorage.getItem('room') ? localStorage.getItem('room') : 'general';


const chatroom = new Chatroom(room, username);
// console.log(chatroom);

