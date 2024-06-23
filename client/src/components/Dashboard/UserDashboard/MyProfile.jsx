import UseAuth from "../../../hooks/useAuth"
import useUser from "../../../hooks/useUser"
import ScaleLoader from "react-spinners/ScaleLoader";




const MyProfile = () => {
  const { user, loading } = UseAuth() || {}
  const [role, isLoading] = useUser();

  console.log(user)
  if (loading) return <ScaleLoader className="h-screen flex items-center justify-center" height={30} width={3} color="#F2A227" />
  return (
    <div className='flex justify-center items-center h-screen'>
      <div className='bg-white shadow-lg rounded-2xl w-3/5'>
        <img
          alt='profile'
          src='https://i.ibb.co/chZhDYM/design11-01-generated.jpg'
          className='w-full mb-4 rounded-t-lg h-36'
        />
        <div className='flex flex-col items-center justify-center p-4 -mt-16'>
          <a href='#' className='relative block'>
            <img
              alt='profile'
              src={user?.photoURL}
              className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
            />
          </a>

          <p className='p-2 uppercase px-4 text-xs text-white bg-pink-500 rounded-full'>
            {role}
          </p>
          <div className='w-full p-2 mt-4 rounded-lg'>
            <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
              <p className='flex flex-col'>
                Name
                <span className='font-bold text-black '>
                  {user?.displayName}
                </span>
              </p>
              <p className='flex flex-col'>
                Email
                <span className='font-bold text-black '>{user?.email}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile