import { PageController } from './controller/page.controller';

const url = 'https://reqres.in/api/';

const loginForm = document.querySelector('#loginForm') as HTMLFormElement;
const emailUser = document.querySelector('#emailUser') as HTMLInputElement;
const passwordUser = document.querySelector('#passwordUser') as HTMLInputElement;

loginForm.addEventListener('submit', async (e: Event) => {
  e.preventDefault();

  const user = {
    email: emailUser.value,
    password: passwordUser.value,
  };

  try {
    const pageController = new PageController(url);
    const responseOfLogin = await pageController.login(user, "login");

    sessionStorage.setItem('token', responseOfLogin.token);

    const getToken = sessionStorage.getItem('token');
    if (getToken) {
      window.location.href = '../src/view/home.html';
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
});
