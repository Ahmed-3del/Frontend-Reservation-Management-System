import { Sparkles } from 'lucide-react';
import React from 'react';

function layout({ children }: { children: React.ReactNode }) {
  return (

    <main className="flex min-h-screen w-full">
      <div className="flex max-w-[580px] flex-1 flex-col justify-center px-10 pt-24 md:p-28">
        {children}
      </div>
      <div className="relative hidden flex-1 rounded-sm bg-gradient-to-br from-[#C2B8FF] to-[#765FFF] lg:flex">
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
          <Sparkles className="size-24 text-white" />
        </div>
        <div className="absolute inset-x-12 bottom-32">
          <p className="text-xl leading-relaxed text-white">
        Welcome to our hotel reservation platform! We offer a seamless and convenient way to book your stay at the best hotels around the world. Whether you’re traveling for business or leisure, our platform provides a wide range of options to suit your needs. Enjoy exclusive deals, easy booking, and exceptional customer service. Your perfect getaway is just a few clicks away!
          </p>
        </div>
      </div>
    </main>
  );
}

export default layout;
