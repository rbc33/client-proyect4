import Lottie from 'react-lottie';
import animationData from '../assets/r.json';


const ErrorPage = () => {
    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
      }
    };
  return (
    <div className="flex justify-center items-center mt-10">
    <div className='h-200 w-300 bg-slate-500 rounded-lg'><Lottie  options={defaultOptions} /></div></div>
  )
}

export default ErrorPage