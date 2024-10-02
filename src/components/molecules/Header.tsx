import { Button } from "flowbite-react";

export default function Header() {
  return (
    <header className="relative flex w-full items-center justify-between px-10 pt-8 text-center max-md:mr-1 max-md:max-w-full">
      <h1 className="z-0 my-auto self-stretch text-4xl font-extrabold leading-none">
        Nam URL Shortener
        <span className="absolute left-[110px] top-1.5 z-0 h-6 w-2.5 self-start text-sm font-light leading-6 text-white text-opacity-50">
          ®
        </span>
      </h1>
      <nav className="z-0 my-auto flex items-start gap-5 self-stretch">
        <Button>Login</Button>
        <Button>Register</Button>
      </nav>
    </header>
  );
}
