import React, { useState, useEffect } from "react";
import supabase from "../config/supabaseClient";
import bcrypt from "bcryptjs";

// Function to hash and store an answer
const HashAnswer = async (id) => {
  const saltRounds = 10; // Number of salt rounds
  try {
    // Fetch the current answer from Supabase
    const { data: questionData, error: questionError } = await supabase
      .from("questions")
      .select("answer")
      .eq("id", id)
      .single();

    if (questionError) throw questionError;

    const plainAnswer = questionData.answer; // Current plain answer
    console.log(plainAnswer);
    // Hash the plain answer
    const hashedAnswer = await bcrypt.hash(plainAnswer, saltRounds);
    console.log(hashedAnswer);
    // Update the question with the hashed answer
    const { error: updateError } = await supabase
      .from("questions")
      .update({ answer: hashedAnswer })
      .eq("id", id);

    if (updateError) throw updateError;

    console.log("Answer successfully hashed and updated.");
    return hashedAnswer;
  } catch (error) {
    console.error("Error hashing and updating answer:", error.message);
    return null;
  }
};

export default HashAnswer;
