import supabase, { supabaseUrl } from './supabase';

export async function signup({ email, password, fullName }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      // if we want to add more data to the user we can add it here
      data: {
        fullName,
        avatar: '',
      },
    },
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  // get the session from the browser(localStorage)
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  // its a bit secure instead of loading the user from the localStorage directly load from supabase
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data?.user;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  //  1 - update the PASSWORD OR FULLNAME(both cannot be updated at the same time as both lives in different forms)
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  // this will automatically know which user is logged in
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  if (!avatar) return data;
  //  2 - upload the AVATAR image
  const fileName = `avatar-${data.user.id}.${Date.now().toString(36)}${Math.random().toString(36).substr(2, 9)}`;
  const { error: storageError } = await supabase.storage
    .from('avatars')
    .upload(fileName, avatar);

  if (storageError) {
    console.error(storageError);
    throw new Error(storageError.message);
  }
  //  3 - update avatar in the user
  const { data: updatedUser, error: updateUserError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (updateUserError) {
    console.error(updateUserError);
    throw new Error(updateUserError.message);
  }

  return updatedUser;
}
