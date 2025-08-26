const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h2 className="text-6xl">L</h2>
      <div className="max-w-[250px] w-full flex items-center justify-center">
        <div className="relative inline-flex">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
      <h2 className="text-6xl">...........</h2>
    </div>
  );
};

export default Loading;