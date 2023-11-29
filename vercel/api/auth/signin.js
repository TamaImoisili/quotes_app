// api/auth/signin.js
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'your-supabase-url';
const supabaseKey = 'your-supabase-key';
const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = async (req, res) => {
  const { email, password } = req.body;

  try {
    const { user, error } = await supabase.auth.signIn({ email, password });

    if (error) {
      throw new Error(error.message);
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};