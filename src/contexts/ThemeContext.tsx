// import React, { createContext, useContext } from 'react';

// // Simplified ThemeContext without theme-switching functionality
// interface ThemeContextProps {
//   // Empty interface as we're removing theme functionality
// }

// const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   // Set document to always use light theme
//   React.useEffect(() => {
//     // Remove dark class if it exists
//     document.documentElement.classList.remove('dark');
//   }, []);

//   return (
//     <ThemeContext.Provider value={{}}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export const useTheme = (): ThemeContextProps => {
//   const context = useContext(ThemeContext);
//   if (context === undefined) {
//     throw new Error('useTheme must be used within a ThemeProvider');
//   }
//   return context;
// };
