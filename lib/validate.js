export function login_validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "* Заавал бөглөх";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Э-мэйл хаяг буруу байна!";
  }

  if (!values.password) {
    errors.password = "* Заавал бөглөх";
  }

  return errors;
}

export function register_validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "* Заавал бөглөх";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Э-мэйл хаяг буруу байна!";
  }

  if (!values.password) {
    errors.password = "* Заавал бөглөх";
  } else if (
    !/(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,20}).*$/g.test(
      values.password
    )
  ) {
    errors.password =
      "1 том үсэг, 1 жижиг үсэг, 1 тоо, 1 тэмдэгт, 8-20 урттай байна";
  }

  if (!values.cpassword) {
    errors.cpassword = "* Заавал бөглөх";
  } else if (values.password !== values.cpassword) {
    errors.cpassword = "Нууц үг таарахгүй байна!";
  }

  return errors;
}

export function loginsForm_validate(values) {
  const errors = {};

  if (!values.website) {
    errors.website = "* Заавал бөглөх";
  } else if (!/^[A-Z0-9._%+-]{2,}$/i.test(values.website)) {
    errors.website = "Invalid website name";
  }

  if (values.url) {
    if (
      !/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi.test(
        values.url
      )
    ) {
      errors.url = "Invalid url";
    }
  }

  if (!values.email) {
    errors.email = "* Заавал бөглөх";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (values.username) {
    if (!/^[a-zA-Z0-9_-]{3,16}$/i.test(values.username)) {
      errors.username = "Invalid username";
    }
  }

  if (!values.password) {
    errors.password = "* Заавал бөглөх";
  } else if (
    !/(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,20}).*$/g.test(
      values.password
    )
  ) {
    errors.password =
      "1 том үсэг, 1 жижиг үсэг, 1 тоо, 1 тэмдэгт, 8-20 урттай байна";
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
