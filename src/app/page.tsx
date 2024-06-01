import { redirect } from 'next/navigation';

const HomePage = () => {
  redirect('/profile/contact');
};

export default HomePage;
