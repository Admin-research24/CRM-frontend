import loadable from '@loadable/component';
const Login = loadable(() => import('../components/form/LoginForm'));

export default function LoginPage() {
  return (
    <section className="flex justify-center items-center h-screen">
      <div className="max-w-lg w-full p-7 border border-border shadow-md rounded-md">
        <h1 className="mb-6 text-3xl text-primary text-center tracking-tight font-bold">
          <img className='ml-44' src="./src/assets/ogb-logo.svg" alt="" />
          <h2 className='text-black mt-3'>Hello! let's get started</h2>
          <span className='text-[#000000B2]'>Sing in to Continue</span>
        </h1>
        <Login />
      </div>
    </section>
  );
}