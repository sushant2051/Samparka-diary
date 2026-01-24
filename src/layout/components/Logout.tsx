import { useNavigate } from "react-router";
import { Button } from "../../components/Button";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log("user is log out");
    navigate("");
  };
  return <Button variant="secondary" label="Logout" onClick={handleLogout} />;
};

export default Logout;
