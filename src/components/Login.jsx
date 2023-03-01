import { Form, NavLink, useActionData, useNavigation } from "react-router-dom";

const Login = () => {
  const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <main>
      <section className="vh-100 ">
        <div className="mask d-flex align-items-center h-100 ">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: 15 }}>
                  <div className="card-body p-5">
                    <h4 className="text-uppercase text-center mb-5">Log in</h4>
                    {data && <p className="text-danger">{data.code}</p>}
                    <Form method="post">
                      <div className="form-floating mb-4">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          className="form-control form-control-lg"
                          required
                          placeholder="Email "
                        />
                        <label className="form-label" htmlFor="email">
                          Email
                        </label>
                      </div>

                      <div className="form-floating mb-4">
                        <input
                          type="password"
                          id="password"
                          name="password"
                          className="form-control form-control-lg"
                          required
                          placeholder="Password"
                        />
                        <label className="form-label" htmlFor="password">
                          Password
                        </label>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          className="btn btn-success btn-block btn-lg  text-white w-100"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Logging in..." : "Log in"}
                        </button>
                      </div>

                      <p className="text-center text-muted mt-5 mb-0">
                        No account yet?
                        <NavLink to="/signup" className="fw-bold text-body">
                          <u>Sign up here</u>
                        </NavLink>{" "}
                      </p>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Login;
