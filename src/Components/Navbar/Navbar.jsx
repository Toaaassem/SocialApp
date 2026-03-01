import { MessagesSquare } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="bg-purple-200 fixed top-0 z-10 w-full p-4">
        <div className=" container flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Link to={"/"} className="flex gap-2 items-center">
              {" "}
              <MessagesSquare className="text-purple-800"/>
              <h2 className="text-2xl font-bold text-purple-900">Social App</h2>
            </Link>
          </div>

          <ul className="flex gap-3">
            <li>
              <Link to={"/register"} className="link text-purple-900">
                Register
              </Link>
            </li>
            <li>
              <Link to={"/login"} className="link text-purple-900">
                Login
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
