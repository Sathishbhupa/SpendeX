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
      <div>
        <button className=" border-2 rounded-3xl ml-4 mr-3 p-2" onClick={toggleDarkMode}>
          {isDarkMode ? <Sun className="w-4" /> : <Moon className="w-4" />}
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