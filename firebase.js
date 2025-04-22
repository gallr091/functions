const firebaseConfig = {
	apiKey: "AIzaSyBf_G-TH7jcRRCN5--3yqIqNSsbbJjPoe8",
	authDomain: "greeting-card-functions.firebaseapp.com",
	projectId: "greeting-card-functions",
	storageBucket: "greeting-card-functions.firebasestorage.app",
	messagingSenderId: "360726857379",
	appId: "1:360726857379:web:6ebdd96c0f3675e5f16116"
  };


firebase.initializeApp(firebaseConfig); 
const database = firebase.database();
const ref = database.ref();