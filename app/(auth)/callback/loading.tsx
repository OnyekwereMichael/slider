"use client"

const AuthLoading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <div className="w-[280px]">
                <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div className="absolute left-0 top-0 h-full w-1/3 rounded-full bg-black animate-slide" />
                </div>

                <p className="mt-4 text-center text-sm text-gray-500 font-medium">
                    Authenticating...
                </p>
            </div>

            <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(400%);
          }
        }

        .animate-slide {
          animation: slide 1.5s ease-in-out infinite;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
        }
      `}</style>
        </div>
    );
};

export default AuthLoading;