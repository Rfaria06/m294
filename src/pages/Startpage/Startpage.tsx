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
    <div className="container p-5">
      <div className="mb-3">
        <NavLink to={'/info'}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>Wichtige Info</TooltipTrigger>
              <TooltipContent>
                <p>Wichtige Info - Vor der Benotung beachten</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </NavLink>
      </div>
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
  );
}

export default Startpage;
