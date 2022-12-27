import create from 'zustand';
import { Profile } from '../Types/Profile';

export interface ProfileState {
  userProfile: Profile;
  updateUserProfile: (profile: Profile) => void;
}

const useProfileStore = create<ProfileState>((set) => ({
  userProfile: {
    name: '',
    bio: '',
    mail: '',
    _id: '',
    password: '',
  },
  updateUserProfile: (profile: Profile) => set({ userProfile: profile }),
}));

export default useProfileStore;
