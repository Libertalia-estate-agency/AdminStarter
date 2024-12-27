const steps = [
  {
    id: "intro",
    attachTo: { element: "#logo-tour", on: "bottom" },
    beforeShowPromise: function () {
      return new Promise(function (resolve) {
        setTimeout(function () {
          window.scrollTo(0, 0);
          resolve();
        }, 500);
      });
    },
    buttons: [
      {
        text: "Skip",
        classes: "btn btn-warning",
        action() {
          return this.complete();
        },
      },
      {
        classes: "btn btn-success",
        text: "Next",
        action() {
          return this.next();
        },
      },
    ],
    title: "Welcome To Libertalia Properties !",
    text: ["Start by completing your profile for full benefits of the system and exploring your dashboard to access your analytic metrics."],
  },

  {
    id: "intro1",
    attachTo: { element: "#register-tour", on: "left" },

    buttons: [
      {
        text: "Back",
        classes: "btn btn-light",
        action() {
          return this.back();
        },
      },
      {
        text: "Skip",
        classes: "btn btn-warning",
        action() {
          return this.complete();
        },
      },
      {
        text: "Next",
        classes: "btn btn-success",
        action() {
          return this.next();
        },
      },
    ],
    title: "Verify your account",
    text: "Verify your account using your work email address",
  },
  {
    id: "intro2",
    attachTo: { element: "#login-tour", on: "bottom" },
    buttons: [
      {
        text: "Back",
        classes: "btn btn-light",
        action() {
          return this.back();
        },
      },
      {
        text: "Skip",
        classes: "btn btn-warning",
        action() {
          return this.complete();
        },
      },
      {
        text: "Next",
        classes: "btn btn-success",
        action() {
          return this.next();
        },
      },
    ],
    title: "Login your account",
    text: "Sign in to continue to Libertalia.",
  },
  {
    id: "intro3",
    attachTo: { element: "#getproduct-tour", on: "bottom" },
    buttons: [
      {
        text: "Back",
        classes: "btn btn-light",
        action() {
          return this.back();
        },
      },
      {
        text: "Skip",
        classes: "btn btn-warning",
        action() {
          return this.complete();
        },
      },
      {
        text: "Next",
        classes: "btn btn-success",
        action() {
          return this.next();
        },
      },
    ],
    title: "Explore your dashboard",
    text: "Your dashboard is ready! Here, you can manage listings, view analytics, and more ..",
  },
  {
    id: "intro4",
    attachTo: { element: "#thankyou-tour", on: "top" },
    buttons: [
      {
        text: "Back",
        classes: "btn btn-light",
        action() {
          return this.back();
        },
      },
      {
        text: "Thank You!",
        classes: "btn btn-primary",
        action() {
          return this.complete();
        },
      },
    ],
    title: "Thank you !",
    text: "Your tools are ready to help you manage your listings!",
  },
];

export default steps;
