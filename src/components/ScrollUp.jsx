import { GlobalContext } from "../contexts/GlobalState";
import { useContext } from "react";

const ScrollUp = () => {
  const { user } = useContext(GlobalContext);

  return (
    <section>
      {user.email && (
        <a href="#topOfPage" className="scroll-up">
          <i className="bi bi-caret-up"></i>
        </a>
      )}
    </section>
  );
};

export default ScrollUp;
