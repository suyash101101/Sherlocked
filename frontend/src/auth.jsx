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
  const [validationErrors, setValidationErrors] = useState({});
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

      if (signInError) throw signInError;

      const { data, error: fetchError } = await supabase
        .from("users")
        .select("id, email, team_name")
        .eq("email", email)
        .single();

      if (fetchError || !data) {
        throw fetchError || new Error("User not found");
      }
      
      setCookie("userId", data.id, { path: "/" });
      toast.success("Welcome back, Detective!");
      navigate("/sherlock");
      window.location.reload();

    } catch (error) {
      console.error('Login error:', error);
      toast.error("Invalid credentials. Please check your details and try again.");
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setValidationErrors({});
    
    // Validation checks
    const errors = {};
    
    if (teamName.length < 3 || teamName.length > 30) {
      errors.teamName = "Team name must be between 3 and 30 characters";
    }
    
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = "Please enter a valid email address";
    }
    
    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      Object.values(errors).forEach(error => toast.error(error));
      return;
    }

    try {
      // Check for duplicate team name
      const { data: existingTeam } = await supabase
        .from('users')
        .select('team_name')
        .eq('team_name', teamName)
        .single();

      if (existingTeam) {
        toast.error("Team name already taken");
        return;
      }

      // First create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      // Create user profile without specifying ID (let it auto-increment)
      const { data: userData, error: profileError } = await supabase
        .from('users')
        .insert([{ 
          team_name: teamName,
          email: email,
          password: password,
          created_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (profileError) throw profileError;

      toast.success("Sign up successful! Welcome to the investigation.");
      
      // Set cookie with the auto-generated ID
      setCookie("userId", userData.id, { path: "/" });
      navigate('/sherlock');
      window.location.reload();

    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error.message || "Error during sign up. Please try again.");
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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success("Login successful!");
      navigate('/'); // Redirect to landing page
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Check if the button should be enabled
  const isButtonEnabled = () => {
    const now = new Date();
    const start = new Date('2025-01-25T11:00:00'); 
    const end = new Date('2025-01-25T23:00:00'); 
    return now >= start && now <= end;
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
                  className={`w-full bg-stone-800/50 border ${
                    validationErrors.teamName ? 'border-red-500' : 'border-amber-900/20'
                  } rounded-lg py-3 px-10 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-600/50
                  transition-all duration-200`}
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
              disabled={!isButtonEnabled()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 bg-gradient-to-r from-amber-900/80 to-stone-900/80 text-stone-100 
                         py-3 px-6 rounded-lg transition-all duration-200 border border-amber-700/20 
                          shadow-lg font-serif hover:from-amber-800/80 hover:to-stone-800/80 ${!isButtonEnabled() ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Begin Investigation
              </motion.button>
              <motion.button
                type="button"
                onClick={handleSignIn}
              disabled={!isButtonEnabled()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 bg-gradient-to-r from-stone-800/80 to-amber-900/80 text-stone-100 
                         py-3 px-6 rounded-lg transition-all duration-200 border border-amber-700/20 
                          shadow-lg font-serif hover:from-stone-700/80 hover:to-amber-800/80 ${!isButtonEnabled() ? 'opacity-50 cursor-not-allowed' : ''}`}
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
