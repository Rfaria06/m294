import { NavLink } from 'react-router-dom';
import './Startpage.css';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

function Startpage() {
  return (
    <div className="w-half">
      <div className="mb-3 grid-cols-2 place-content-center">
        <NavLink to={'/info'} className="m-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>Wichtige Info</TooltipTrigger>
              <TooltipContent>
                <p>Wichtige Info - Vor der Benotung beachten</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </NavLink>
        <NavLink to={'/login'} className="m-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>Login</TooltipTrigger>
              <TooltipContent>
                <p>Beispiel für eine Login- Page</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </NavLink>
      </div>
      <div className="container p-5">
        <h1>M294</h1>
        <div className="sub">
          <h3>React - Frontend</h3>
        </div>
        <br />
        <h5>
          Um den Source code, commit history und weiteres zu sehen, klicken sie
          auf "Dokumentation" in der Navigationsleiste
        </h5>
        <br />
        <p>Über das Menü "Tabellen" können die Daten zugegriffen werden</p>
      </div>
    </div>
  );
}

export default Startpage;
