import { memo } from "react";
import "./index.scss";
import HeaderPage from "../Header/HeaderPage";
import FooterPage from "../Footer/FooterPage";
const MasterLayout = ({ children, ...props }) => {
  return (
    <div {...props} className="container__master">
      <div className="header__container">
        <HeaderPage></HeaderPage>
      </div>
      {children}
      <div className="footer__container">
        <FooterPage></FooterPage>
      </div>
    </div>
  );
};
export default memo(MasterLayout);
