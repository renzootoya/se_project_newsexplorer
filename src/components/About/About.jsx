import './About.css';

const About = () => {
  return (
    <section className="about">
      <div className="about__content">
        <div className="about__image-container">
          <img
            className="about__image"
            src="https://i.pravatar.cc/464"
            alt="Author photo"
          />
        </div>
        <div className="about__text">
          <h2 className="about__title">About the author</h2>
          <p className="about__description">
            Hi, I&apos;m Renzo — a web developer passionate about building clean,
            user-friendly applications. I work with React, JavaScript, Node.js, and
            Express, and I enjoy turning complex ideas into simple, functional products.
          </p>
          <p className="about__description">
            I&apos;m currently completing the full-stack web development program at
            TripleTen, where I&apos;ve built everything from interactive UI components to
            REST APIs and deployed full-stack apps. NewsExplorer is my final Stage 1
            project combining a React frontend with a live news API.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
