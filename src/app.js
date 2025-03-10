import { displayBooks } from "./domUtils.js";
import { loadLibraryFromStorage } from "./storageUtils.js";
import "./eventHandlers.js";

const myLibrary = loadLibraryFromStorage();
displayBooks(myLibrary);
