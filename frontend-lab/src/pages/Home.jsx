import { useEffect, useState } from "react";

export default function Home() {
  const [width, setWidth] = useState(() => window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section>
      <h1>Welcome to Frontend Lab</h1>

      <p>
        This is a React Single Page Application built using Vite and React
        Router.
      </p>

      <p>Viewport width: {width}px</p>
    </section>
  );
}
