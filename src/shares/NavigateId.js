import { useNavigate } from "react-router-dom";

export const NavigateId = ({ url, value }) => {
  const navigate = useNavigate();

  return (
    <label className="nav-link" onClick={() => navigate(url)}>
      {value}
    </label>
  );
};
