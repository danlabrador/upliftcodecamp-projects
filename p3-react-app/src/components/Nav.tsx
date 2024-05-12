import { Link } from 'react-router-dom';
import Logo from '../assets/images/logo-32.png';
import { ClipboardList, Home, LogOut } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from './ui/tooltip';
import { useLogout } from '../hooks/useLogout';

export function Nav() {
  const { handleLogout } = useLogout();

  return (
    <TooltipProvider>
      <nav className="flex justify-between p-4 border-b min-w-[65px] h-svh fixed bg-white z-10 border border-gray-200">
        <div className="w-full h-full overflow-hidden space-y-6">
          <Link to='/'>
            <img src={Logo} alt="Logo" className="object-cover mb-[28px]" />
          </Link>
          <div className="flex flex-col items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/dashboard"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/courses"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <ClipboardList className="h-5 w-5" />
                  <span className="sr-only">Courses</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Courses</TooltipContent>
            </Tooltip>
          </div>
          <div className="flex flex-col items-center gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <LogOut onClick={handleLogout} className="h-5 w-5" />
                  <span className="sr-only">Log Out</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Log Out</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </nav>
    </TooltipProvider>
  );
}
