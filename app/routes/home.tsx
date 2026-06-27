import Navbar from "components/Navbar";
import type { Route } from "./+types/home";
import { ArrowRight, ArrowUpRight, Clock, Layers } from "lucide-react";
import Button from "components/ui/Button";
import Upload from "components/Upload";
import { useState } from "react";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  const [imageData, setImageData] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleUploadComplete = (base64Image: string) => {
    const newId = crypto.randomUUID();
    navigate(`/visualizer/${newId}`);
    return true;
  };
  return (
    <div className="home">
      <Navbar />

      <section className="hero">
        <div className="announce">
          <div className="dot">
            <div className="pulse"></div>
          </div>
          <p>Introducing Aura 3D</p>
        </div>
        <h1>Build timeless pieces at the speed of thought with Aura 3D.</h1>
        <p className="subtitle">
          Aura is an AI-first design environment that helps you visualise,
          render and ship projects faster than ever.
        </p>
        <div className="actions">
          <a href="#uploads" className="cta">
            Start Building <ArrowRight className="icon" />
          </a>
          <Button variant="outline" size="lg" className="demo">
            Watch demo
          </Button>
        </div>
        <div className="upload-shell" id="upload">
          <div className="grid-overlay" />
          <div className="upload-card">
            <div className="upload-head">
              <div className="upload-icon">
                <Layers className="icon" />
              </div>
              <h3>Upload your design</h3>
              <p>Supports PNG,JPG, formats up to 200MB</p>
            </div>
            <Upload
              onComplete={handleUploadComplete}
              setImageData={setImageData}
            />
          </div>
        </div>
      </section>

      <section className="projects">
        <div className="section-inner">
          <div className="section-head">
            <div className="copy">
              <h2>Projects</h2>
              <p>
                Your latest work and shared community projects all in one place.
              </p>
            </div>
          </div>
          <div className="projects-grid">
            <div className="project-card group">
              <div className="preview">
                <img src="ring-2d.jpeg" alt="ring-2d" />
                <div className="badge">
                  <span>Community</span>
                </div>
              </div>
              <div className="card-body">
                <div>
                  <h3>Project Gemstone</h3>
                  <div className="meta">
                    <Clock size={12} />
                    <span>
                      {new Date("2027-01-01").toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      })}
                    </span>
                    <span>By dinamex</span>
                  </div>
                </div>
                <div className="arrow">
                  <ArrowUpRight size="18" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
