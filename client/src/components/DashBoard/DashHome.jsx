import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../Redux/userSlice";
import { MdOutlineEdit } from "react-icons/md";
import Swal from "sweetalert2";

const DashHome = () => {
  const dispatch = useDispatch();
  const { id, username, email, password, profilePicture, role } = useSelector(
    (state) => state.user
  );

  const [edit, setEdit] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const apiKey = import.meta.env.VITE_IMAGE_BB;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const useremail = email;
    const password = e.target.password.value;
    const fileInput = e.target.file.files[0];

    if (fileInput) {
      const formData = new FormData();
      formData.append("image", fileInput);

      fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setImageUrl(data.data.url);
          dispatch(
            updateUser({
              id,
              username,
              email: useremail,
              password,
              profilePicture: data.data.url,
            })
          );

          fetch(`http://localhost:3000/user/${id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username,
              email: useremail,
              password,
              profilePicture: data.data.url,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.message === "User updated successfully") {
                Swal.fire({
                  icon: "success",
                  title: "User updated successfully!",
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                });
              }
            });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      const updatedImageUrl = imageUrl || profilePicture;

      dispatch(
        updateUser({
          id,
          username,
          email: useremail,
          password,
          profilePicture: updatedImageUrl,
        })
      );

      fetch(`http://localhost:3000/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email: useremail,
          password,
          profilePicture: updatedImageUrl,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.message === "User updated successfully") {
            Swal.fire({
              icon: "success",
              title: "User updated successfully!",
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }

    setEdit(false);
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  return (
    <div>
      <div className="text-center font-abc lg:text-[5rem] mt-16">
        <hr className="w-[50%] mx-auto border-2" />
        <h1> Profile Section </h1>
        <hr className="w-[50%] mx-auto border-2 mb-16" />
      </div>

      <div className="flex justify-center">
        <div className="flex lg:flex-row flex-col  gap-8  lg:px-16 rounded-3xl shadow-2xl shadow-cyan-300 py-8 items-center">
          <div>

            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <button onClick={() => document.getElementById('my_modal_3').showModal()}>
              <img
                src={profilePicture}
                className="w-[12rem] rounded-3xl  shadow-cyan-600 shadow-2xl "
                alt=""
              />
            </button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-circle btn-outline btn-error absolute right-2 top-2 ">✕</button>
                </form>
                <img
                  src={profilePicture}
                  className="w-[90%] rounded-3xl  shadow-cyan-600 shadow-2xl "
                  alt=""
                />
              </div>
            </dialog>

            <h1 className="text-center font-abc2 mt-8 text-2xl">{role}</h1>
          </div>
          <div className="relative">
            <MdOutlineEdit
              className={`${edit ? "text-orange-500" : "text-base-content"
                } cursor-pointer text-3xl hover:text-red-500 absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 btn-error`}
              onClick={handleEdit}
            />

            <form className="card-body w-96" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">User name</span>
                </label>
                <input
                  type="text"
                  name="username"
                  defaultValue={username}
                  className="input input-bordered"
                  required
                  disabled
                  {...edit && { disabled: false }}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  disabled
                  defaultValue={email}
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              {edit && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="text"
                    placeholder="password"
                    defaultValue={password}
                    name="password"
                    className="input input-bordered required "
                  />
                </div>
              )}

              {edit && (
                <input
                  type="file"
                  name="file"
                  className="file-input w-full max-w-xs mt-4"
                />
              )}

              {edit && (
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Update</button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashHome;
