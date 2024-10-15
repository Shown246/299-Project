const Error = () => {
  return (
    <div className="flex">
      <div className="flex h-screen flex-col w-11/12 items-center justify-center font-sans text-blue-400">
        <h1 className="text-9xl font-bold">404</h1>
        <p className="mt-8 text-2xl">Page not found</p>
        <p className="mt-4 text-xl">
          Sorry, we could not find the page you are looking for.
        </p>
        <a
          href="/"
          className="mt-8 inline-flex items-center rounded-md bg-gray-800 px-4 py-2 text-white hover:bg-opacity-75"
        >
          {" "}
          ← Back to home{" "}
        </a>
      </div>
      <div className="flex items-center">
        <img src="Q2BAOd2.png" className="" />
      </div>
    </div>
  );
};

export default Error;