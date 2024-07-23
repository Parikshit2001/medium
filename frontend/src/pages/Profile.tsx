import { Appbar, Avatar } from "../components";

function Profile() {
  return (
    <div>
      <Appbar />
      <div className="min-h-screen grid grid-cols-12">
        {/* Left Side */}
        <div className="col-span-8 flex flex-col items-center">
          <div className="w-full max-w-[640px] pl-20 pt-16 flex flex-col space-y-5">
            <div className="flex justify-between">
              <div>
                <h1 className="text-4xl font-bold">Parikshitgupta</h1>
              </div>
              <div>three dots</div>
            </div>
            <div className="border-b pb-9 relative">
              <div className="absolute flex space-x-3">
                <div className="border-b pb-3 border-b-black/30 selection:border-b-black">
                  <button>Home</button>
                </div>
                <div className="border-b border-b-black/30 pb-3">
                  <button>About</button>
                </div>
              </div>
            </div>
            <div className="border flex flex-col space-y-2 p-6">
              <div className="flex items-center space-x-1">
                <div>
                  <Avatar character="P" className="text-xs w-5 h-5"/>
                </div>
                <div>
                  <h2>Parikshitgutpa</h2>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold">Reading List</h1>
              </div>
              <div className="flex justify-between">
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
        {/* Right Side */}
        <div className="col-span-4 border-l-[1px] flex flex-col space-y-3 pt-10 pl-8">
          <div>

          <Avatar character="P" className="p-8 text-5xl" />
          </div>
          <div>
            <h3>Parikshitgupta</h3>
          </div>
          <div>
            <button className="text-xs font-semibold text-green-500">Edit Profile</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
