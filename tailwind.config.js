module.exports = {
  purge: ["./src/**/*.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('../img/pic2.jpg')",
        help: "url('../img/pic3.png')",
        about:
          "url(https://res.cloudinary.com/besttlookk/image/upload/v1646967861/real_estate/about_cqiyhy.jpg)",
        contact: "url('../img/contact.jpg')",
      },

      fontFamily: {
        sansita: ["Sansita", "sans-serif"],
      },

      transitionDelay: {
        2000: "2000ms",
      },

      height: {
        "vh-7": "70vh",

        "vh-8": "80vh",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};