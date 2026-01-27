import { FaReact } from 'react-icons/fa';
import { SiTypescript, SiTailwindcss, SiVite } from 'react-icons/si';
import daisyUI from "../assets/daisyui-logo-2000.png"

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-base-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="card bg-base-200 shadow-lg mb-8">
          <div className="card-body">
            <h2 className="card-title text-2xl text-primary mb-4">About the App</h2>
            <div className="space-y-4">
              <div>
                <p className="text-base-content/80 text-xl">
                  A SPA React application built with TypeScript, Vite, and Tailwind CSS. The interface is fully responsive
                  and accessible, with customizable themes powered by DaisyUI.
                </p>
              </div>
             
            </div>
          </div>
        </div>

        <div className="card bg-base-200 shadow-lg ">
          <div className="card-body">
            <h2 className="card-title text-2xl text-primary mb-6">Technology Stack</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              
              <div className="flex flex-col items-center text-center">
                <FaReact className="text-4xl text-blue-400 mb-2" />
                <h3 className="font-semibold">React 19</h3>
                <p className="text-sm text-base-content/70">Modern UI framework</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <SiTypescript className="text-4xl text-blue-600 mb-2" />
                <h3 className="font-semibold">TypeScript</h3>
                <p className="text-sm text-base-content/70">Static typing</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <SiTailwindcss className="text-4xl text-cyan-400 mb-2" />
                <h3 className="font-semibold">Tailwind CSS 4</h3>
                <p className="text-sm text-base-content/70">Utility-first styles</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <SiVite className="text-4xl text-purple-500 mb-2" />
                <h3 className="font-semibold">Vite</h3>
                <p className="text-sm text-base-content/70">Fast build tool</p>
              </div>

              <div className="flex flex-col items-center text-center">
                {/* <div className="text-4xl text-pink-500 mb-2">🎨</div> */}
                <img src={daisyUI} alt="daisyUI logo" className="size-10 mb-1" />
                <h3 className="font-semibold">DaisyUI</h3>
                <p className="text-sm text-base-content/70">UI Components</p>
              </div>

            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default AboutPage;
