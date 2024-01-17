import Profile from './_components/Profile';
import Sidebar from './_components/Sidebar';
import styles from './_styles/ProfilePage.module.css';

const ProfilePage = () => {
  return (
    <div className={styles['page-container']}>
      <div className={styles['content-container']}>
        <aside>
          <Sidebar />
        </aside>
        <main>
          <Profile />
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
