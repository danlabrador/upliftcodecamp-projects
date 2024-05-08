import featuredImage from '../assets/images/login/feature-image.jpg';

export const LoginFeatureImage = () => (
  <div
    className="relative h-full w-full lg:absolute inset-0 z-0 min-h-24"
    style={{
      backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.20) 50%, rgba(0, 0, 0, 0.20) 100%), url(${featuredImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center 25%',
      backgroundRepeat: 'no-repeat',
      filter: 'saturate(75%)',
    }}
  />
);
