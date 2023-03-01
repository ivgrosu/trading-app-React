import { FcNeutralTrading } from "react-icons/fc";
import { Form, NavLink, useRouteLoaderData } from "react-router-dom";

const MainNavigation = () => {
  const uid = useRouteLoaderData("root");

  return (
    <div className="d-flex justify-content-around align-items-center text-center mt-4 w-100 mx-auto">
      <NavLink to="/">
        <FcNeutralTrading size={40} />
        <h6 className="mt-2 ">
          <strong>Trading</strong> <span className="text-muted">Master</span>
        </h6>
      </NavLink>
      {uid ? (
        <div>
          <Form action="/logout" method="post">
            <button className="btn btn-dark">Logout</button>
          </Form>
        </div>
      ) : (
        <div className="">
          <NavLink to="/login">
            <button className="btn btn-success btn-block  text-white">
              Login
            </button>
          </NavLink>
          <NavLink to="/signup">
            <button className="btn btn-primary btn-block  text-white m-3">
              Sign up
            </button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default MainNavigation;
