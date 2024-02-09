import * as React from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, doc, getDocs, where } from "firebase/firestore";
import { auth, db } from "../config/firebase.Config";

// ... (other imports)

function DrawerAppBar() {
  const [personName, setPersonName] = React.useState("");
  const [showText, setShowText] = React.useState("Login First");
  const [personImg, setPersonImg] = React.useState(
    "https://yt3.googleusercontent.com/SpIXElitvVabuo9c6cudRFGfaiazamB5HTvix32ErkOh81CAezuRvPFvEi12jOZOF2_vUCFfF9s=s900-c-k-c0x00ffffff-no-rj"
  );
  const navigate = useNavigate();
  const [navItems, setNavItems] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        const querySnapshot = await getDocs(
          collection(db, "users"),
          where("userId", "==", uid)
        );
        const userData = querySnapshot.docs.find(
          (doc) => doc.data().userId === uid
        );
        const { name } = userData.data();
        console.log(name);
        setPersonName(name);
        setShowText(name)
        setNavItems(["logout"]);
      } else {
        setNavItems(["todo", "login"]);
        setPersonName("Todo App");
      }
    });

    return () => unsubscribe();
  }, []);

  function navi(item) {
    console.log(item);
    if (item === "logout") {
      signOut(auth)
        .then(() => {
          navigate("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigate(`${item === "todo" ? "/" : item}`);
    }
  }

  return (
    <nav className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">{personName}</a>
      </div>
      <div className="flex-none">
        <ul>
          {navItems.map((item, ind) => (
            <li
              className="px-3 hover:scale-105 capitalize hover:text-[#FEE698]"
              onClick={() => navi(item)}
              key={ind}
            >
              {item}
            </li>
          ))}
        </ul>
        {/* img  */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img alt="Tailwind CSS Navbar component" src={personImg} />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box  text-black"
          >
            <li>
              <a>{showText}</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default DrawerAppBar;
