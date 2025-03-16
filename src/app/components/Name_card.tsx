import React, { useState, useEffect, useRef } from 'react';

interface NameCardProps {
  name: string;
  image: string;
  description: string;
  onExitTerminal: () => void;
}

type CommandOutput = {
  command: string;
  output: React.ReactNode;
  isError?: boolean;
};

const NameCard: React.FC<NameCardProps> = ({ name, description, onExitTerminal }) => {
  const [typedTitle, setTypedTitle] = useState('');
  const [typedDesc, setTypedDesc] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [titleComplete, setTitleComplete] = useState(false);
  const [initialComplete, setInitialComplete] = useState(false);
  const [commandHistory, setCommandHistory] = useState<CommandOutput[]>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandIndex, setCommandIndex] = useState(-1);
  const [inputHistory, setInputHistory] = useState<string[]>([]);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  
  useEffect(() => {
   
    if (typedTitle.length < name.length) {
      const timeout = setTimeout(() => {
        setTypedTitle(name.substring(0, typedTitle.length + 1));
      }, 5);
      return () => clearTimeout(timeout);
    }
    
    else if (!titleComplete) {
      setTitleComplete(true);
    }
    
    else if (typedDesc.length < description.length) {
      const timeout = setTimeout(() => {
        setTypedDesc(description.substring(0, typedDesc.length + 1));
      }, 5);
      return () => clearTimeout(timeout);
    }
    // Mark initial animation as complete
    else if (!initialComplete) {
      setInitialComplete(true);
      // Add the initial output to command history
      setCommandHistory([{
        command: 'cat profile.txt',
        output: (
          <div className="mb-6 pb-4">
            <div className="mb-4">
              <span className="text-blue-400">[NAME]</span>: {name}
            </div>
            <div className="whitespace-pre-wrap">
              <span className="text-blue-400">[INFO]</span>: {description}
            </div>
          </div>
        )
      }]);
    }
  }, [typedTitle, typedDesc, name, description, titleComplete, initialComplete]);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Focus the input field when clicking on the terminal
  useEffect(() => {
    const handleClick = () => {
      if (inputRef.current && initialComplete) {
        inputRef.current.focus();
      }
    };

    const terminalElement = terminalRef.current;
    if (terminalElement) {
      terminalElement.addEventListener('click', handleClick);
      return () => {
        terminalElement.removeEventListener('click', handleClick);
      };
    }
  }, [initialComplete]);

  
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  const processCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output: React.ReactNode;
    let isError = false;

    // Command processing logic
    if (trimmedCmd === 'help' || trimmedCmd === 'h') {
      output = (
        <div>
          <p className="mb-1">Available commands:</p>
          <p className="mb-1">- <span className="text-blue-300">help</span>: Show this help menu</p>
          <p className="mb-1">- <span className="text-blue-300">clear</span>: Clear the terminal</p>
          <p className="mb-1">- <span className="text-blue-300">cat profile.txt</span>: Show profile information</p>
          <p className="mb-1">- <span className="text-blue-300">ls</span>: List available files</p>
          <p className="mb-1">- <span className="text-blue-300">whoami</span>: Show current user</p>
          <p className="mb-1">- <span className="text-blue-300">contact</span>: Show contact information</p>
          <p className="mb-1">- <span className="text-blue-300">projects</span>: List projects</p>
          <p className="mb-1">- <span className="text-blue-300">skills</span>: List skills</p>
          <p className="mb-1">- <span className="text-blue-300">exit</span>: Exit terminal</p>
          <p className="mb-1">- <span className="text-blue-300">gui</span>: Switch to GUI mode</p>
          <p className='mb-1'>- <span className='text-blue-300'>Resume</span>: Access Terrel's Resume</p>
        </div>
      );
    } else if (trimmedCmd === 'clear' || trimmedCmd === 'cls') {
      setCommandHistory([]);
      return;
    } else if (trimmedCmd === 'cat profile.txt') {
      output = (
        <div>
          <div className="mb-4">
            <span className="text-blue-400">[NAME]</span>: {name}
          </div>
          <div className="whitespace-pre-wrap">
            <span className="text-blue-400">[INFO]</span>: {description}
          </div>
        </div>
      );
    } else if (trimmedCmd === 'ls') {
      output = (
        <div>
          <p className="text-blue-300">profile.txt</p>
          <p className="text-blue-300">projects.txt</p>
          <p className="text-blue-300">skills.txt</p>
          <p className="text-blue-300">contact.txt</p>
          <p className='text-blue-300'>resume.pdf</p>
        </div>
      );
    } else if (trimmedCmd === 'whoami') {
      output = <p>visitor@portfolio ~ $</p>;
    } else if (trimmedCmd === 'contact') {
      output = (
        <div>
          <p className="mb-1"><span className="text-blue-400">Email:</span><a href="mailto: terrelverneuil@gmail.com">terrelverneuil@gmail.com</a></p>
          <p className="mb-1"><span className="text-blue-400">GitHub:</span> <a href="https://github.com/TerrelVerneuil" target="_blank">https://github.com/TerrelVerneuil</a></p>
          <p className="mb-1"><span className="text-blue-400">LinkedIn:</span> <a href="https://www.linkedin.com/in/terrel-verneuil-63b706167/" target="_blank" >https://www.linkedin.com/in/terrel-verneuil-63b706167/</a></p>
        </div>
      );
    } else if (trimmedCmd === 'projects') {
      output = (
        <div>
          <p className="mb-2"><span className="text-blue-400">NYPD Weekly Crime Mapping</span> Developed an interactive tool for visualizing crime data in New York City using Python for data acquisition and GeoJSON for mapping. The tool helps in analyzing and understanding crime patterns. Features include automatic data download, data cleaning, and interactive mapping with color-coded markers and clustering for better visualization. (*could expand to an application in future)
          <a href="https://github.com/TerrelVerneuil/NYC_Project" target="_blank" style={{ color: '#0066cc', textDecoration: 'underline' }}>Access Project Here</a>
          </p>
          <p className="mb-2"><span className="text-blue-400">Environmental Science Project</span> Worked for Professor Natasha Gownaris in the pursuit of an innovative solution to streamline data collection
and management. This solution will not only benefit her research team but also contribute significantly to the
success of the PMI project. By collaborating closely with the USFWS, Professor Gownaris exemplifies a
commitment to environmental conservation and scientific advancement in the Gulf of Maine's ecosystem.
<a href="https://github.com/TerrelVerneuil/ES-Project" target="_blank" style={{ color: '#0066cc', textDecoration: 'underline' }}>Access Project Here</a> 
</p>
          <p className="mb-2"><span className="text-blue-400">Localization Robotics Project</span> Utilized the Anki Cozmo robotics platform to simulate the Kidnapped Robot Problem using Monte Carlo Localization. The robot used its rotation and location data to familiarize itself with its environment and determine its location after being “kidnapped.”
          <a href="https://terrelverneuil.github.io/CozmoProject/" target="_blank" style={{ color: '#0066cc', textDecoration: 'underline' }}>Access Project Here</a> 
</p>
        </div>
      );
    }else if (trimmedCmd === 'resume') {
      output = <p>Opening Terrel's Resume...</p>;
      // Add logic to open resume
      setTimeout(() => {
        window.open('/resume.pdf', '_blank');
      }, 1000);
    
    } else if (trimmedCmd === 'skills') {
      output = (
        <div>
          <p className="mb-1"><span className="text-blue-400">Languages:</span> JavaScript, TypeScript, Python</p>
          <p className="mb-1"><span className="text-blue-400">Frontend:</span> React, Next.js, TailwindCSS</p>
          <p className="mb-1"><span className="text-blue-400">Backend:</span> Node.js, Express, PostgreSQL</p>
          <p className="mb-1"><span className="text-blue-400">Tools:</span> Git, Docker, AWS</p>
        </div>
      );
    } else if (trimmedCmd === 'exit' || trimmedCmd === 'gui') {
      output = <p>Switching to GUI mode...</p>;
      // Add logic to exit terminal
      setTimeout(() => {
        onExitTerminal();
      }, 1000);
    } else if (trimmedCmd === '') {
      return;
    } else {
      output = <p>Command not found: {cmd}. Type 'help' for available commands.</p>;
      isError = true;
    }

    // Add command to history
    setCommandHistory(prev => [...prev, { command: cmd, output, isError }]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentCommand(e.target.value);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // Process the command
      processCommand(currentCommand);
      
      // Add to input history if not empty
      if (currentCommand.trim()) {
        setInputHistory(prev => [currentCommand, ...prev]);
      }
      
      // Reset command and index
      setCurrentCommand('');
      setCommandIndex(-1);
    } else if (e.key === 'ArrowUp') {
      // Navigate command history up
      e.preventDefault();
      if (inputHistory.length > 0) {
        const newIndex = Math.min(commandIndex + 1, inputHistory.length - 1);
        setCommandIndex(newIndex);
        setCurrentCommand(inputHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      // Navigate command history down
      e.preventDefault();
      if (commandIndex > 0) {
        const newIndex = commandIndex - 1;
        setCommandIndex(newIndex);
        setCurrentCommand(inputHistory[newIndex]);
      } else if (commandIndex === 0) {
        setCommandIndex(-1);
        setCurrentCommand('');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black flex flex-col font-mono text-white overflow-hidden">
      {/* Terminal header */}
      <div className="flex items-center justify-between p-2 border-b border-gray-700 bg-gray-900">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-xs text-gray-400">terminal - {name}'s portfolio</div>
        <div className="w-4"></div> {/* Spacer for alignment */}
      </div>

      <div ref={terminalRef} className="flex-1 p-4 overflow-auto">
        
        {!initialComplete ? (
          <div>
            <div className="mb-4">
              <span className="text-blue-400">$ </span>
              <span className="text-blue-300">cat </span>
              <span className="text-white">profile.txt</span>
            </div>

            <div className="mb-6 border-b border-gray-700 pb-4">
              <div className="mb-4">
                <span className="text-blue-400">[NAME]</span>: {typedTitle}
                {!titleComplete && showCursor && <span className="text-blue-400">▋</span>}
              </div>
              
              {titleComplete && (
                <div className="whitespace-pre-wrap">
                  <span className="text-blue-400">[INFO]</span>: {typedDesc}
                  {typedDesc.length < description.length && showCursor && <span className="text-blue-400">▋</span>}
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            {/* Command history */}
            {commandHistory.map((item, index) => (
              <div key={index} className="mb-4">
                <div className="mb-1">
                  <span className="text-blue-400">$ </span>
                  <span className={item.isError ? "text-red-400" : "text-white"}>{item.command}</span>
                </div>
                <div className={item.isError ? "text-red-400" : "text-white"}>
                  {item.output}
                </div>
              </div>
            ))}

            {/* Command input */}
            <div className="flex items-center">
              <span className="text-blue-400 mr-2">$ </span>
              <input
                ref={inputRef}
                type="text"
                value={currentCommand}
                onChange={handleInputChange}
                onKeyDown={handleInputKeyDown}
                className="flex-1 bg-transparent outline-none border-none text-white"
                autoFocus={initialComplete}
                aria-label="Terminal command input"
              />
              {showCursor && currentCommand.length === 0 && (
                <span className="text-blue-400 animate-pulse">▋</span>
              )}
            </div>
          </>
        )}
      </div>
      
      {/* Help hint */}
      {initialComplete && (
        <div className="p-2 border-t border-gray-700 text-gray-500 text-xs text-center">
          Type 'help' for available commands. Type 'gui' or 'exit' to switch to normal mode.
        </div>
      )}
      
      {/* Exit button */}
      <button 
        onClick={onExitTerminal}
        className="absolute top-4 right-4 bg-gray-800 text-white px-3 py-1 rounded text-xs hover:bg-gray-700 transition-colors"
      >
        Switch to GUI
      </button>
    </div>
  );
};

export default NameCard;