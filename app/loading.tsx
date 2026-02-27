export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#62A2F3] text-white">
      <div className="animate-spin h-12 w-12 border-4 border-white border-t-transparent rounded-full"></div>
      <p className="ml-4 text-lg">Loading SimPlain...</p>
    </div>
  );
}