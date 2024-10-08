import { useContext } from 'react';
import { AuthContext } from '../AuthContextProvider';

const AdminProfile = () => {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <div className="flex items-center lg:p-16 lg:space-x-32">
        <img src={user.photoURL} className="lg:h-40 h-10 object-cover" />
        <div>
          <p className="lg:mb-6 lg:text-2xl text-sm font-semibold">{user.displayName}</p>
          <p className="lg:text-2xl text-sm font-semibold">{user.email}</p>
        </div>
      </div>
    </div>
  )
}

export default AdminProfile