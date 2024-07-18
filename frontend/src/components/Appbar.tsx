function Appbar() {
  return (
    <div>
      <div className="flex justify-between py-4 px-10 items-center">
        <div>
          <h1 className="font-semibold text-3xl">Medium</h1>
        </div>
        <div className="flex flex-col justify-center items-center bg-gray-500 rounded-full w-6 h-6 p-4">
          <p>P</p>
        </div>
      </div>
      <hr />
    </div>
  );
}

export default Appbar;
