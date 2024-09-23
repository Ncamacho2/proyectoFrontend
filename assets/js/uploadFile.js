  // Import the functions you need from the SDKs you need
  // import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  //  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {firebase} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
      apiKey: "AIzaSyDS3Q7oWy8K5O4OXVak1BymC4Ly1XfEAeo",
      authDomain: "nelson-568ca.firebaseapp.com",
      databaseURL: "https://nelson-568ca.firebaseio.com",
      projectId: "nelson-568ca",
      storageBucket: "nelson-568ca.appspot.com",
      messagingSenderId: "181720440030",
      appId: "1:181720440030:web:291a91c0c29dae2fd2764f"
  };

  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();
  const db = firebase.firestore();


  // Función para subir la imagen
  async function uploadImage(file) {
      if (!file) {
          alert('Por favor, selecciona una imagen.');
          return;
      }

      // Crea una referencia al archivo en Storage
      const storageRef = storage.ref(`images/${file.name}`);

      // Subir la imagen
      const uploadTask = storageRef.put(file);

      // Monitoriza el progreso de la subida
      uploadTask.on('state_changed',
          (snapshot) => {
              // Progreso de la subida
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              document.getElementById('progress').innerText = 'Progreso: ' + progress + '%';
          },
          (error) => {
              console.error('Error al subir la imagen:', error);
          },
          async() => {
              // Imagen subida exitosamente, obtener la URL
              const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
              document.getElementById('imageUrl').innerHTML = `URL de la imagen: <a href="${downloadURL}" target="_blank">${downloadURL}</a>`;

              // Guardar la URL en Firestore
              try {
                  const docRef = await db.collection('images').add({
                      imageUrl: downloadURL,
                      createdAt: new Date(),
                  });
                  console.log('Imagen subida y guardada en Firestore con ID: ', docRef.id);
              } catch (error) {
                  console.error('Error al guardar la URL en Firestore:', error);
              }
          }
      );
  }

  // Maneja el evento de subir la imagen
  function handleImageUpload() {
      const fileInput = document.getElementById('imageUpload');
      const file = fileInput.files[0];
      uploadImage(file); // Llama a la función de subida
  }