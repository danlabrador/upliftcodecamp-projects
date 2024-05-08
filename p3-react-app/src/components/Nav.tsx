import { Link } from 'react-router-dom';
import Logo from '../assets/images/logo-32.png';
import { Home } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from './ui/tooltip';

export function Nav() {
  return (
    <TooltipProvider>
      <nav className="flex justify-between p-4 border-b min-w-[65px] h-svh fixed bg-white z-10 border border-gray-200">
        <div className="w-full h-full overflow-hidden">
          <img src={Logo} alt="Logo" className="object-cover mb-[28px]" />
          <div className="flex flex-col items-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  to="/"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </nav>
    </TooltipProvider>
  );
}
