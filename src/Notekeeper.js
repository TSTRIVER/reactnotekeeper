import React, { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { editableInputTypes } from "@testing-library/user-event/dist/utils";

const Notekeeper = () => {
  const getLocalItems = () => {
    let list = localStorage.getItem("lists");
    if (list) {
      return JSON.parse(localStorage.getItem("lists"));
    } else {
      return [];
    }
  };

  const [num, setnum] = useState("");
  const [arr, setarr] = useState(getLocalItems());
  const [iconstate, seticonstate] = useState(true);
  const [edited, setedited] = useState(null);
  let iconname = "";
  let icon = "";

  const inp_change = (event) => {
    setnum(event.target.value);
  };

  const adder = () => {
    if (!num) {
    } else if (num && !iconstate) {
      setarr(
        arr.map((elem) => {
          if (elem.id === edited) {
            return { ...elem, content: num };
          }
          return elem;
        })
      );
      setnum("");
      seticonstate(true);
      setedited(null);
    } else {
      const allnum = { id: new Date().getTime().toString(), content: num };
      setarr([...arr, allnum]);
      setnum("");
    }
  };

  const deleter = (id) => {
    const updatedarr = arr.filter((elem) => {
      return id !== elem.id;
    });

    setarr(updatedarr);
  };

  const edit = (id) => {
    const editedelem = arr.find((elem) => {
      return elem.id === id;
    });

    setnum(editedelem.content);
    seticonstate(false);
    setedited(id);
  };

  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(arr));
  }, [arr]);

  if (iconstate) {
    iconname = "Add";
    icon = <AddCircleIcon />;
  } else {
    iconname = "Editing..";
    icon = <CreateIcon />;
  }

  return (
    <>
      <div className="w-screen h-auto bg-yellow-50 overflow-y-hidden">
        <div className="w-full h-28 bg-gray-300 py-7">
          <h1 className="text-4xl ml-7 font-prompt">📋NoteKeeper</h1>
        </div>
        <div className="w-screen bg-[url('https://www.wikihow.com/images/thumb/1/18/Take-Better-Notes-Step-1-Version-2.jpg/v4-460px-Take-Better-Notes-Step-1-Version-2.jpg.webp')] flex flex-col justify-items-center items-center my-10">
          <textarea
            type="text"
            name="inputfield"
            placeholder="Enter your note here"
            value={num}
            onChange={inp_change}
            className=" block text-black font-prompt h-40 w-4/5 sm:w-2/4 p-16 overflow-hidden placeholder: text-center rounded-3xl  bg-sky-200 border-4 border-gray-500"
          ></textarea>
          <button
            class="flex w-24 h-10 ml-4 py-2 mt-3 bg-white hover:bg-sky-500 font-prompt rounded-lg text-sky-500 hover:text-white border-sky-500 hover:border-white border-2 justify-center transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none"
            onClick={adder}
          >
            {iconname} {icon}
          </button>
        </div>
        <div className="w-screen h-10 flex">
          <div className="w-full h-full hover:cursor-pointer text-white hover:transition-1s bg-gray-700 border-r-2 border-r-gray-400 flex justify-center items-center text-3xl text-gray-70">
            <div className="font-prompt">📄 Your Notes 📄</div>
          </div>
        </div>
        <div className="w-screen h-auto bg-yellow-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 place-items-center py-10 gap-y-10">
          {arr.map((elem) => {
            return (
              <div className="bg-sky-200 w-9/12 h-72 rounded-2xl relative overflow-hidden">
                <div className="absolute font-prompt w-11/12 h-5/6 ml-4 my-3 font-semibold overflow-y-scroll overflow-x-hidden">
                  {elem.content}
                </div>
                <div className="flex mt-64 justify-evenly">
                  <button onClick={() => edit(elem.id)}>
                    <CreateIcon className="text-green-600" />
                  </button>
                  <button onClick={() => deleter(elem.id)}>
                    <DeleteIcon className="text-red-600" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Notekeeper;
