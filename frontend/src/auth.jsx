import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import { Lock, Mail, Users, LogOut, Footprints, ScrollText, Eye, EyeOff } from "lucide-react";
import supabase from "./config/supabaseClient";
import { toast, ToastContainer } from "react-toastify";

function ContestPage() {
  const [cookies, setCookie, removeCookie] = useCookies(["userId"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [teamName, setTeamName] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { pathname, hash } = location;
    if (pathname === "/" && hash === "#login") {
      const loginElement = document.getElementById("login");
      if (loginElement) {
        loginElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSignIn = async () => {
    try {
      if (!email || !password || !teamName) {
        toast.error("Please fill in all fields");
        return;
      }
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) {
        throw signInError;
      }

      const { data, error: fetchError } = await supabase
        .from("users")
        .select("id, email, team_name")
        .eq("email", email)
        .single();

      if (fetchError || !data) {
        throw fetchError || new Error("User not found");
      }
      
      setCookie("userId", data.id, { path: "/" });
      navigate("/sherlock");

      window.location.reload();

    } catch (error) {
      toast.error("Wrong Credentials. Sign Up Before Login");
      console.error(error);
    }
  };

  const handleSignUp = async () => {
    try {
      if (!email || !password || !teamName) {
        toast.error("Please fill in all fields");
        return;
      }

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) {
        throw signUpError;
      } else {
        toast.success("Signed up successfully");

        const { error: upsertError } = await supabase.from("users").upsert([
          {
            email,
            password,
            team_name: teamName,
          },
        ]);

        if (upsertError) {
          throw upsertError;
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("User already exists or an error occurred");
    }
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      removeCookie("userId");
      toast.success("You have been logged out successfully.");
      window.location.href = "/";
    } catch (error) {
      console.error("Error signing out:", error);
      toast.error("Failed to sign out. Please try again.");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-12 overflow-hidden">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 bg-[url('/src/img.jpg')] bg-cover bg-center"
        style={{ filter: 'brightness(0.3)' }}
      />
      
      {/* Victorian pattern overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-950/90 via-stone-900/90 to-stone-950/90" />

      {cookies.userId ? (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative z-10 bg-stone-900/40 p-8 rounded-xl backdrop-blur-md 
                   border border-amber-900/20 shadow-2xl max-w-md w-full"
        >
          <div className="text-center">
            <Footprints className="w-16 h-16 text-amber-400 mx-auto mb-6 rotate-12" />
            <h1 className="text-3xl font-bold text-amber-100 font-serif mb-4">
              Welcome Back, Detective
            </h1>
            <p className="text-stone-300 mb-8 font-serif italic">
              "The game is afoot. London's mysteries await your return."
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSignOut}
              className="bg-gradient-to-r from-red-900/80 to-stone-800/80 text-stone-100 py-4 px-6 
                       rounded-lg transition-all duration-200 flex items-center justify-center gap-2 
                       w-full border border-red-700/20 shadow-lg font-serif"
            >
              <LogOut size={18} />
              <span>Conclude Investigation</span>
            </motion.button>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative z-10 bg-stone-900/40 p-8 rounded-xl backdrop-blur-md 
                   border border-amber-900/20 shadow-2xl max-w-md w-full"
        >
          {/* Decorative corners */}
          <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-amber-800/20 rounded-tl-3xl" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-amber-800/20 rounded-br-3xl" />
          
          <div className="text-center mb-8">
            <ScrollText className="w-16 h-16 text-amber-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-amber-100 font-serif">
              Detective Registry
            </h1>
            <p className="text-stone-400 mt-2 font-serif italic">
              "Once you eliminate the impossible, whatever remains, however improbable, must be the truth."
            </p>
          </div>

          <form id="login" className="space-y-6 relative">
            <div className="space-y-4">
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600/50" size={18} />
                <input
                  type="text"
                  placeholder="Detective Team Name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="w-full bg-stone-800/50 border border-amber-900/20 rounded-lg py-3 px-10 
                           text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-600/50
                           transition-all duration-200"
                />
              </div>
              
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600/50" size={18} />
                <input
                  type="email"
                  placeholder="Lead Detective's Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-stone-800/50 border border-amber-900/20 rounded-lg py-3 px-10 
                           text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-600/50
                           transition-all duration-200"
                />
              </div>
              
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600/50" size={18} />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Secret Code"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-stone-800/50 border border-amber-900/20 rounded-lg py-3 px-10 
                           text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-600/50
                           transition-all duration-200 pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-amber-600/50 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <motion.button
                type="button"
                onClick={handleSignUp}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-gradient-to-r from-amber-900/80 to-stone-900/80 text-stone-100 
                         py-3 px-6 rounded-lg transition-all duration-200 border border-amber-700/20 
                         shadow-lg font-serif hover:from-amber-800/80 hover:to-stone-800/80"
              >
                Begin Investigation
              </motion.button>
              <motion.button
                type="button"
                onClick={handleSignIn}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-gradient-to-r from-stone-800/80 to-amber-900/80 text-stone-100 
                         py-3 px-6 rounded-lg transition-all duration-200 border border-amber-700/20 
                         shadow-lg font-serif hover:from-stone-700/80 hover:to-amber-800/80"
              >
                Resume Case
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
        className="backdrop-blur-sm"
        toastClassName="bg-stone-900/90 text-amber-100 border border-amber-900/20"
      />
    </div>
  );
}

export default ContestPage;
