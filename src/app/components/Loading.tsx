import React, { useState, useEffect } from 'react';
// import Record from "./record";

const Loading = () => {
    const [commands, setCommands] = useState<string[]>([]);
    const [currentCommand, setCurrentCommand] = useState('');
    const [isComplete, setIsComplete] = useState(false);
    const [allowNavigation, setAllowNavigation] = useState(false);
    
    const commandList = [
        { text: "> Initializing system...", delay: 800 },
    ];
    
    // Typing effect for current command
    useEffect(() => {
        let commandIndex = 0;
        let charIndex = 0;
        
        const typeCommand = () => {
            if (commandIndex >= commandList.length) {
                setIsComplete(true);
                // Wait for a final delay before setting ready to navigate
                setTimeout(() => {
                    setAllowNavigation(true);
                }, 2000);
                return;
            }
            
            const command = commandList[commandIndex].text;
            const delay = commandList[commandIndex].delay;
            
            if (charIndex < command.length) {
                setCurrentCommand(command.substring(0, charIndex + 1));
                charIndex++;
                setTimeout(typeCommand, 50); // Typing speed
            } else {
                setTimeout(() => {
                    setCommands(prev => [...prev, command]);
                    setCurrentCommand('');
                    commandIndex++;
                    charIndex = 0;
                    typeCommand();
                }, delay); // Pause between commands
            }
        };
        
        typeCommand();
    }, []);
    
    // Handle navigation using window.location
    useEffect(() => {
        if (allowNavigation) {
            window.location.href = '/portfolio'; // Replace with your actual portfolio path
        }
    }, [allowNavigation]);
    
    // Handle keypress for navigation
    useEffect(() => {
        const handleKeyPress = () => {
            if (isComplete) {
                setAllowNavigation(true);
            }
        };
        
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [isComplete]);
    
    return (
        <div className="flex flex-col justify-center items-start h-screen bg-black p-8 font-mono">
            <div className="flex items-center mb-4">
                {/* <Record /> */}
                <p className="text-sm text-white-500 ml-4">Loading...Operation-Portfolio</p>
            </div>
            
            <div className="w-full max-w-2xl bg-black border border--500 p-4 rounded">
                {commands.map((cmd, index) => (
                    <div key={index} className="text-white-400 mb-1">{cmd}</div>
                ))}
                <div className="text-white-400 flex">
                    {currentCommand}
                    <span className={`ml-1 ${isComplete ? 'invisible' : 'animate-pulse'}`}>▋</span>
                </div>
                
                {/* {isComplete && (
                    <div className="mt-4 text-white animate-pulse">
                        Press any key to continue...
                    </div>
                )} */}
            </div>
        </div>
    );
};

export default Loading;