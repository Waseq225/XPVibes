
import './App.css'

function App() {


  return (
    <div>
      <header className='p-4 flex'>
        {/* Logo and Name */}
        <a href='' className='flex items-center gap-1 basis-1/4'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z" />
          </svg>
          <span className='font-bold text-2xl'>
            VibeCheck
          </span>
        </a>

        {/* Search widget */}
        <div className='basis-1/2 px-40 justify-stretch place-content-center'>
          <div className='flex border border-gray-300 rounded-full py-4 px-6 shadow-md shadow-gray-300 justify-between'>
            <div className='text-xl'> Search artist, event, venue, location</div>

            <button className='ml-3 bg-searchButton text-white p-1 rounded-full'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>

            </button>
          </div>
        </div>
        {/* Login/SignUp */}
        <div className='basis-1/4'>

          <div className='flex  py-6 px-8 gap-5 justify-end'>
            <div className=''>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
            </div>
            <div className=''>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8">
                <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z" clipRule="evenodd" />
              </svg>

            </div>
          </div>
        </div>
      </header>
      {/* Categories */}
      <div className='flex gap-2 rounded-xl place-content-center'>

        <a href='' className='hover:border-b-2 border-indigo-500'>Concerts</a>

        <div className='border-l border-gray-300'></div>
        <a href='' className='hover:border-b-2 border-indigo-500'>Sports</a>

        <div className='border-l border-gray-300'></div>
        <a href='' className='hover:border-b-2 border-indigo-500'>Art&Theatre</a>

        <div className='border-l border-gray-300'></div>
        <a href='' className='hover:border-b-2 border-indigo-500'>Family</a>
      </div>
    </div>
  )
}

export default App

