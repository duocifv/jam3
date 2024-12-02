// // stores/storesettings.store.ts
// import create from 'zustand';

// // Định nghĩa kiểu cho state
// interface StoreSettingsState {
//   theme: 'light' | 'dark';
//   language: string;
//   setTheme: (theme: 'light' | 'dark') => void;
//   setLanguage: (language: string) => void;
// }

// // Tạo store với Zustand
// export const useStoreSettings = create<StoreSettingsState>((set) => ({
//   theme: 'light', // Mặc định là theme sáng
//   language: 'en', // Mặc định ngôn ngữ là tiếng Anh
  
//   // Hàm setTheme sẽ thay đổi theme của ứng dụng
//   setTheme: (theme) => set({ theme }),

//   // Hàm setLanguage sẽ thay đổi ngôn ngữ của ứng dụng
//   setLanguage: (language) => set({ language }),
// }));
