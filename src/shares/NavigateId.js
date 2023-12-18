import { useNavigate } from "react-router-dom";

export const NavigateId = ({ url, value }) => {
  const navigate = useNavigate();

  return (
    <span className="nav-link" onClick={() => navigate(url)}>
      {value}
    </span>
  );
};
