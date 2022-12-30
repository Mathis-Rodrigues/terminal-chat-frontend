import create from 'zustand';
import { persist } from 'zustand/middleware';
import { Profile } from '../Types/Profile';

export interface ProfileState {
  userProfile: Profile;
  updateUserProfile: (profile: Profile) => void;
}

const useProfileStore = create<ProfileState>()(
  persist((set) => ({
    userProfile: {
      name: '',
      bio: '',
      mail: '',
      _id: '',
      password: '',
    },
    updateUserProfile: (profile: Profile) => set({ userProfile: profile }),
  })),
);

export default useProfileStore;
