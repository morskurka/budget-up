const PasswordSettingsPage = ({ name }) => {
  return (
    <section className="py-5 my-5">
      <div className="container">
        <h1 className="mb-5">Account Settings</h1>
        <div className="bg-white shadow rounded-lg d-block d-sm-flex">
          <div className="border border-right" style={{ minWidth: "250px" }}>
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
                  }}
                />
              </div>
              <h4 className="text-center">{name}</h4>
            </div>
            <div
              class="nav flex-column nav-pills"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <a
                class="nav-link active"
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
                Account
              </a>
              <a
                class="nav-link"
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
                Password
              </a>
              <a
                class="nav-link"
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
                Notification
              </a>
            </div>
          </div>
          <div class="tab-content" id="v-pills-tabContent">
            <div
              class="tab-pane fade show active"
              id="v-pills-Account"
              role="tabpanel"
              aria-labelledby="v-pills-Account-tab"
            >
              <div>
                <h3 className="mb-4">Account Settings</h3>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value="Kiran"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value="Acharya"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Email</label>
                      <input
                        type="text"
                        className="form-control"
                        value="kiranacharya287@gmail.com"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Phone number</label>
                      <input
                        type="text"
                        className="form-control"
                        value="+91 9876543215"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Company</label>
                      <input
                        type="text"
                        className="form-control"
                        value="Kiran Workspace"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Designation</label>
                      <input
                        type="text"
                        className="form-control"
                        value="UI Developer"
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Bio</label>
                      <textarea className="form-control" rows="4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Labore vero enim error similique quia numquam ullam
                        corporis officia odio repellendus aperiam consequatur
                        laudantium porro voluptatibus, itaque laboriosam
                        veritatis voluptatum distinctio!
                      </textarea>
                    </div>
                  </div>
                </div>
                <div>
                  <button className="btn btn-primary">Update</button>
                  <button className="btn btn-light">Cancel</button>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="v-pills-Password"
              role="tabpanel"
              aria-labelledby="v-pills-Password-tab"
            >
              <div>
                <h3 className="mb-4">Password Settings</h3>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Old password</label>
                      <input type="password" className="form-control" />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>New password</label>
                      <input type="password" className="form-control" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Confirm new password</label>
                      <input type="password" className="form-control" />
                    </div>
                  </div>
                </div>
                <div>
                  <button className="btn btn-primary">Update</button>
                  <button className="btn btn-light">Cancel</button>
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
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
                    <label className="form-check-label" for="notification1">
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
                    <label className="form-check-label" for="notification2">
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
                    <label className="form-check-label" for="notification3">
                      commodi fugiat molestiae tempora corporis. Sed dignissimos
                      suscipit
                    </label>
                  </div>
                </div>
                <div>
                  <button className="btn btn-primary">Update</button>
                  <button className="btn btn-light">Cancel</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PasswordSettingsPage;
