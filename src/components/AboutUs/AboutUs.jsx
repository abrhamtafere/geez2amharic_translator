

function AboutUs() {
  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-6">
      <div className="">

     
      <h1 className="text-3xl font-bold text-light-blue-700 text-center mb-4">Who we are</h1>
      <p className="text-lg text-gray-700 mb-4">
        Welcome to our Geez to Amharic translation service. Our goal is to provide 
        accurate and easy-to-use translation tools to help bridge communication 
        gaps and preserve the rich heritage of the Geez language.
      </p>
      <p className="text-lg text-gray-700 mb-4">
        Developed by a dedicated team of linguists and developers, our translation 
        technology leverages advanced algorithms to ensure high-quality translations 
        that capture the nuances of both Geez and Amharic languages.
      </p>
      </div>
      <div className="">
      <h2 className="text-2xl font-bold text-center mb-3 text-light-blue-700">Our Mission</h2>
      <p className="text-lg text-gray-700 mb-4">
        Our mission is to support scholars, historians, and everyday users by providing 
        an accessible platform for translating historical texts and modern communication 
        from Geez to Amharic.
      </p></div>
      </div>
      <h2 className="text-2xl font-bold text-center mb-3 text-light-blue-700">Contact Us</h2>
      <p className="text-lg text-gray-700 text-center pb-4">
        For more information or to provide feedback, please contact us at 
        <a href="mailto:info@geeztoamharic.com" className="text-blue-600 hover:underline"> info@geeztoamharic.com</a>.
      </p>
    </div>
  );
}

export default AboutUs;
