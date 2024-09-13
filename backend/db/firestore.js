const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'trimtime-fad68',
  storageBucket: 'trimtime-fad68.appspot.com'  // Add storageBucket configuration
});

const db = admin.firestore();
const bucket = admin.storage().bucket();  // Initialize Firebase Storage

module.exports = {db,bucket};
