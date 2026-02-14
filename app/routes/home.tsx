import Navbar from "components/Navbar";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <h1 className="text-2xl text-indigo-600">Home</h1>
    </div>
  );
}
