import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function index() {
  let location = useLocation();
  useEffect(() => {
    console.log(JSON.parse(location.state.creds));
  }, [location]);

  return <div>jembut</div>;
}
