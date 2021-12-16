const ProfileSettingsPage = ({ name }) => {
  return (
    <section className="py-5 my-5" style={{ background: "#f9f9f9" }}>
      <div
        className="container"
        style={{
          width: "100%",
          paddingRight: "15px",
          paddingLeft: "15px",
          marginRight: "auto",
          marginLeft: "auto",
          maxWidth: "1140px",
        }}
      >
        <h1 className="mb-5">Account Settings</h1>
        <div className="bg-white shadow rounded-1 d-sm-flex">
          <div className="border-end" style={{ minWidth: "250px" }}>
            <div className="p-4">
              <div className="text-center mb-3">
                <img
                  src="mor.png"
                  alt="Image"
                  className="shadow"
                  style={{
                    height: "100px",
                    width: "100px",
                    borderRadius: "100%",
                    border: "5px solid #ffff",
                    boxShadow: "0 2px 10px rgb(0 0 0 / 10%)",
                  }}
                />
              </div>
              <h4 className="text-center">{name}</h4>
            </div>
            <div
              className="nav flex-column nav-pills"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <a
                className="nav-link active"
                id="v-pills-Account-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-Account"
                role="tab"
                aria-controls="v-pills-Account"
                aria-selected="true"
                style={{
                  padding: "15px 20px",
                  borderBottom: "1px solid #ddd",
                  borderRadius: "0",
                  color: "#333",
                }}
              >
                <i className="bi bi-person-fill pe-1"></i>
                Account
              </a>
              <a
                className="nav-link"
                id="v-pills-Password-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-Password"
                role="tab"
                aria-controls="v-pills-Password"
                aria-selected="false"
                style={{
                  padding: "15px 20px",
                  borderBottom: "1px solid #ddd",
                  borderRadius: "0",
                  color: "#333",
                }}
              >
                <i className="bi bi-key-fill pe-1"></i>
                Password
              </a>
              <a
                className="nav-link"
                id="v-pills-Notification-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-Notification"
                role="tab"
                aria-controls="v-pills-Notification"
                aria-selected="false"
                style={{
                  padding: "15px 20px",
                  borderBottom: "1px solid #ddd",
                  borderRadius: "0",
                  color: "#333",
                }}
              >
                <i className="bi bi-bell-fill pe-1"></i>
                Notification
              </a>
            </div>
          </div>
          <div className="tab-content p-4 p-md-5" id="v-pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="v-pills-Account"
              role="tabpanel"
              aria-labelledby="v-pills-Account-tab"
            >
              <div>
                <h3 className="mb-4">Account Settings</h3>
                <form className="row d-flex g-4 needs-validation" noValidate>
                  <div className="col-md-6">
                    <label htmlFor="validationCustom01" className="form-label">
                      First name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom01"
                      required
                    />
                    <div className="valid-feedback"></div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="validationCustom02" className="form-label">
                      Last name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom02"
                      required
                    />
                    <div className="valid-feedback"></div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="validationCustom03" className="form-label">
                      Email address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom03"
                      required
                    />
                    <div className="invalid-feedback">
                      Please provide a valid Email address.
                    </div>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="validationCustom04" className="form-label">
                      State
                    </label>
                    <select
                      className="form-select"
                      id="validationCustom04"
                      required
                    >
                      <option defaultValue disabled value="">
                        Choose...
                      </option>
                      <option>...</option>
                    </select>
                    <div className="invalid-feedback">
                      Please select a valid state.
                    </div>
                  </div>
                  <div className="col-md-3">
                    <label htmlFor="validationCustom05" className="form-label">
                      Zip
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="validationCustom05"
                      required
                    />
                    <div className="invalid-feedback">
                      Please provide a valid zip.
                    </div>
                  </div>
                  <div className="col-12">
                    <label htmlFor="validationCustom03" className="form-label">
                      Gender :
                    </label>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault1"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault1"
                      >
                        Male
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="flexRadioDefault"
                        id="flexRadioDefault2"
                        defaultChecked
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioDefault2"
                      >
                        Female
                      </label>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex gap-4">
                      <button className="btn btn-primary">Update</button>
                      <button className="btn btn-light">Cancel</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-Password"
              role="tabpanel"
              aria-labelledby="v-pills-Password-tab"
            >
              <div>
                <h3 className="mb-4">Password Settings</h3>
                <form className="row g-4 needs-validation" noValidate>
                  <div className="col-md-6">
                    <label htmlFor="validationCustom01" className="form-label">
                      Old password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword"
                    />
                    <div className="valid-feedback"></div>
                  </div>
                  <div className="col-md-6"></div>
                  <div className="col-md-6">
                    <label htmlFor="validationCustom02" className="form-label">
                      New password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword"
                    />
                    <div className="valid-feedback"></div>
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="validationCustom03" className="form-label">
                      Confirm new password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword"
                    />
                    <div className="invalid-feedback"></div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex gap-4">
                      <button className="btn btn-primary">Update</button>
                      <button className="btn btn-light">Cancel</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="v-pills-Notification"
              role="tabpanel"
              aria-labelledby="v-pills-Notification-tab"
            >
              <div>
                <h3 className="mb-4">Notification Settings</h3>
                <div className="form-group">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="notification1"
                    />
                    <label className="form-check-label" htmlFor="notification1">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Dolorum accusantium accusamus, neque cupiditate quis
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="notification2"
                    />
                    <label className="form-check-label" htmlFor="notification2">
                      hic nesciunt repellat perferendis voluptatum totam porro
                      eligendi.
                    </label>
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="notification3"
                    />
                    <label className="form-check-label" htmlFor="notification3">
                      commodi fugiat molestiae tempora corporis. Sed dignissimos
                      suscipit
                    </label>
                  </div>
                </div>
                <div className="col-12 pt-5">
                  <div className="d-flex gap-4">
                    <button className="btn btn-primary">Update</button>
                    <button className="btn btn-light">Cancel</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileSettingsPage;
