import { Link } from "@remix-run/react";
import homecss from "../styles/home.css"
export function links() {
  return [{ rel: "stylesheet", href: homecss }];
}

export default function Index() {
  return (
    <main id = "content">
      <h1>Keep track of your notes</h1>
      <p>never lose track of your notes again</p>
      <p id="cta">
        <Link to="/notes">View Notes</Link>
      </p>
    </main>
  );
}
