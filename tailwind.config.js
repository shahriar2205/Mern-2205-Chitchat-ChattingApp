/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'open': ['Open Sans'],
        // 'pop': ['Poppins'],
        'nunito': ['Nunito'],
        'lob': ['Lobster Two'],
        'nos': ['Nosifer'],
     
    
       },
       
       fontSize:{
        13:'13px',  
        34:'34px'
       },
       colors:{
      'primary':'#11175D',
    'border':'#b8b9ce',
      'common':"#808080",
      'signBtn':"#5F35F5",
      'overlay':"rgba(0, 0, 0, 0.41)"
    
       },
       boxShadow:{
       'shadow':"0px 4px 4px 0px rgba(0, 0, 0, 0.25)"
       },
    },
  },
  plugins: [],
}














