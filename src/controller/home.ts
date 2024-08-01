const logout = document.querySelector('#logout') as HTMLButtonElement


logout.addEventListener('click', () => {
  sessionStorage.removeItem('token')
  window.location.href = '/'
})