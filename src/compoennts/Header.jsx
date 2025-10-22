import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const navigation = [
  { name: "Home", to: "/" },
  { name: "About", to: "/about" },
];

const Header = () => {
  const { currentUser } = useSelector((state) => state.auth);
  // console.log("Current User in Header:", currentUser);
  return (
    <header className="bg-amber-500 h-[10vh]">
      <nav aria-label="Top" className="mx-auto max-w-7xl h-full">
        <div className="flex  items-center justify-between border-b border-indigo-500 h-full lg:border-none">
          <div className="flex items-center">
            <a href="#">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=white"
                className="h-10 w-auto"
              />
            </a>
            <div className="ml-10 hidden space-x-8 lg:block">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className="text-base font-medium text-white hover:text-indigo-50">
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div>
            {currentUser ? (
              <Link to={"/profile"}>
                <img
                  src={currentUser?.avatar}
                  className="h-15 w-15 rounded-full border-2 border-amber-700 object-cover p-[1px]"
                />
              </Link>
            ) : (
              <div className="ml-10 space-x-4">
                <Link
                  to="/login"
                  className="inline-block rounded-md border border-transparent bg-indigo-500 px-4 py-2 text-base font-medium text-white hover:bg-indigo-500/75">
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="inline-block rounded-md border border-transparent bg-white px-4 py-2 text-base font-medium text-indigo-600 hover:bg-indigo-50">
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 py-4 lg:hidden">
          {navigation.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-base font-medium text-white hover:text-indigo-50">
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
