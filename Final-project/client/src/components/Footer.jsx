const Footer = () => {
  return (
    <footer className="bg-secondary text-white text-center py-6 mt-10">
      <p className="text-sm">
        © {new Date().getFullYear()} E-Learning Platform. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;