import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.Config";
import Todo from "../screens/Todo";

export default function ProtectRoute({ todo }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
      if (!user) navigate("/login");
    });

    return () => unsubscribe();
  }, [navigate, todo]);

  return loading ? <div>Loading....</div> : <Todo />;
}
