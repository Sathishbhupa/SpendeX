import React from 'react';
import { UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { Moon, Sun } from 'lucide-react';

function DashboardHeader() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark');
  };

  return (
    <div className={`p-5 flex justify-between ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex relative">
      <button className="shadow-lg mr-3 bg-neutral-950 rounded-full p-2 flex items-center justify-center transition-all duration-300" onClick={toggleDarkMode}>
          <div className={`w-10 h-5 flex items-center rounded-full ${isDarkMode ? 'bg-lime-500' : 'bg-gray-300'} transition-all duration-300`}>
            <div className={`w-6 h-6 bg-white rounded-full items-center shadow-md transform ${isDarkMode ? 'translate-x-5' : 'translate-x-0'} transition-transform duration-300`}>
              {isDarkMode ? <Sun className="w-4 ml-1" /> : <Moon className="w-4 ml-1" />}
            </div>
          </div>
        </button>
        <UserButton
          afterSignOut={() => {
            router.push('/');
          }}
        />
      </div>
    </div>
    
  );
}

export default DashboardHeader;
