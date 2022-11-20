import useProfileStore from '../Contexts/ProfileContext';

interface LoginPageProps {}

const LoginPage: React.FunctionComponent<LoginPageProps> = () => {
  const updateUserProfile = useProfileStore((state) => state.updateUserProfile);
  const userProfile = useProfileStore((state) => state.userProfile);
  const buttonClicktest = () => {
    updateUserProfile({ name: 'test', age: 20 });
    // console.log(userProfile);
  };
  return (
    <div>
      <p>Bienvenue dans CyberChat</p>
      <button type="submit" onClick={buttonClicktest}>
        fddf
      </button>
    </div>
  );
};

export default LoginPage;
