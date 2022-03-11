module.exports = {
  purge: ["./src/**/*.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        hero: "url(https://res.cloudinary.com/besttlookk/image/upload/v1646971349/real_estate/pexels-naim-benjelloun-2029665_11zon_eq98mk.jpg)",
        help: "url(https://res.cloudinary.com/besttlookk/image/upload/v1646967863/real_estate/pic3_mqjxy8.png)",
        about:
          "url(https://res.cloudinary.com/besttlookk/image/upload/v1646967861/real_estate/about_cqiyhy.jpg)",
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
