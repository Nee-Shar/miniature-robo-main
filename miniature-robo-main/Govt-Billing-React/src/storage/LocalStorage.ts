// import { Plugins } from "@capacitor/core";
// import { initializeApp } from "firebase/app";

// import { getFirestore, collection, addDoc } from "firebase/firestore";

// import firebase from "firebase/app";
// import "firebase/firestore";
// const firebaseConfig = {
//   apiKey: "AIzaSyBW-zQCi1vzyJXsnKbl0R6XoVa0WPbgaXg",
//   authDomain: "database-use-fdb86.firebaseapp.com",
//   projectId: "database-use-fdb86",
//   storageBucket: "database-use-fdb86.appspot.com",
//   messagingSenderId: "1033646633537",
//   appId: "1:1033646633537:web:9811e29e29bee120d24cc0",
//   measurementId: "G-BPJ09W852B",
// };

// const { Storage } = Plugins;

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// export class File {
//   created: string;
//   modified: string;
//   name: string;
//   content: string;
//   billType: number;

//   constructor(
//     created: string,
//     modified: string,
//     content: string,
//     name: string,
//     billType: number
//   ) {
//     this.created = created;
//     this.modified = modified;
//     this.content = content;
//     this.name = name;
//     this.billType = billType;
//   }
// }

// export class Local {
//   // _saveFile = async (file: File) => {
//   //   let data = {
//   //     created: file.created,
//   //     modified: file.modified,
//   //     content: file.content,
//   //     name: file.name,
//   //     billType: file.billType,
//   //   };
//   //   await Storage.set({
//   //     key: file.name,
//   //     value: JSON.stringify(data),
//   //   });
//   // };
//   _saveFile = async (file: File) => {
//     try {
//       // Reference to the Firestore collection where you want to store files

//       const filesCollection = collection(db, "files");

//       // Create a document with file data
//       await filesCollection.doc(file.name).set({
//         created: file.created,
//         modified: file.modified,
//         content: file.content,
//         name: file.name,
//         billType: file.billType,
//       });

//       console.log("File data saved to Firebase Firestore.");
//     } catch (error) {
//       console.error("Error saving file data:", error);
//     }
//   };
import { Plugins } from "@capacitor/core";

import { initializeApp } from "firebase/app";
import { doc, getDoc, getDocs, setDoc, deleteDoc } from "firebase/firestore";
import { ScreenBrightness } from "@capacitor-community/screen-brightness";
import * as AppGeneral from "../socialcalc/AppGeneral";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBW-zQCi1vzyJXsnKbl0R6XoVa0WPbgaXg",
  authDomain: "database-use-fdb86.firebaseapp.com",
  projectId: "database-use-fdb86",
  storageBucket: "database-use-fdb86.appspot.com",
  messagingSenderId: "1033646633537",
  appId: "1:1033646633537:web:9811e29e29bee120d24cc0",
  measurementId: "G-BPJ09W852B",
};

const { Storage } = Plugins;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export class File {
  created: string;
  modified: string;
  name: string;
  content: string;
  billType: number;

  constructor(
    created: string,
    modified: string,
    content: string,
    name: string,
    billType: number
  ) {
    this.created = created;
    this.modified = modified;
    this.content = content;
    this.name = name;
    this.billType = billType;
  }
}

export class Local {
  _saveFile = async (file: File) => {
    try {
      // Reference to the Firestore collection where you want to store files
      const filesCollection = collection(db, "files");

      // Use the file name as the document ID
      const docRef = doc(filesCollection, file.name);

      // Create a new document with file data
      await setDoc(docRef, {
        created: file.created,
        modified: file.modified,
        content: file.content,
        name: file.name,
        billType: file.billType,
      });

      console.log("File data saved to Firebase Firestore.");
    } catch (error) {
      console.error("Error saving file data:", error);
    }
  };

  // _getFile = async (name: string) => {
  //   const rawData = await Storage.get({ key: name });
  //   return JSON.parse(rawData.value);
  // };

  _getFile = async (name: string) => {
    try {
      const docRef = doc(db, "files", name); // Assuming "files" is your Firestore collection
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log("Document does not exist.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching file data:", error);
      return null;
    }
  };

  // _getAllFiles = async () => {
  //   let arr = {};
  //   const { keys } = await Storage.keys();
  //   console.log(keys);
  //   for (let i = 0; i < keys.length; i++) {
  //     let fname = keys[i];
  //     const data = await this._getFile(fname);
  //     arr[fname] = (data as any).modified;
  //   }
  //   return arr;
  // };

  _getAllFiles = async () => {
    try {
      // Set the brightness:
      // const brightness = 0.5;
      // await ScreenBrightness.setBrightness({ brightness });
      const filesCollection = collection(db, "files"); // Assuming "files" is your Firestore collection
      const querySnapshot = await getDocs(filesCollection);
      let arr = {};

      querySnapshot.forEach((docSnap) => {
        arr[docSnap.id] = docSnap.data().modified;
      });

      return arr;
    } catch (error) {
      console.error("Error fetching all files:", error);
      return {};
    }
  };

  // _deleteFile = async (name: string) => {
  //   await Storage.remove({ key: name });
  // };
  _deleteFile = async (name: string) => {
    try {
      const docRef = doc(db, "files", name); // Assuming "files" is your Firestore collection
      await deleteDoc(docRef);
      console.log("File deleted successfully.");
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  _checkKey = async (key) => {
    const { keys } = await Storage.keys();
    if (keys.includes(key, 0)) {
      return true;
    } else {
      return false;
    }
  };
}
