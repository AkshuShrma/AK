import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "./Header";

function Company() {
  const initData = {
    companyname: "",
    companyaddress: "",
    country: "",
    gst: 0,
    designation: "",
    leave: 0,
  };

  const [companies, setCompanies] = useState(null);
  const [companyForm, setCompanyForm] = useState({});

  const ChangeHandler = (event) => {
    setCompanyForm({
      ...companyForm,
      [event.target.name]: event.target.value,
    });
  };

  useEffect(() => {
    getAll();
  }, []);

  function getAll() {
    //let token = JSON.parse(localStorage.getItem("currentUser")).token;
    //console.log(token);
    axios
      .get("https://localhost:7228/api/company/get")
      .then((d) => {
        if (d.data) {
          setCompanies(d.data);
        } else {
          alert(d.data.message);
        }
      })
      .catch((e) => {
        alert("Something is wrong in api");
      });
  }
  function renderCompanies() {
    let companyRows = [];
    companies?.map((item) => {
      companyRows.push(
        <tr>
          <td>{item.companyName}</td>
          <td>{item.companyAddress}</td>
          <td>{item.country}</td>
          <td>{item.gst}</td>
          <td>{item.leave}</td>
          <td>{item.designation}</td>
          <td>
            <button
              onClick={() => EditClick(item)}
              data-target="#editModal"
              data-toggle="modal"
              className="btn btn-info m-1"
            >
              Edit
            </button>
            <button
              //   onClick={() => deleteClick(item.id)}
              className="btn btn-primary"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
    return companyRows;
  }
  function EditClick(item) {
    //employeeForm(data);
    setCompanyForm(item);
  }
  const saveClick = () => {
    let token = JSON.parse(localStorage.getItem("currentUser")).token;
    axios
      .post("https://localhost:7228/api/company/post", companyForm, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((d) => {
        if (d.data) {
          getAll();
          companyForm("Data Saved");
          setCompanyForm(initData);
        } else {
          alert("Data Not Saved");
        }
      })
      .catch((e) => {
        alert("wrong in api");
      });
  };
  return (
    <div>
      <Header />
      <div className="row">
        <div className="col-8 text-left m-2">
          <h2 className="text-primary">Company List</h2>
        </div>
        <br />
        <div className="col-3">
          <br />
          <button
            className="btn btn-info form-control"
            data-toggle="modal"
            data-target="#newModal"
          >
            New Company
          </button>
        </div>
      </div>
      <div className="col-9 m-2 p-2">
        <table className="table table-bordered table-striped table-active">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Country</th>
              <th>Designation</th>
              <th>Leave</th>
              <th>Gst</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{renderCompanies()}</tbody>
        </table>
      </div>
      {/* Save */}
      <form>
        <div class="modal" id="newModal" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              {/* <!-- Header --> */}
              <div class="modal-header">
                <div class="modal-tittle text-primary">New Company</div>
                <button class="close" data-dismiss="modal">
                  <span>&times;</span>
                </button>
              </div>
              {/* <!-- Body --> */}
              <div class="modal-body">
                <div class="form-group row">
                  <label for="txtname" class=" text-success col-sm-4">
                    Name
                  </label>
                  <div class="col-8">
                    <input
                      type="text"
                      id="txtcompanyname"
                      name="CompanyName"
                      onChange={ChangeHandler}
                      value={companyForm.CompanyName}
                      placeholder="Enter Name"
                      className="form-control"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="txtaddress" class="text-success col-sm-4">
                    Address
                  </label>
                  <div class="col-8">
                    <input
                      type="text"
                      id="txtcompanyaddress"
                      name="CompanyAddress"
                      onChange={ChangeHandler}
                      value={companyForm.CompanyAddress}
                      placeholder="Enter Address"
                      className="form-control"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="txtcountry" class="text-success col-sm-4">
                    Country
                  </label>
                  <div class="col-8">
                    <input
                      type="text"
                      id="txtcountry"
                      name="Country"
                      onChange={ChangeHandler}
                      value={companyForm.Country}
                      placeholder="Enter Country"
                      className="form-control"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="txtgst" class="text-success col-sm-4">
                    GST
                  </label>
                  <div class="col-4">
                    <input
                      type="number"
                      id="txtgst"
                      name="Gst"
                      onChange={ChangeHandler}
                      value={companyForm.Gst}
                      placeholder="Enter GST"
                      className="form-control"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="txtdesignation" class="text-success col-sm-4">
                    Designation
                  </label>
                  <div class="col-4">
                    <input
                      type="text"
                      id="txtdesignation"
                      name="Designation"
                      onChange={ChangeHandler}
                      value={companyForm.Designation}
                      placeholder="Enter Designation"
                      className="form-control"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="txtleave" class="text-success col-sm-4">
                    Approve Leave
                  </label>
                  <div class="col-4">
                    <input
                      type="text"
                      id="txtleave"
                      name="Leave"
                      onChange={ChangeHandler}
                      value={companyForm.Leave}
                      placeholder="Enter Leave"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              {/* <!-- Footer --> */}
              <div class="modal-footer">
                <button
                  onClick={saveClick}
                  class="btn btn-success"
                  data-dismiss="modal"
                >
                  Save
                </button>
                <button class="btn btn-info" data-dismiss="modal">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
      {/* <!-- Edit --> */}
      <form>
        <div class="modal" id="editModal" role="dialog">
          <div class="modal-dialog">
            <div class="modal-content">
              {/* <!-- Header --> */}
              <div class="modal-header">
                <div class="modal-tittle text-primary">Edit Company</div>
                <button class="close" data-dismiss="modal">
                  <span>&times;</span>
                </button>
              </div>
              {/* <!-- Body --> */}
              <div class="modal-body">
                <div class="form-group row">
                  <label for="txtname" class=" text-success col-sm-4">
                    Name
                  </label>
                  <div class="col-8">
                    <input
                      type="text"
                      id="txtname"
                      name="Name"
                      onChange={ChangeHandler}
                      value={companyForm.Name}
                      placeholder="Enter Name"
                      className="form-control"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="txtaddress" class="text-success col-sm-4">
                    Address
                  </label>
                  <div class="col-8">
                    <input
                      type="text"
                      id="txtaddress"
                      name="Address"
                      onChange={ChangeHandler}
                      value={companyForm.Address}
                      placeholder="Enter Address"
                      className="form-control"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="txtaccountnumber" class="text-success col-sm-4">
                    AccountNumber
                  </label>
                  <div class="col-8">
                    <input
                      type="number"
                      id="txtaccountnumber"
                      name="AccountNumber"
                      onChange={ChangeHandler}
                      value={companyForm.AccountNumber}
                      placeholder="Enter AccountNumber"
                      className="form-control"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="txtpfaccountnumber" class="text-success col-sm-4">
                    PFAccountNumber
                  </label>
                  <div class="col-8">
                    <input
                      type="number"
                      id="txtpfaccountnumber"
                      name="PFAccountNumber"
                      onChange={ChangeHandler}
                      value={companyForm.PFAccountNumber}
                      placeholder="Enter PFAccountNumber"
                      className="form-control"
                    />
                  </div>
                </div>
                <div class="form-group row">
                  <label for="txtleave" class="text-success col-sm-4">
                    Apply Leave
                  </label>
                  <div class="col-4">
                    <input
                      type="text"
                      id="txtleave"
                      name="Leave"
                      onChange={ChangeHandler}
                      value={companyForm.Leave}
                      placeholder="Enter Leave"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              {/* <!-- Footer --> */}
              <div class="modal-footer">
                <button
                  //onClick={updateClick}
                  class="btn btn-success"
                  data-dismiss="modal"
                  data-toggle="modal"
                >
                  Update
                </button>
                <button class="btn btn-info" data-dismiss="modal">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Company;
