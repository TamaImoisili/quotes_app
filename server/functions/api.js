// functions/myFunction.js
import express from "express";
import serverless from "serverless-http";
import cors from "cors"; // Import the cors middleware
import { createClient } from '@supabase/supabase-js';
require('dotenv').config();

const basePath = "/.netlify/functions/api";
const app = express();

// Use cors middleware
app.use(cors());
app.use(express.json());

const router = express.Router(); // Create an instance of a router

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

const handleCorsPreflight = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'your-allowed-origin.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.status(200).end();
};

router.get(`/hello`, (req, res) => {
  res.json({ message: "Hello from the serverless! (difference test)" });
});

router.get('/getRandom', async (req, res) => {
  try {
    const apiUrl = 'https://zenquotes.io/api/random';
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data from Quotable API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// checkfave route
app.options('/checkfave', handleCorsPreflight);
router.post('/checkfave', async (req, res) => {
  try {
    // Assuming you have some authentication mechanism to get the user ID
    const userId = req.body.user_id; // Adjust this based on your authentication setup
    const remStatus = req.body.remStatus;

    // Extract quote and author from the request body
    const { quote, author } = req.body;
    console.log("Checking fave");
    // Check if the quote for the current user already exists
    const existingRecord = await supabase
      .from('favourites')
      .select('favorite_id')
      .eq('user_id', userId)
      .eq('quote', quote)
      .single();
    // If the quote already exists for the current user, return a message
    if (existingRecord.data) {
      console.log(remStatus);
      if (remStatus == 1) {
        const { data, error } = await supabase
          .from('favourites')
          .delete()
          .eq('favorite_id', existingRecord.data.favorite_id)
          .single();

        if (error) {
          throw new Error('Error deleting record');
        }
        const response = res.status(200).json({ success: true, message: 'Row removed successfully' });
        return response;
      } else {
        const faveID = existingRecord.data.favorite_id;
        const response = res.status(200).json({ error: 'Quote already exists in favourites', faveID: faveID });
        return response;
      }
    } else {
      const response = res.status(200).json({ error: 'Quote does not exist in favourites', faveID: 0 });
      return response;
    }
  } catch (error) {
    console.error('Unexpected error during check:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Signup route
app.options('/signup', handleCorsPreflight);
router.post('/signup', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if email and password are provided
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Email, name, and password are required' });
    }

    // You can add additional validation logic here if needed
    // You may want to perform additional actions here, such as sending a confirmation email
    const { data, error2 } = await supabase
      .from('users')
      .select('user_id')
      .eq('email', email)
      .single();
    if (error2) {
      console.error('Error fetching user ID:', error.message);
      return null;
    }
    if (data != null) {
      return res.json({ message: 'User already exists', data });
    } else {
      // Sign up the user using Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        console.error('Sign-up error:', error.message);
        return res.status(401).json({ error: 'Failed to sign up' });
      } else {
        const { error3 } = await supabase
          .from('users')
          .insert([{ email: email, name: name }]);

        const { user, error4 } = await supabase
          .from('users')
          .select('user_id')
          .eq('email', email)
          .single();

        console.log(error4);
        return res.status(200).json({ status: 'Signup successful! Please check your email for a confirmation link.', data: user });
      }
    }
  } catch (error) {
    console.error('Unexpected error during sign-up:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

//Signout route
app.options('/signout', handleCorsPreflight);
router.post('/signout', async (req, res) => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Sign-out error:', error.message);
      return res.status(401).json({ error: 'Failed to sign out' });
    } else {
      console.log('User signed out:');

      return res.json({ message: 'Sign-out successful' });
    }
  } catch (error) {
    console.error('Unexpected error during sign-out:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});
//forgot password route
app.options('/forgot', handleCorsPreflight);
router.post('/forgot', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      console.log(email);
      return res.status(400).json({ error: 'Email is required' });
    }
    const {data, error} = supabase.auth.resetPasswordForEmail
  } catch (error) {
    console.error('Unexpected error:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// signin route
app.options('/signin', handleCorsPreflight);
router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      console.log(email, password);
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const { user, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.error('Sign-in error:', error.message);
      return res.status(401).json({ error: 'Invalid credentials' });
    } else {
      console.log('User signed in:', email);
      const { data, error } = await supabase
        .from('users')
        .select('user_id')
        .eq('email', email)
        .single();

      if (error) {
        console.error('Error fetching user ID:', error.message);
        return null;
      }
      return res.json({ message: 'Sign-in successful', data });
    }
  } catch (error) {
    console.error('Unexpected error during sign-in:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

//googele signin route
app.options('/signinWithGoogle', handleCorsPreflight);
router.post('/signinWithGoogle', async (req, res) => {
  try{
    // console.log("Before sign in ");

    console.log("No wahala 1");
    const {data, error} = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })
    console.log("Data: ", data);
    if (error){
      console.log(error);
      console.error('Failed to sign-in');
      return null;
    }else{
      return res.json({message: 'Sign-in successful', data});
    }
    res.json({ message: "Hello from the serverless!" });
  }catch (error) {
    console.log("Before sign in ");
    console.error('Unexpected error during sign-in:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Add to favourites route
router.post('/addfave', async (req, res) => {
  try {
    // Assuming you have some authentication mechanism to get the user ID
    const userId = req.body.user_id; // Adjust this based on your authentication setup
    // Extract quote and author from the request body
    const { quote, author } = req.body;
    console.log(userId, quote, author);
    // Check if the quote for the current user already exists
    const existingRecord = await supabase
      .from('favourites')
      .select('favorite_id')
      .eq('user_id', userId)
      .eq('quote', quote)
      .single();
    console.log("Existing record", existingRecord);
    // If the quote already exists for the current user, return a message
    if (existingRecord.data) {
      return res.status(400).json({ error: 'Quote already exists in favourites' });
    }
    // Insert record into favourites table
    const { error } = await supabase
      .from('favourites')
      .insert([{ user_id: userId, quote: quote, author: author }]);

    if (error) {
      console.error('Error adding to favourites:', error.message);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    return res.json({ message: 'Added to favourites' });
  } catch (error) {
    console.error('Unexpected error:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});
// Use the router with the specified base path
app.use(basePath, router);

export const handler = serverless(app);
