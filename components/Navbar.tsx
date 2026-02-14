import { Gem } from "lucide-react";
import Button from "./ui/Button";

const Navbar = () => {
  const isSignedIn = false;
  const username = "Rahman";
  const handleAuth = async () => {
    
  };
  return (
    <header className="navbar">
      <nav className="inner">
        <div className="left">
          <div className="brand">
            <Gem className="logo" />
            <span className="name">Aura 3D</span>
          </div>
          <ul className="links">
            <a href="#">Product</a>
            <a href="#">Pricing</a>
            <a href="#">Community</a>
            <a href="#">Enterprise</a>
          </ul>
        </div>
        <div className="actions">
          {isSignedIn ? (
            <>
              <span className="greeting">
                {username ? `Hi ${username}` : "Signed In"}
              </span>
                <Button size="sm" className="btn" onClick={handleAuth}>Log Out</Button>
            </>
          ) : (
            <>
              <Button onClick={handleAuth} size="sm" variant="ghost">
                Log in
              </Button>
              <a href="#upload" className="cta">
                Get started
              </a>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
