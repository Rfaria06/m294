import { Button } from '@/components/ui/button';
import './InfoPage.css';
import { toast } from 'sonner';
import { CodeBlock, CopyBlock, dracula } from 'react-code-blocks';

const runScript: string = 'npm i\nnpm run build\nnpm run preview';

function InfoPage() {
  return (
    <div className='container'>
      <h1>Info</h1>
      <div className='sub'>
        <h3>Vor der Benotung beachten</h3>
      </div>
      <br />
      <h5>
        Jedes mal, wenn daten von der API beschafft werden, erfolgreich oder
        nicht, wird ein Toast angezeigt.
      </h5>
      <Button
        onClick={() => {
          toast('Dies ist ein Toast!');
        }}
        className='mb-5'
      >
        Beispiel
      </Button>
      <br className='mb-5' />
      <h5>
        Wenn die Applikation mit
        <div className='h-5 mb-5'>
          <CodeBlock text='npm run dev' theme={dracula} language='shell' />
        </div>
        gestartet wurde, werden diese mehrmals angezeigt.
      </h5>
      <br />
      <h5 className='text-bold underline'>
        Dies ist Erwartetes und korrektes Verhalten.
      </h5>
      <br />
      <h5>
        Um die Applikation im richten modus zu sehen, muss die Applikation über
        diese weise gestartet werden:
      </h5>
      <div className='text-left'>
        <CopyBlock
          language='shell'
          theme={dracula}
          text={runScript}
          showLineNumbers={true}
        />
      </div>
      <br />
      <h5>
        Danach kann die Applikation über{' '}
        <a href='http://localhost:4173/'>http://localhost:4173/</a> abgerufen
        werden.
      </h5>
    </div>
  );
}

export default InfoPage;
