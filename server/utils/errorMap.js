module.exports = {
  OAUTH: {
    LOGIN_FAIL: {
      code: 1000,
      message: 'login fail'
    },
    PASSWORD_ERROR: {
      code: 1001,
      message: 'invalid password'
    },
    MOBILE_ERROR: {
      code: 1002,
      message: 'invalid mobile'
    },
    EMAIL_ERROR: {
      code: 1003,
      message: 'invalid email'
    },
    PASSWORD_UNEXPECTED: {
      code: 1003,
      message: "confirm password fail"
    }
  },
  AUTH: {
    VERSION: {
      code: 1101,
      message: 'invalid version'
    },
    APP: {
      code: 1102,
      message: 'invalid request'
    },
    UNAUTH: {
      code: 1103,
      message: 'auth fail'
    },
    RE_SIGNIN: {
      code: 1104,
      message: 'please sign in'
    },
    SMS: {
      code: 1105,
      message: 'invalid sms code'
    },
    CAPTCHA: {
      code: 1106,
      message: 'invalid captcha code'
    }
  },
  USER: {
    DUPLICATE_NAME: {
      code: 2001,
      message: 'user name exist'
    },
    EXIST: {
      code: 2002,
      message: 'user exist'
    },
    NOT_EXIST: {
      code: 2003,
      message: 'user not exist'
    },
    NOT_ACTIVE: {
      code: 2003,
      message: 'user not active'
    },
    SAME_PASSWORD: {
      code: 2004,
      message: 'new password can not the same as old password'
    }
  },
  EMAIL: {
    DUPLICATE_NAME: {
      code: 4001,
      message: 'user name exist'
    },
    EXIST: {
      code: 4002,
      message: 'user exist'
    },
    NOT_EXIST: {
      code: 4003,
      message: 'user not exist'
    },
    NOT_ACTIVE: {
      code: 4003,
      message: 'user not active'
    },
    SAME_PASSWORD: {
      code: 4004,
      message: 'new password can not the same as old password'
    }
  },
  VOTES: {
    EXIST: {
      code: 3001,
      message: "this title is exist,please choose another one"
    },
    PASSWORD_ERROR: {
      code: 3002,
      data: [],
      message: "vote password is not match"
    }
  },
  ADMIN: {
    APP_EXIST: {
      code: 7001,
      message: 'app exist'
    }

  },
  DATA: {
    REQUIRE: (params = 'params') => {
      const message = `${params} require`
      return {code: 8002, message: message}
    },
    INVALID_DATA: (data = 'data') => {
      const message = `invalid ${data}`
      return {code: 8003, message: message}
    }
  },
  SERVER: {
    MONGO: {
      code: 9001,
      massage: 'The server is extremely busy at the moment, please send it again.'
    },
    COMMON: {
      code: 9002,
      massage: 'The server is extremely busy at the moment, please send it again.'
    }
  }
}
