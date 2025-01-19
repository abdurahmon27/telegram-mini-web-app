import WebApp from "@twa-dev/sdk";
import { Asterisk, Github, Instagram, Youtube } from "lucide-react";
import { useEffect, useState } from "react";
import { SendMessages, SendMessageToCurrentUser } from "./utils/sendMessages";

function App() {
  // states
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [user, setUser] = useState(null);

  // init tma sdk
  useEffect(() => {
    WebApp.ready();

    let currentUser = WebApp.initDataUnsafe.user;

    setUser(currentUser);
  });

  if (!user) {
    return (
      <div className="w-full h-screen text-color flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await SendMessages(form, user);

    async function AfterResult() {
      e.target.reset();
      const res = await SendMessageToCurrentUser(form);
    }

    if (result) {
      WebApp.showAlert("Xabar muvaffaqiyatli yuborildi!", AfterResult);
    }
  };

  return (
    <>
      <div className="w-full h-screen secondary-bg-color p-5">
        {/* bio */}
        <div className=" w-full bg-color h-auto rounded-t-md flex justify-between items-center py-2 px-2">
          <div className="flex flex-col">
            <span className="text-color text-xl font-thin">
              Abdurahmon Mamadiyorov
            </span>

            <span className="subtitle-text-color italic text-sm font-thin flex items-center space-x-2">
              <Asterisk size={15} />
              Taksist
            </span>
          </div>
          <img
            src="avatar.jpg"
            alt="Abdurahmon"
            className="w-[100px] h-[100px] rounded-full object-cover"
          />
        </div>
        {/* about */}
        <div className=" w-full bg-color h-auto flex justify-between items-center py-2 px-2">
          <p className="hint-color font-thin">
            I'm a self-taught, nerd developer who loves to build things.
          </p>
        </div>
        {/* socials */}
        <div className=" w-full bg-color h-auto flex justify-between items-center py-2 px-2">
          <ul className="flex items-center justify-center w-full text-color space-x-3">
            <li>
              <a href="https://linkify.uz/youtube">
                <Youtube size={25} />
              </a>
            </li>
            <li>
              <a href="https://linkify.uz/instagram">
                <Instagram size={25} />
              </a>
            </li>
            <li>
              <a href="https://linkify.uz/github">
                <Github size={25} />
              </a>
            </li>
          </ul>
        </div>
        {/* contact */}
        <div className=" w-full bg-color h-auto flex justify-between items-center py-2 px-2 rounded-b-md">
          <form
            className="flex flex-col space-y-3 w-full"
            onSubmit={handleSubmit}
          >
            <label
              htmlFor="name"
              className="flex flex-col space-y-1 text-color w-full"
            >
              <span className="">Ismingiz:</span>
              <input
                id="name"
                className="outline-none border-none secondary-bg-color py-2 px-3 rounded-md w-full"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </label>
            <label
              htmlFor="email"
              className="flex flex-col space-y-1 text-color w-full"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            >
              <span className="">Emailingiz:</span>
              <input
                id="email"
                className="outline-none border-none secondary-bg-color py-2 px-3 rounded-md w-full"
              />
            </label>
            <label
              htmlFor="message"
              className="flex flex-col space-y-1 text-color w-full"
            >
              <span className="">Xabaringiz:</span>
              <textarea
                id="message"
                className="outline-none border-none secondary-bg-color py-2 px-3 rounded-md w-full"
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </label>
            <button
              className="button-color w-full py-2 rounded-md secondary-bg-color"
              type="submit"
            >
              <span className="text-color">Yuborish</span>
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default App;
