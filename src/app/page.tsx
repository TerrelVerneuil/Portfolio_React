'use client'; // This is a client component
import React, { useState, useEffect } from "react";
import Loading from "./components/Loading"; // Import the Loading component from the correct path
// import Record from "./components/record";
import NameCard from "./components/Name_card";
import Navbar from "./components/Navbar";
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [terminalMode, setTerminalMode] = useState(true);
  interface Data {
    homepage: {
      message: string;
    }; 
  }
  const [, setData] = useState<Data | null>(null);
  useEffect(() => {
    setTimeout(() => {
      setData({ homepage: { message: "Hello, World!" }});
      setIsLoading(false); // Once data is fetched, set isLoading to false
    }, 2000); 
  }, []);

  // Function to toggle between terminal and normal mode
  // const toggleMode = () => {
  //   setTerminalMode(!terminalMode);
  // };
  
  return (
    <div>
      {isLoading ? (
        <Loading /> // Show loading component if data is still loading
      ) : (
        <>
          {terminalMode ? (
            // Terminal Mode
            <>
              <NameCard 
                name={"Terrel Verneuil"} 
                
                image={""} 
                description={"Versatile Software Developer with experience in both front-end and back-end development. Blends technical programming expertise with practical problem-solving skills to create efficient, user-friendly applications. Recent computer science graduate with hands-on experience through Moody's internships and professional roles, applying AWS cloud technologies and various programming languages to deliver valuable software solutions."}
                onExitTerminal={() => setTerminalMode(false)}
              />
              <div className="fixed bottom-4 right-4 z-50">
                <button 
                  onClick={() => setTerminalMode(false)}
                  className="bg-white text-black px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors shadow-lg"
                >
                  Exit Terminal Mode
                </button>
              </div>
            </>
          ) : (
            // Normal Mode with Navbar
            <div className="min-h-screen bg-gray-900 text-white">
              <Navbar onEnterTerminal={() => setTerminalMode(true)} />
              <div className="pt-20 p-8 max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold mb-8">Terrel Verneuil</h1>
                <img src="pp.jpeg" alt="Profile" className="w-64 h-64 rounded-full mx-auto mb-8 shadow-lg" />
                
                
                {/* About Section */}
                <section id="about" className="mb-16">
                  <h2 className="text-2xl font-semibold mb-4 text-blue-400">About Me</h2>
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <p className="mb-4">
                    Born and raised in Brooklyn, I am a versatile software engineer always ready to learn new technologies and experiment. My background combines formal computer science education with practical experience developing both front-end and back-end solutions. I bring a natural curiosity and problem-solving approach to every project, with a particular interest in creating applications that make a real-world impact.
                    </p>
                    
                  </div>
                </section>
                
                {/* Projects Section */}
                <section id="projects" className="mb-16">
                  <h2 className="text-2xl font-semibold mb-4 text-blue-400">Projects</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-800 p-6 rounded-lg">
                      <h3 className="text-xl font-medium mb-2">NYPD Weekly Crime Mapping</h3>
                      <p className="text-gray-300">Developed an interactive tool for visualizing crime data in New York City using Python for data acquisition and GeoJSON for mapping. The tool helps in analyzing and understanding crime patterns. Features include automatic data download, data cleaning, and interactive mapping with color-coded markers and clustering for better visualization. (*could expand to an application in future)</p>
                      <a href="https://github.com/TerrelVerneuil/NYC_Project" target="_blank" style={{ color: '#0066cc', textDecoration: 'underline' }}>Access Project Here</a>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg">
                      <h3 className="text-xl font-medium mb-2">localization Robotics Project</h3>
                      <p className="text-gray-300">Utilized the Anki Cozmo robotics platform to simulate the Kidnapped Robot Problem using Monte Carlo Localization. The robot used its rotation and location data to familiarize itself with its environment and determine its location after being “kidnapped.” <br></br>
                      <a href="https://terrelverneuil.github.io/CozmoProject/" target="_blank" style={{ color: '#0066cc', textDecoration: 'underline' }}>Access Project Here</a></p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg">
                      <h3 className="text-xl font-medium mb-2">Environmental Science Project</h3>
                      <p className="text-gray-300">Worked for Professor Natasha Gownaris in the pursuit of an innovative solution to streamline data collection
and management. This solution will not only benefit her research team but also contribute significantly to the
success of the PMI project. By collaborating closely with the USFWS, Professor Gownaris exemplifies a
commitment to environmental conservation and scientific advancement in the Gulf of Maine&apos;s ecosystem.<br></br>
<a href="https://github.com/TerrelVerneuil/ES-Project" target="_blank" style={{ color: '#0066cc', textDecoration: 'underline' }}>Access Project Here</a> </p>
                    </div>
                  </div>
                </section>
                
                {/* Skills Section */}
                <section id="skills" className="mb-16">
                  <h2 className="text-2xl font-semibold mb-4 text-blue-400">Skills</h2>
                  <div className="bg-gray-800 p-6 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Languages</h3>
                        <ul className="list-disc pl-5 text-gray-300">
                          <li>JavaScript</li>
                          <li>TypeScript</li>
                          <li>Python</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">Frontend</h3>
                        <ul className="list-disc pl-5 text-gray-300">
                          <li>React</li>
                          <li>Next.js</li>
                          <li>TailwindCSS</li>
                          <li>HTML/CSS</li>
                          <li>JavaScript</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">Backend</h3>
                        <ul className="list-disc pl-5 text-gray-300">
                          <li>Node.js</li>
                          <li>Java</li>
                          <li>SQL</li>
                          <li>Python</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-2">Tools</h3>
                        <ul className="list-disc pl-5 text-gray-300">
                          <li>Git</li>
                          <li>Docker</li>
                          <li>AWS</li>
                          <li>SSH</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </section>
                
                {/* Contact Section */}
                <section id="contact">
                  <h2 className="text-2xl font-semibold mb-4 text-blue-400">Contact</h2>
                  <div className="bg-gray-800 p-6 rounded-lg">
                  <p className="mb-1"><span className="text-blue-400">Email: </span><a href="mailto: terrelverneuil@gmail.com">terrelverneuil@gmail.com</a></p>
          <p className="mb-1"><span className="text-blue-400">GitHub: </span> <a href="https://github.com/TerrelVerneuil" target="_blank">https://github.com/TerrelVerneuil</a></p>
          <p className="mb-1"><span className="text-blue-400">LinkedIn: </span> <a href="https://www.linkedin.com/in/terrel-verneuil-63b706167/" target="_blank" >https://www.linkedin.com/in/terrel-verneuil-63b706167/</a></p>
                  </div>
                </section>
              </div>
              
              <footer className="bg-black p-4 text-center text-gray-400 text-sm mt-16">
                <p>© {new Date().getFullYear()} Terrel Verneuil. All rights reserved.</p>
              </footer>
              
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default App;