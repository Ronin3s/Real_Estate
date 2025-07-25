
export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-12">
      <div className="w-12 h-12 rounded-full border-4 border-realestate-purple/30 border-t-realestate-purple animate-spin"></div>
      <p className="text-realestate-purple font-medium">Computing price prediction...</p>
    </div>
  );
}
