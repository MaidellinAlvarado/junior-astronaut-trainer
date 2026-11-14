import { useState, useEffect } from 'react';

export default function App() {
  const [sol, setSol] = useState(1);
  const [oxygen, setOxygen] = useState(100); 
  const [energy, setEnergy] = useState(100); 
  const [timeLeft, setTimeLeft] = useState(5);
  const [activeEvent, setActiveEvent] = useState(false);
  const [eventtype, setEventType] = useState<'solar' | 'dust'>('solar');
  const [gameOver, setGameOver] = useState<string | null>(null);
  const [gameWon, setGameWon] = useState(false);
  const [message, setMessage] = useState('¡Estación Artemis lista para la aventura galáctica!');
  const [explorerState, setExplorerState] = useState('Flotando y explorando la galaxia');

  // Generador de sonido  usando api de donki tiempo real.
  const playAlarmSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      oscillator.type = 'sawtooth'; 
      oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); 
      oscillator.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.2); 

      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);

      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.4);
    } catch (e) {
      console.log("Audio no soportado o bloqueado por el navegador", e);
    }
  };

  // Efecto de sonido y animación cuando se activa una alerta 
  useEffect(() => {
    if (activeEvent) {
      playAlarmSound();
    }
  }, [activeEvent]);

  const advanceDay = () => {
    const nextSol = sol + 1;

    if (nextSol > 10) {
      setGameWon(true);
      return;
    }

    const nextOxygen = Math.max(0, Number((oxygen - 3.5).toFixed(1)));
    const nextEnergy = Math.max(0, energy - 12);

    if (nextOxygen === 0) {
      setGameOver('¡Se agotó el oxígeno estelar! La tripulación no pudo completar el viaje.');
      return;
    }
    if (nextEnergy === 0) {
      setGameOver('¡Apagón total en el observatorio! La base se quedó sin energía.');
      return;
    }

    setSol(nextSol);
    setOxygen(nextOxygen);
    setEnergy(nextEnergy);
    setTimeLeft(5);

    const states = [
      '🌟 Navegando hacia nuevos sistemas estelares',
      '🪐 Sigue avanzando estamos Surcando junto a anillos planetarios gigantes',
      '🌠 Avanzando a través de nebulosas lejanas',
      '🛰️ Explorando la frontera cósmica profunda'
    ];
    setExplorerState(states[Math.floor(Math.random() * states.length)]);

    if (nextSol === 3) {
      setEventType('solar');
      setActiveEvent(true);
    }
    if (nextSol === 7) {
      setEventType('dust');
      setActiveEvent(true);
    }
  };

  useEffect(() => {
    if (gameOver || gameWon || activeEvent) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          advanceDay();
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [sol, oxygen, energy, gameOver, gameWon, activeEvent]);

  const handleRepairEnergy = () => {
    if (energy >= 100) {
      setMessage('⚡ ¡Los paneles solares están al máximo de energía cósmica!');
      return;
    }
    setEnergy(prev => Math.min(100, prev + 20));
    setOxygen(prev => Math.max(0, Number((prev - 4).toFixed(1))));
    setExplorerState('⚡ Recargando energía con rayos solares');
    setMessage('🔧 ¡Paneles reparados! +20% Energía (-4% Oxígeno).');
  };

  const handleRecycleAir = () => {
    if (oxygen >= 100) {
      setMessage('🟢 ¡La reserva de oxígeno estelar está al 100%!');
      return;
    }
    if (energy < 15) {
      setMessage('⚠️ ¡No hay suficiente energía para activar los filtros!');
      return;
    }
    setOxygen(prev => Math.min(100, Number((prev + 15).toFixed(1))));
    setEnergy(prev => Math.max(0, prev - 15));
    setMessage('♻️ ¡Filtros estelares activados! +15% Oxígeno (-15% Energía).');
  };

  const handleEventChoiceA = () => {
    if (eventtype === 'solar') {
      const reducedOxygen = oxygen - 8;
      if (reducedOxygen <= 0) {
        setGameOver('Te quedaste sin oxígeno buscando el tanque en la tormenta estelar.');
        return;
      }
      setOxygen(Math.min(100, Number((reducedOxygen + 20).toFixed(1))));
      setMessage('🌟 ¡Increíble! Encontraste el tanque flotando en el espacio.');
    } else {
      const reducedEnergy = energy - 10;
      if (reducedEnergy <= 0) {
        setGameOver('Te quedaste sin energía limpiando los cristales de polvo estelar.');
        return;
      }
      setEnergy(Math.min(100, reducedEnergy + 25));
      setMessage('✨ ¡Cristales limpios! Energía cósmica restaurada.');
    }
    setActiveEvent(false);
    setTimeLeft(10);
  };

  const handleEventChoiceB = () => {
    setActiveEvent(false);
    setTimeLeft(10);
    setMessage('🛡️ Decidiste activar los escudos y permanecer a salvo.');
  };

  const resetGame = () => {
    setSol(1);
    setOxygen(100);
    setEnergy(100);
    setTimeLeft(10);
    setActiveEvent(false);
    setGameOver(null);
    setGameWon(false);
    setExplorerState('🌟 Iniciando viaje galáctico');
    setMessage('¡Nueva aventura estelar iniciada! Buena suerte.');
  };

  if (gameWon) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-500/30 via-indigo-950 to-black"></div>
        <div className="relative z-10 w-full max-w-lg bg-indigo-950/90 border-4 border-yellow-400 shadow-[0_0_90px_rgba(250,204,21,0.7)] p-10 text-center space-y-6 backdrop-blur-2xl rounded-3xl">
          <div className="text-8xl animate-bounce">🌟🏆🌟</div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-amber-200 to-yellow-400 tracking-wider">
            ¡GALAXIA SALVADA!
          </h1>
          <p className="text-slate-100 text-base leading-relaxed font-bold">
            ¡Magnífico trabajo, comandante! Superaste con éxito los 10 Soles navegando por el espacio profundo. ¡Eres un héroe galáctico!
          </p>
          <button onClick={resetGame} className="w-full py-4 px-6 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black text-lg rounded-2xl shadow-xl transition transform hover:scale-105">
            Jugar de Nuevo 🚀
          </button>
        </div>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        <div className="absolute inset-0 bg-red-950/70 animate-pulse"></div>
        <div className="relative z-10 w-full max-w-lg bg-slate-900/95 border-4 border-red-500 shadow-[0_0_80px_rgba(239,68,68,0.7)] p-10 text-center space-y-6 backdrop-blur-2xl rounded-3xl">
          <div className="text-8xl animate-bounce">🌠💥</div>
          <h1 className="text-4xl font-black text-red-500 tracking-wider">MISIÓN INTERRUMPIDA</h1>
          <p className="text-slate-200 text-base leading-relaxed font-bold">{gameOver}</p>
          <button onClick={resetGame} className="w-full py-4 px-6 bg-red-600 hover:bg-red-500 text-white font-black text-lg rounded-2xl shadow-xl transition">
            Volver a Intentarlo 🚀
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between p-4 relative overflow-hidden font-sans select-none">
      
      {/* Animaciones CSS personalizadas */}
      <style>{`
        @keyframes forwardTravel {
          0% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-14px) scale(1.04); }
          100% { transform: translateY(0px) scale(1); }
        }
        @keyframes scrollStars {
          from { background-position: 0 0; }
          to { background-position: 0 1000px; }
        }
        @keyframes driftPlanetLeft {
          0% { transform: translate(-100px, -50px) rotate(0deg); opacity: 0.25; }
          50% { transform: translate(100px, 80px) rotate(180deg); opacity: 0.55; }
          100% { transform: translate(-100px, -50px) rotate(360deg); opacity: 0.25; }
        }
        @keyframes driftPlanetRight {
          0% { transform: translate(100px, 60px) rotate(0deg); opacity: 0.25; }
          50% { transform: translate(-120px, -80px) rotate(-180deg); opacity: 0.55; }
          100% { transform: translate(100px, 60px) rotate(-360deg); opacity: 0.25; }
        }
        .animate-travel {
          animation: forwardTravel 3s ease-in-out infinite;
        }
        .bg-stars-moving {
          background-image: radial-gradient(#ffffff 2px, transparent 2px);
          background-size: 50px 50px;
          animation: scrollStars 15s linear infinite;
        }
        .planet-giant-1 {
          animation: driftPlanetLeft 18s ease-in-out infinite;
        }
        .planet-giant-2 {
          animation: driftPlanetRight 22s ease-in-out infinite;
        }
      `}</style>

      {/* Fondo Inmersivo */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 opacity-70 bg-stars-moving"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[700px] h-[700px] bg-blue-600/20 rounded-full blur-[180px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[700px] h-[700px] bg-purple-600/20 rounded-full blur-[180px] animate-pulse"></div>

        <div className="absolute top-10 left-[-40px] md:left-10 text-[9rem] md:text-[14rem] planet-giant-1 filter drop-shadow-[0_0_50px_rgba(14,165,233,0.5)] z-0 select-none">
          🪐
        </div>
        <div className="absolute bottom-16 right-[-40px] md:right-10 text-[9rem] md:text-[14rem] planet-giant-2 filter drop-shadow-[0_0_50px_rgba(250,204,21,0.5)] z-0 select-none">
          🌍
        </div>
      </div>

      {/* ZONA SUPERIOR */}
      <div className="relative z-10 flex flex-col items-center pt-4 space-y-2">
        <div className="flex items-center justify-between w-full max-w-2xl px-6">
          <div className="bg-indigo-950/80 px-4 py-2 rounded-2xl border-2 border-cyan-400 shadow-lg backdrop-blur-md">
            <span className="text-cyan-300 font-extrabold text-sm">ARTEMIS GALAXY - Sol {sol} / 10</span>
          </div>
          <div className="bg-slate-900/80 px-4 py-2 rounded-2xl border-2 border-yellow-400 shadow-lg backdrop-blur-md flex items-center gap-2">
            <span className="text-xs text-yellow-300 font-bold">SIGUIENTE SOL:</span>
            <span className="font-mono text-yellow-400 font-black text-lg animate-pulse">{timeLeft}s</span>
          </div>
        </div>

        <div className="relative my-3 flex flex-col items-center h-28 justify-center z-10">
          <div className="text-8xl animate-travel filter drop-shadow-[0_0_40px_rgba(34,211,238,0.9)]">
            👨‍🚀🚀
          </div>
          <div className="mt-1 px-4 py-1 bg-indigo-950/95 border-2 border-cyan-400 rounded-full shadow-[0_0_25px_rgba(34,211,238,0.6)] z-20">
            <p className="text-cyan-200 text-xs font-black tracking-wide">
              {explorerState}
            </p>
          </div>
        </div>
      </div>

{/* POP-UP  con INFORMACION DEL EVENTO */}
{activeEvent && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fadeIn">
    <div className="bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-900 border-4 border-yellow-400 p-6 rounded-3xl max-w-lg w-full shadow-[0_0_80px_rgba(250,204,21,0.6)] space-y-3">
      
      {/* Cabecera */}
      <div className="flex items-center justify-between border-b border-yellow-500/40 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-3xl animate-bounce">
            {eventtype === 'solar' ? '☀️' : '🌪️'}
          </span>
          <div>
            <h3 className="text-yellow-300 font-black text-xs uppercase tracking-wider">
              {eventtype === 'solar' ? '¡Alerta: Tormenta Solar!' : '¡Alerta: Polvo Estelar!'}
            </h3>
            <span className="text-[10px] text-cyan-300 font-mono font-bold">MISIÓN EDUCATIVA ARTEMIS</span>
          </div>
        </div>
        <span className="text-[10px] bg-cyan-600 text-white px-2 py-0.5 rounded-full font-mono font-bold">INFO ESPACIAL</span>
      </div>

      {/* Contenido Explicativo estilo*/}
      <div className="bg-slate-950/90 p-3.5 rounded-2xl border-2 border-cyan-500/40 space-y-2 text-left">
        <div>
          <span className="text-[11px] text-yellow-400 font-black">🧠 ¿Qué es?: </span>
          <p className="text-[11px] text-cyan-100 leading-tight">
            {eventtype === 'solar' 
              ? '¡Una ráfaga de energía gigante que disparó el Sol! Viaja por el espacio y trae mucha electricidad.' 
              : '¡Una nube de pequeñas partículas cósmicas flotando en el camino que ensucia nuestros paneles!'}
          </p>
        </div>

        <div>
          <span className="text-[11px] text-yellow-400 font-black">🛡️ Protocolo a seguir: </span>
          <p className="text-[11px] text-cyan-100 leading-tight">
            {eventtype === 'solar' 
              ? 'Proteger los equipos y activar los escudos espaciales para cuidar la energía.' 
              : 'Limpiar los cristales y paneles solares para recuperar la fuerza de la base lunar.'}
          </p>
        </div>

        <div className="pt-1 flex items-center justify-between border-t border-cyan-900/60 mt-1">
          <span className="text-[9px] text-slate-400 italic">
            Datos reales de la base de datos de la NASA (DONKI).
          </span>
          <a 
            href="https://ccmc.gsfc.nasa.gov/DONKI/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[10px] text-cyan-300 hover:text-cyan-200 font-bold underline flex items-center gap-1"
          >
            🔍 Saber más
          </a>
        </div>
      </div>

      <p className="text-xs text-slate-100 font-black text-center pt-1">
        ¿Qué acción tomará nuestro equipo, Comandante?
      </p>

      {/* Botones de decisión */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <button 
          onClick={handleEventChoiceA} 
          className="py-2.5 px-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 font-black text-xs rounded-2xl shadow-lg transition transform active:scale-95"
        >
          {eventtype === 'solar' ? '🔍 Buscar Tanque (+20% O2)' : '🧹 Limpiar Paneles (+25% Energía)'}
        </button>
        <button 
          onClick={handleEventChoiceB} 
          className="py-2.5 px-3 bg-slate-900 border-2 border-red-500 text-red-200 hover:bg-slate-800 font-black text-xs rounded-2xl transition transform active:scale-95"
        >
          🛡️ Activar Escudos
        </button>
      </div>

    </div>
  </div>
)}

      {/* ZONA INFERIOR */}
      <div className="relative z-10 w-full max-w-2xl mx-auto bg-indigo-950/90 border-4 border-cyan-400/70 shadow-[0_0_50px_rgba(14,165,233,0.5)] p-4 backdrop-blur-xl rounded-3xl space-y-3 mb-1">
        
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1 bg-slate-950/70 p-2.5 rounded-2xl border border-cyan-500/40">
            <div className="flex justify-between text-xs font-extrabold">
              <span className="text-cyan-200 flex items-center gap-1">🫁 Oxígeno</span>
              <span className="text-cyan-300 font-mono">{oxygen}%</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2.5 p-0.5 border border-cyan-400/40">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-teal-300 h-full rounded-full transition-all duration-500 shadow-[0_0_15px_rgba(6,182,212,0.9)]" 
                style={{ width: `${oxygen}%` }}
              ></div>
            </div>
          </div>

          <div className="space-y-1 bg-slate-950/70 p-2.5 rounded-2xl border border-yellow-500/40">
            <div className="flex justify-between text-xs font-extrabold">
              <span className="text-yellow-200 flex items-center gap-1">⚡ Energía</span>
              <span className="text-yellow-400 font-mono">{energy}%</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-2.5 p-0.5 border border-yellow-400/40">
              <div 
                className="bg-gradient-to-r from-amber-500 to-yellow-300 h-full rounded-full transition-all duration-500 shadow-[0_0_15px_rgba(250,204,21,0.9)]" 
                style={{ width: `${energy}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-2">
          <div className="bg-slate-950/90 py-2 px-3 rounded-2xl border border-cyan-400/30 text-center flex-1 w-full">
            <p className="text-xs text-cyan-200 font-mono font-bold">
              {message}
            </p>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <button 
              onClick={handleRepairEnergy}
              className="flex-1 md:flex-none py-2.5 px-3 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs rounded-2xl shadow-lg transition transform active:scale-95 border-2 border-yellow-200"
            >
              ⚡ Reparar
            </button>
            <button 
              onClick={handleRecycleAir}
              className="flex-1 md:flex-none py-2.5 px-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-xs rounded-2xl shadow-lg transition transform active:scale-95 border-2 border-cyan-200"
            >
              ♻️ Reciclar
            </button>
          </div>
        </div>

        <div className="text-center pt-1 border-t border-cyan-900/60">
          <span className="text-[10px] text-cyan-300/70 font-semibold">
            Simulador educativo basado en misiones Artemis y registros de clima espacial (<a href="https://ccmc.gsfc.nasa.gov/tools/DONKI/" target="_blank" rel="noopener noreferrer" className="underline hover:text-cyan-200">NASA DONKI</a>).
          </span>
        </div>

      </div>

    </div>
  );
}