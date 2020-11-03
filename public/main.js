// const form = document.getElementById("registerForm");
// const inputAvatar = document.getElementById("avatarInput");
// const imageElement = document.getElementById("avatarImage");

// const convertFileToBase64 = (file) => {
//   return new Promise((res, rej) => {
//     const fileReader = new FileReader();
//     fileReader.onerror = (err) => rej(err);
//     fileReader.onloadend = () => res(fileReader.result);
//     fileReader.readAsDataURL(file);
//   });
// };

// form.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   console.log(inputAvatar);
//   const file = inputAvatar.files[0];
//   const base64 = await convertFileToBase64(file);
//   imageElement.src = base64;
// });
