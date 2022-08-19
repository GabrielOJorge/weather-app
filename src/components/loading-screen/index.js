const loadingScreen = document.querySelector('.loading-screen');

window.addEventListener('load', () => {
  loadingScreen.parentElement.removeChild(loadingScreen);
});

export default loadingScreen;