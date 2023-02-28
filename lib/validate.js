export function login_validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  return errors;
}

export function register_validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Must be greater then 8 and less then 20 characters long";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  if (!values.cpassword) {
    errors.cpassword = "Required";
  } else if (values.password !== values.cpassword) {
    errors.cpassword = "Invalid Confirm Password";
  }

  return errors;
}

export function loginsForm_validate(values) {
  const errors = {};

  if (!values.website) {
    errors.website = "Required";
  } else if (!/^[a-zA-Z0-9_.-]{3,16}$/i.test(values.website)) {
    errors.website = "Invalid website name";
  }

  if (values.url) {
    if (
      !/^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/[^\s]*)?$/i.test(values.url)
    ) {
      errors.url = "Invalid url";
    }
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (values.username) {
    if (!/^[a-zA-Z0-9_-]{3,16}$/i.test(values.username)) {
      errors.username = "Invalid username";
    }
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (values.password.length < 8 || values.password.length > 20) {
    errors.password = "Must be greater then 8 and less then 20 characters long";
  } else if (values.password.includes(" ")) {
    errors.password = "Invalid Password";
  }

  if (values.phone) {
    if (!/^\d{8}$/i.test(values.phone)) {
      errors.phone = "Invalid phone";
    }
  }

  if (values.notes) {
    if (!/^(?!\s*$).+/i.test(values.notes)) {
      errors.notes = "Invalid notes";
    }
  }

  return errors;
}
