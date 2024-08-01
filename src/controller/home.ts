const logout = document.querySelector('#logout-button') as HTMLButtonElement


logout.addEventListener('click', () => {
  sessionStorage.removeItem('token')
  window.location.href = '/'
})