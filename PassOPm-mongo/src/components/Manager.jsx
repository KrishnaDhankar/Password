import React from "react";
import { useRef, useState, useEffect } from "react";
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import "react-toastify/dist/ReactToastify.css";

const Manager = () => {
  const ref = useRef()
  const passwordRef = useRef()
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setPasswordArray] = useState([])

  const getPasswords = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    setPasswordArray(passwords)
  }
  useEffect(() => {
    getPasswords()
}, [])

  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("/eye.jpg")) {
      ref.current.src = "/eyecross.jpg";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "/eye.jpg";
      passwordRef.current.type = "password";
    }
  };
  const copyText = (text) => {
    toast("🦄 Copy To Clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };
  const savePassword = async () => {
    if(form.site.length>3 && form.username.length>3 && form.password.length>3){

  
      //localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id:uuidv4()}]));
      //console.log([...passwordArray, form]);
      
      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }])
      await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, id: uuidv4() }) })
      setform({ site: "", username: "", password: "" })
      toast("🦄 Yay!!!Password Saved Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else{
      toast(":( Ah shit!! Not Saved");
    }
  }
  const editPassword = (id) => {
    setform({ ...passwordArray.filter(i => i.id === id)[0], id: id })
    setPasswordArray(passwordArray.filter(item => item.id !== id))
  };
  const deletePassword = async (id) => {
    let c =confirm("Do you really want to delete?");
    if(c){
      setPasswordArray(passwordArray.filter(item => item.id !== id));
      //localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id!==id)));
      await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })
      toast("🦄 Password Deleted", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      <div className=" p-2 md:p-0 md:mx-14 md:my-7 min-h-[76.2vh]">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          Pass
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-center">Your own Password Manager</p>
        <div className=" flex flex-col px-10 py-2 text-black gap-6 mx-10 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            className="rounded-full border border-green-500 w-full px-10 py-1 my-2"
            placeholder="Enter Website URL"
            type="text"
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-6">
            <input
              value={form.username}
              onChange={handleChange}
              className="rounded-full border border-green-500 w-full px-10 py-1"
              placeholder="Enter Username"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                className="rounded-full border border-green-500 w-full px-10 py-1"
                placeholder="Enter Password"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img ref={ref} className="p-0.5 " width={30} src="/eye.jpg" />
              </span>
            </div>
          </div>
          <button
            className="flex justify-center items-center bg-green-500 w-fit rounded-full px-6 py-2 hover:bg-green-300 border-2 border-black"
            onClick={savePassword}
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>
        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-7">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">UserName</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item,index) => {
                  return (
                    <tr key={index}>
                      <td className=" text-center py-2 border border-white w-32">
                        <div className="flex items-center justify-center">
                          <a href={item.site}>
                            <span>{item.site}</span>
                          </a>
                          <div
                            className="lordiconcopy cursor-pointer size-6"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              style={{ width: "30px", height: "30px" }}
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center w-32 py-2 border border-white">
                        <div className="flex items-center justify-center">
                          <a href={item.username}>
                            <span>{item.username}</span>
                          </a>
                          <div
                            className="lordiconcopy cursor-pointer size-6"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              style={{ width: "30px", height: "30px" }}
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="text-center w-32 py-2 border border-white">
                        <div className="flex items-center justify-center">
                          <a href={item.password}>
                            <span>{'*'.repeat(item.password.length)}</span>
                          </a>
                          <div
                            className="lordiconcopy cursor-pointer size-6"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              style={{ width: "30px", height: "30px" }}
                              src="https://cdn.lordicon.com/depeqmsz.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" justify-center text-center w-32 py-2 border border-white">
                        <span className="cursor-pointer mx-1"    onClick={() => {
                              editPassword(item.id);
                            }}>
                          <lord-icon
                            style={{ width: "30px", height: "30px" }}
                            src="https://cdn.lordicon.com/qnpnzlkk.json"
                            trigger="hover"
                          ></lord-icon>
                        </span>
                        <span className="cursor-pointer mx-1"    onClick={() => {
                              deletePassword(item.id);
                            }}>
                          <lord-icon
                            style={{ width: "30px", height: "30px" }}
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
