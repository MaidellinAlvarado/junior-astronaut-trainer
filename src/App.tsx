import { useState, useEffect } from 'react';

export default function App() {
  const [sol, setSol] = useState(1);
  const [oxygen, setOxygen] = useState(100); 
  const [energy, setEnergy] = useState(100); 
  const [timeLeft, setTimeLeft] = useState(10);
  const [activeEvent, setActiveEvent] = useState(false);
  const [eventtype, setEventType] = useState<'solar' | 'dust'>('solar');
  const [gameOver, setGameOver] = useState<string | null>(null);
  const [gameWon, setGameWon] = useState(false);
  const [message, setMessage] = useState('¡Estación Artemis lista para la aventura galáctica!');
  const [explorerState, setExplorerState] = useState('🌟 Flotando y explorando la galaxia');

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
    setTimeLeft(10);

    const states = [
      '🌟 Navegando entre nebulosas estelares',
      '🪐 Explorando anillos planetarios',
      '🌠 Recolectando polvo de estrellas',
      '🛰️ Activando escudos de energía cósmica'
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
    setEnergy(prev => Math.max(0, prev - 15)); // <-- Cambiamos 'prev' por 'energy' o usamos 'prev => Math.max(0, prev - 15)'
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
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans select-none">
      
      {/* ================= stilo mario galaxy ================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Nebulosas de fondo */}
        <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-blue-600/30 rounded-full blur-[160px] animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[700px] h-[700px] bg-purple-600/30 rounded-full blur-[160px] animate-pulse"></div>
        <div className="absolute top-[25%] right-[10%] w-[500px] h-[500px] bg-cyan-400/20 rounded-full blur-[140px]"></div>

        {/* Rayo de luz diagonal */}
        <div className="absolute -top-40 -left-40 w-[800px] h-[200px] bg-gradient-to-r from-cyan-400/40 via-blue-500/20 to-transparent rotate-45 blur-3xl pointer-events-none"></div>

        {/* Estrellas de fondo */}
        <div className="absolute inset-0 opacity-90 bg-[radial-gradient(#ffffff_1.8px,transparent_1.8px)] [background-size:32px_32px]"></div>

    --- 
        {/* Izquierda superior */}
        <div className="absolute top-16 left-10 text-5xl animate-[bounce_3s_infinite] filter drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]">
          ⭐
        </div>
        {/* Izquierda media */}
        <div className="absolute top-1/2 left-8 text-6xl animate-pulse filter drop-shadow-[0_0_20px_rgba(14,165,233,0.8)]">
          🪐
        </div>
        {/* Izquierda inferior */}
        <div className="absolute bottom-16 left-12 text-5xl animate-[pulse_2s_infinite]">
          🛸
        </div>

        {/* Derecha superior */}
        <div className="absolute top-20 right-12 text-6xl animate-[bounce_4s_infinite] filter drop-shadow-[0_0_20px_rgba(192,132,252,0.8)]">
          🌙
        </div>
        {/* Derecha media */}
        <div className="absolute top-1/2 right-10 text-5xl animate-pulse filter drop-shadow-[0_0_15px_rgba(250,204,21,0.8)]">
          ✨
        </div>
        {/* Derecha inferior */}
        <div className="absolute bottom-20 right-10 text-6xl animate-[bounce_3.5s_infinite]">
          👨‍🚀🚀
        </div>
      </div>
      {/* ===================================================================================================== */}

      {/* Contenedor Principal */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-lg space-y-6">
        
        {/* Personaje central y Título Galaxy */}
        <div className="text-center space-y-3">
          <div className="relative inline-flex items-center justify-center p-5 bg-gradient-to-tr from-cyan-400/40 via-blue-600/40 to-purple-600/40 border-4 border-cyan-300 rounded-full shadow-[0_0_50px_rgba(34,211,238,0.8)] animate-[bounce_2s_infinite]">
            <span className="text-6xl filter drop-shadow-[0_0_20px_rgba(255,255,255,1)] inline-block">
              👩‍🚀⭐
            </span>
            <div className="absolute -bottom-2 px-3.5 py-1 bg-yellow-400 text-slate-950 font-black text-xs rounded-full uppercase tracking-widest shadow-xl">
              ¡SUPER ESTRELLA!
            </div>
          </div>
          
          <div className="inline-block bg-indigo-950/80 px-4 py-1.5 rounded-full border-2 border-cyan-400 shadow-lg">
            <p className="text-cyan-200 text-sm font-extrabold tracking-wide">
              {explorerState}
            </p>
          </div>

          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-white drop-shadow-[0_5px_15px_rgba(6,182,212,0.8)] tracking-wide">
            ARTEMIS GALAXY - Sol {sol} / 10
          </h1>
        </div>

        {/* Panel de Control Estilo Cúpula Espacial */}
        <div className="w-full bg-indigo-950/85 border-4 border-cyan-400/60 shadow-[0_0_70px_rgba(14,165,233,0.4)] p-8 space-y-6 backdrop-blur-2xl rounded-3xl relative overflow-hidden">
          
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-cyan-400 via-yellow-400 to-purple-500"></div>

          {/* Temporizador Galáctico */}
          <div className="flex justify-between items-center bg-slate-950/80 p-4 rounded-2xl border-2 border-cyan-400/40 shadow-inner">
            <span className="text-sm text-cyan-200 font-extrabold tracking-wide flex items-center gap-2">
              <span className="text-xl">⏱️</span> Siguiente Sol en:
            </span>
            <span className="font-mono text-yellow-300 font-black text-2xl animate-pulse drop-shadow-[0_0_15px_rgba(250,204,21,0.9)]">
              {timeLeft}s
            </span>
          </div>

          <h2 className="text-sm font-black text-yellow-300 uppercase tracking-widest border-b-2 border-cyan-900/80 pb-2 flex items-center gap-2">
            <span>🌌</span> ESTADO DE RECURSOS CÓSMICOS
          </h2>

          {/* Oxígeno */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-extrabold">
              <span className="text-slate-100 flex items-center gap-1.5 text-base">🫁 Oxígeno Estelar</span>
              <span className="text-cyan-300 font-mono text-lg">{oxygen}%</span>
            </div>
            <div className="w-full bg-slate-950/80 rounded-full h-4 p-0.5 border-2 border-cyan-400/50 shadow-inner overflow-hidden">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-teal-300 h-full rounded-full transition-all duration-500 shadow-[0_0_20px_rgba(6,182,212,1)]" 
                style={{ width: `${oxygen}%` }}
              ></div>
            </div>
          </div>

          {/* Energía */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm font-extrabold">
              <span className="text-slate-100 flex items-center gap-1.5 text-base">⚡ Energía Cósmica</span>
              <span className="text-yellow-400 font-mono text-lg">{energy}%</span>
            </div>
            <div className="w-full bg-slate-950/80 rounded-full h-4 p-0.5 border-2 border-yellow-400/50 shadow-inner overflow-hidden">
              <div 
                className="bg-gradient-to-r from-amber-500 to-yellow-300 h-full rounded-full transition-all duration-500 shadow-[0_0_20px_rgba(250,204,21,1)]" 
                style={{ width: `${energy}%` }}
              ></div>
            </div>
          </div>

          {/* Botones de Acción */}
          <div className="space-y-3 pt-3 border-t-2 border-cyan-900/80">
            <p className="text-xs font-black text-yellow-300 tracking-wider uppercase">
              🎮 CONTROLES DE LA NAVE:
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={handleRepairEnergy}
                className="py-4 px-4 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-sm rounded-2xl shadow-lg shadow-amber-950/80 transform active:scale-95 transition-all border-2 border-yellow-200"
              >
                ⚡ Reparar Energía
              </button>
              <button 
                onClick={handleRecycleAir}
                className="py-4 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-black text-sm rounded-2xl shadow-lg shadow-cyan-950/80 transform active:scale-95 transition-all border-2 border-cyan-200"
              >
                ♻️ Reciclar Aire
              </button>
            </div>
          </div>

          {/* Consola de Mensajes */}
          <div className="bg-slate-950/80 p-4 rounded-2xl border-2 border-cyan-400/30 text-center shadow-inner">
            <p className="text-sm text-cyan-200 font-mono font-bold tracking-wide leading-relaxed">
              {message}
            </p>
          </div>

          {/* Evento de Emergencia */}
          {activeEvent && (
            <div className="bg-gradient-to-br from-amber-950/95 to-red-950/95 border-4 border-yellow-400 p-5 rounded-2xl space-y-4 shadow-[0_0_40px_rgba(250,204,21,0.6)] animate-bounce">
              <div className="flex items-center space-x-3">
                <span className="text-3xl">⭐⚠️</span>
                <h3 className="text-yellow-300 font-black text-base uppercase tracking-wider">
                  {eventtype === 'solar' ? '¡TORMENTA DE RAYOS CÓSMICOS!' : '¡TORMENTA DE POLVO ESTELAR!'}
                </h3>
              </div>
              <p className="text-sm text-slate-100 leading-relaxed font-bold">
                {eventtype === 'solar' 
                  ? '¡Un tanque de oxígeno estelar se soltó en la órbita exterior durante la tormenta!' 
                  : '¡El polvo cósmico está bloqueando los paneles solares de la base!'}
              </p>
              <div className="space-y-2 pt-1">
                <button 
                  onClick={handleEventChoiceA} 
                  className="w-full py-3 px-4 bg-yellow-400 hover:bg-yellow-300 text-slate-950 font-black text-xs rounded-xl text-left shadow-md transition"
                >
                  {eventtype === 'solar' ? '🔍 Salir a buscarlo (-8% oxígeno, recuperas +20%)' : '🧹 Limpiar paneles (-10% energy, recuperas +25%)'}
                </button>
                <button 
                  onClick={handleEventChoiceB} 
                  className="w-full py-3 px-4 bg-transparent border-2 border-red-400 text-red-200 hover:bg-red-950/50 font-black text-xs rounded-xl text-left transition"
                >
                  ❌ Activar escudos y permanecer a salvo
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Atribución de la NASA */}
        <footer className="text-center text-xs text-cyan-300/80 font-semibold tracking-wide">
          Simulador educativo basado en misiones Artemis y registros de clima espacial (NASA DONKI).
        </footer>

      </div>

    </div>
  );
}