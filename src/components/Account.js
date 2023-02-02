import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";
import Urls from "../components/constants/url";
import useApi from "../components/hooks/useApi";
import styled from "styled-components";

const Account = () => {
  const { postCall } = useApi();
  const [updateClicked, setUpdateClicked] = useState(false);
  const [updateStatus, setUpdateStatus] = useState("");
  const { user } = useAuth0();

  let userMetadata = sessionStorage.getItem("user");
  console.log(userMetadata);
  if (!userMetadata) {
    userMetadata = {
      given_name: user["https://kreative.net/given_name"] || "",
      family_name: user["https://kreative.net/family_name"] || "",
      gender: user["https://kreative.net/gender"] || "",
      phone_number: user["https://kreative.net/phone_number"] || "",
      address: user["https://kreative.net/address"] || "",
      preferred_style: user["https://kreative.net/preferred_style"] || "",
      email: user.email || "",
    };
    sessionStorage.setItem("user", JSON.stringify(userMetadata));
  } else {
    userMetadata = JSON.parse(userMetadata);
  }

  const [userAccountDetails, setUserAccountDetails] = useState(userMetadata);
  const [updatedUserMetadata, setUpdatedUserMetadata] = useState({
    email: userMetadata.email || "",
  });

  const handlechange = (newValue) => {
    if (newValue) {
      setUserAccountDetails((userAccountDetails) => ({
        ...userAccountDetails,
        ...newValue,
      }));
      setUpdatedUserMetadata((updatedUserMetadata) => ({
        ...updatedUserMetadata,
        ...newValue,
      }));
    }
  };

  useEffect(() => {
    if (updateClicked) {
      setUpdateStatus("");
      setUpdateClicked(false);
      postCall(Urls.UPDATE_ACCOUNT, { ...updatedUserMetadata })
        .then((res) => {
          if (res.status !== 200) {
            setUpdateStatus(res.statusText);
          }
          return res.json();
        })
        .then((res) => {
          const data = res.data;
          console.log(data);
          if (data) {
            sessionStorage.setItem("user", JSON.stringify(data));
            setUpdatedUserMetadata({ email: data.email || "" });
            setUpdateStatus("Account details updated successfully");
          }
        })
        .catch((e) => {
          console.error(e);
          setUpdateStatus("Something went wrong..Try Again");
        });
    }
  }, [updateClicked, updatedUserMetadata, setUpdateStatus, postCall]);

  return (
    <Wrapper className="page">
      <div className="section-center">
        <h3>Account Settings</h3>
        <form>
          <label className="label">
            {" "}
            EMAIL <br />
            <input
              type="text"
              name="favPizza"
              size="50"
              value={userAccountDetails.email}
              disabled
            />
          </label>{" "}
          <br />
          <label className="label">
            {" "}
            FIRST NAME <br />
            <input
              type="text"
              name="firstName"
              size="50"
              className="form-input"
              value={userAccountDetails.given_name}
              onChange={(e) =>
                handlechange({ given_name: e.target.value || "" })
              }
            />
          </label>{" "}
          <br />
          <label className="label">
            {" "}
            LAST NAME <br />
            <input
              type="text"
              name="lastName"
              size="50"
              className="form-input"
              value={userAccountDetails.family_name}
              onChange={(e) =>
                handlechange({ family_name: e.target.value || "" })
              }
            />
          </label>{" "}
          <br />
          <label className="label">
            {" "}
            GENDER <br />
            <input
              type="text"
              name="phoneNumber"
              size="50"
              className="form-input"
              value={userAccountDetails.gender}
              onChange={(e) => handlechange({ gender: e.target.value || "" })}
            />
          </label>{" "}
          <br />
          <label className="label">
            {" "}
            PHONE NUMBER <br />
            <input
              type="text"
              name="phoneNumber"
              size="50"
              className="form-input"
              value={userAccountDetails.phone_number}
              onChange={(e) =>
                handlechange({ phone_number: e.target.value || "" })
              }
            />
          </label>{" "}
          <br />
          <label className="label">
            {" "}
            ADDRESS <br />
            <input
              type="text"
              name="userAddress"
              size="50"
              className="form-input"
              value={userAccountDetails.address}
              onChange={(e) => handlechange({ address: e.target.value || "" })}
            />
          </label>{" "}
          <br />
          <label className="label">
            {" "}
            Preferred Style <br />
            <input
              type="text"
              name="preferredStyle"
              size="50"
              className="form-input"
              value={userAccountDetails.preferred_style}
              onChange={(e) => handlechange({ preferred_style : e.target.value || "" })}
            />
          </label>{" "}
          <br />
        </form>
        <h4> {updateStatus} </h4>
        <button onClick={() => setUpdateClicked(true)} className="btn">
          UPDATE
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }

  .btn {
    margin-top: 1rem;
    width: 140px;
  }

  input {
    margin-left: 40px;
    size: 100;
    font-size: 20px;
  }

  label {
    font-size: 1rem;
    text-transform: capitalize;
  }
  .form-input {
    color: var(--clr-grey-3);
    border-top-left-radius: var(--radius);
    border-bottom-left-radius: var(--radius);
    border-color: var(--clr-primary-7)
  }
`;

export default Account;
