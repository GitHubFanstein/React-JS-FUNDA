// import logo from './logo.svg';
import './App.css';
import EmailForm from './components/SendEmail/FormEmailChangePassword';
import ChangePasswordForm from './components/ChangePasswordForm/FormChangePassword';

function App() {
  return (
    
    <div>
      <button><a href='https://nodejs.org/en/download/prebuilt-installer/current'>Change Password</a> </button>
      <EmailForm></EmailForm>
      <ChangePasswordForm></ChangePasswordForm>
    </div>

   
  );
}

export default App;
