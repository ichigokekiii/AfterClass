import { useEffect, useState } from 'react';

type TypewriterTextProps = {
  text: string;
  speedMs?: number;
  className?: string;
  onComplete?: () => void;
};

export function TypewriterText({ text, speedMs = 65, className, onComplete }: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);

    let index = 0;
    const intervalId = window.setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));

      if (index >= text.length) {
        window.clearInterval(intervalId);
        setDone(true);
        onComplete?.();
      }
    }, speedMs);

    return () => window.clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- restart only when text changes
  }, [text, speedMs]);

  return (
    <p className={className} aria-live="polite">
      {displayed}
      {!done ? <span className="typewriter-text__cursor" aria-hidden="true" /> : null}
    </p>
  );
}
