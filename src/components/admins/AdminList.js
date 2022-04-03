import React, { useEffect, useState } from "react";
import "./AdminList.css";
import SearchBar from "../common/SearchBar";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import UpdateAdmin from "../common/UpdateAdmin";
import { Button } from "@mui/material";

function AdminList(props) {
  //DESTRUCTURING PROPS
  const {
    delteMultipleRecord,
    sendDataToDelete,
    sendToParent,
    adminData,
    onSelectedAll,
    sendSearchedDataToParent,
  } = props;
  const [checkedDataArr, setNewData] = useState([]);
  const [singleCheckBoxClicked, setSingleCheckboxClick] = useState(false);
  const [openModal, setOpenModal] = useState({ open: false, id: null });
  //Modal open handler
  const openSnackBar = (id) => {
    setOpenModal({ open: true, id });
  };
  //CHECK BOX HANDLER
  const checkBoxHandler = (event) => {
    const { name, checked } = event.target;
    if (name === "allSelect") {
      setSingleCheckboxClick(false);
      let allSelectedData = adminData.map((data) => {
        return { ...data, isChecked: checked };
      });
      setNewData(allSelectedData);
    } else {
      setSingleCheckboxClick(true);
      let checkedData = adminData.map((data) => {
        return data.name === name ? { ...data, isChecked: checked } : data;
      });
      setNewData(checkedData);
    }
  };
  //SETTING THE NEWLY CHECKED ARRAY TO ADMIN DATA

  useEffect(() => {
    onSelectedAll(checkedDataArr);
  }, [checkedDataArr, onSelectedAll]);

  //CLEAN CODE
  let filter = adminData.filter((admin) => admin?.isChecked !== true).length;

  //OPEN UPDATE ADMIN MODAL
  const updateAdmin = (id) => {
    openSnackBar(id);
  };
  //FORWARDING UPDATED ADMIN TO PARENT
  const sentUpdatedData = (updatedAdminData) => {
    sendToParent(updatedAdminData, openModal.id);
  };
  //SELECTED ROW TO UPDATE
  const updatingRowData = (rows, id) => {
    return rows.find((data) => data.id === id);
  };
  //DELETE SINGLE ADMIN
  const deleteAdmin = (id) => {
    sendDataToDelete(id);
  };
  //DELETE MULTIPLE ADMINS
  const deleteSelectedAdmins = () => {
    delteMultipleRecord(checkedDataArr, singleCheckBoxClicked);
  };
  //Forwardin the searched data to parent for filtering
  const sendSearchedData = (value) => {
    sendSearchedDataToParent(value);
  };

  let contentToDisplay = (
    <div>
      <table>
        <tbody>
          <tr key={Math.floor(Math.random() * 10)}>
            <td>
              <input
                type="checkbox"
                className="checkbox-wrapper"
                name="allSelect"
                checked={!filter}
                onChange={checkBoxHandler}
              />
            </td>
            <td>Name</td>
            <td>Email</td>
            <td>Role</td>
            <td>Actions</td>
          </tr>
          {adminData.map((data, index) => {
            return (
              <tr key={index} className={data?.isChecked ? "checked-data" : ""}>
                <th>
                  <input
                    type="checkbox"
                    className="checkbox-wrapper"
                    name={data.name}
                    checked={data?.isChecked}
                    onChange={checkBoxHandler}
                  />
                </th>
                <th>{data.name}</th>
                <th>{data.email}</th>
                <th>{data.role}</th>
                <th>
                  <ModeEditIcon
                    id="edit-icon-wrapper"
                    onClick={() => {
                      updateAdmin(data?.id);
                    }}
                  />

                  <DeleteIcon
                    className="cursor-pointer"
                    id="delete-icon-wrapper"
                    onClick={() => {
                      deleteAdmin(data?.id);
                    }}
                  />
                </th>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Button
        id="delete-multiple-records"
        variant="contained"
        onClick={deleteSelectedAdmins}
      >
        Delete Selected
      </Button>
      {openModal.open && (
        <UpdateAdmin
          adminId={openModal.id}
          dataToUpdate={() => updatingRowData(adminData, openModal.id)}
          handleOpen={openModal.open}
          setHandleClose={() => {
            setOpenModal({ open: false, id: null });
          }}
          sentUpdatedData={sentUpdatedData}
        />
      )}
    </div>
  );
  return (
    <>
      <SearchBar sendSearchedData={sendSearchedData} />
      {adminData.length ? (
        contentToDisplay
      ) : (
        <span className="no-data">{"No data available"}</span>
      )}
    </>
  );
}

export default AdminList;
