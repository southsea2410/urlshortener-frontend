import { Link } from "@tanstack/react-router";

const activeProps = {
  className: "font-bold",
};

const defaultProps = {
  className: "hover:border-b-2 hover:border-gray-300",
};

type AnalyticsHeaderProps = {
  title: string;
};

export default function AnalyticsHeader({ title }: AnalyticsHeaderProps) {
  return (
    <header className="relative flex w-full items-center justify-between px-8 py-6 text-center max-md:mr-1 max-md:max-w-full">
      <h1 className="my-auto self-stretch text-4xl font-extrabold leading-none">
        {title}
      </h1>
      <nav className="flex items-start gap-5 self-stretch">
        <Link to="/" {...defaultProps} activeProps={activeProps}>
          Home
        </Link>
        <Link to="/myurls" {...defaultProps} activeProps={activeProps}>
          My URLs
        </Link>
      </nav>
    </header>
  );
}
