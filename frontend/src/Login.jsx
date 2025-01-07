"use client";

import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";

import { useState, useEffect } from "react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { DarkThemeToggle } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  async function signUpNewUser() {
    console.log(user);
    const { data, error } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
      options: {
        data: {
          username: user.username,
        },
      },
    });
    console.log(data);
    if (error) {
      alert(error.message);
    }
  }

  async function signInWithEmail() {
    console.log(user);
    const { data, error } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: user.password,
    });
    if (error) {
      alert(error.message);
    }
  }

  const supabase = useSupabaseClient();

  const [session, setSession] = useState(null);
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [signIn, setSignIn] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    if (session) {
      // console.log(session);
      navigate("/dashboard");
      setTimeout(() => setIsLoading(false), 250);
    }
  }, [session, navigate]);


  if (!session) {
    return (
      <div className="flex flex-col w-full h-screen bg-[#678dc5] dark:bg-gray-700 ">
        <div className="flex w-full justify-end bg-[#678dc5] dark:bg-gray-700">
          <nav className="p-4">
            <DarkThemeToggle className="text-black hover:bg-[#557bb4] ring-0 focus:ring-0 shadow-none dark:ring-0 dark:shadow-none hover:dark:bg-gray-800" />
          </nav>
        </div>
        <div className="w-full flex flex-col justify-center items-center mt-24 bg-[#678dc5] dark:bg-gray-700">
          <div className="text-3xl p-4 dark:text-white">
            {signIn ? "Sign In" : "Sign Up"}
          </div>
          <Card className="max-w-md w-full">
            <form className="flex flex-col items-center w-full gap-4">
              {!signIn ? (
                <div className="w-full">
                  <div className="mb-2 block">
                    <Label htmlFor="username" value="Your username" />
                  </div>
                  <TextInput
                    id="username"
                    type="username"
                    placeholder="username"
                    onChange={(e) => {
                      setUser({ ...user, username: e.target.value });
                    }}
                    required
                  />
                </div>
              ) : (
                <div></div>
              )}

              <div className="w-full">
                <div className="mb-2 block">
                  <Label htmlFor="email1" value="Your email" />
                </div>
                <TextInput
                  id="email1"
                  type="email"
                  placeholder="name@gmail.com"
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                  }}
                  required
                />
              </div>
              <div className="w-full">
                <div className="mb-2 block">
                  <Label htmlFor="password1" value="Your password" />
                </div>
                <TextInput
                  id="password1"
                  type="password"
                  autoComplete="true"
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                  }}
                  required
                />
              </div>
              <Button
                className="w-full"
                onClick={() => {
                  signIn ? signInWithEmail() : signUpNewUser();
                }}
              >
                {signIn ? "Sign In" : "Sign Up"}
              </Button>
              <div
                onClick={() => {
                  setSignIn(!signIn);
                }}
                className="underline cursor-pointer dark:text-white"
              >
                {signIn
                  ? "Don't have an account? Sign up"
                  : "Have an account? Sign In"}
              </div>
            </form>
          </Card>
        </div>
      </div>
    );
  } else {
    return (
      isLoading ? <div className=" flex justify-center items-center dark:text-white text-4xl w-full h-screen bg-[#678dc5] dark:bg-gray-700">Loading...</div> :
      <div></div>
    );
  }
}
